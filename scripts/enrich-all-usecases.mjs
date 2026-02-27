#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const indexPath = path.join(root, 'resources', 'usecases-index.json');
const cacheDir = path.join(root, 'resources', 'source-cache');
fs.mkdirSync(cacheDir, { recursive: true });

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

function encodePath(p) {
  return p.split('/').map(encodeURIComponent).join('/');
}

function cacheFileName(repo, sourcePath) {
  const safe = `${repo}__${sourcePath}`.replace(/[\\/:*?"<>|\s]+/g, '__');
  return path.join(cacheDir, `${safe}.txt`);
}

async function fetchSource(repo, sourcePath) {
  const c = cacheFileName(repo, sourcePath);
  if (fs.existsSync(c)) {
    return { ok: true, text: fs.readFileSync(c, 'utf8') };
  }

  const url = `https://raw.githubusercontent.com/${repo}/main/${encodePath(sourcePath)}`;
  const res = await fetch(url);
  if (!res.ok) {
    return { ok: false, text: '', error: `${res.status} ${res.statusText}` };
  }
  const text = await res.text();
  fs.writeFileSync(c, text, 'utf8');
  return { ok: true, text };
}

function uniq(arr) {
  return [...new Set(arr.filter(Boolean))];
}

function extractCommands(text) {
  const lines = text.split('\n');
  const out = [];
  let inFence = false;
  let fenceLang = '';

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      if (!inFence) {
        inFence = true;
        fenceLang = line.replace(/```+/, '').trim().toLowerCase();
      } else {
        inFence = false;
        fenceLang = '';
      }
      continue;
    }

    if (!inFence) continue;

    const cmdLike = /^(openclaw|npm|pnpm|yarn|npx|curl|wget|bash|sh|python|node|docker|git|tailscale|crontab|ssh|scp|export)\b/i.test(line);
    const shellLang = /^(bash|sh|shell|zsh|console|terminal)?$/i.test(fenceLang);
    const noisy = /[：。！？【】《》“”]/.test(line) || /^openclaw[:：]/i.test(line);
    if (cmdLike && shellLang && !noisy) {
      out.push(line);
    }
  }

  // Also catch inline command patterns outside fences
  for (const m of text.matchAll(/`([^`\n]{3,120})`/g)) {
    const v = m[1].trim();
    if (/^(openclaw|npm|pnpm|npx|docker|git|tailscale|crontab|ssh)\b/i.test(v) && !/[：。！？【】《》“”]/.test(v)) {
      out.push(v);
    }
  }

  return uniq(out).slice(0, 10);
}

function extractSkillsAndTools(text) {
  const out = [];

  // backtick tokens often represent skill names / tool names
  for (const m of text.matchAll(/`([^`\n]{2,60})`/g)) {
    const v = m[1].trim();
    if (/^[a-zA-Z0-9_./:-]+$/.test(v) && v.length <= 40) {
      out.push(v);
    }
  }

  // links with skill-like names
  const known = [
    'Telegram', 'WhatsApp', 'Discord', 'Slack', 'Notion', 'Todoist', 'n8n',
    'Google Calendar', 'Gmail', 'GitHub', 'Web Search', 'filesystem',
    'cron', 'heartbeat', 'OpenClaw', 'Tailscale', 'WireGuard', 'ZeroTier'
  ];
  for (const k of known) {
    const re = new RegExp(k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (re.test(text)) out.push(k);
  }

  // remove obvious noise
  const blacklist = new Set(['text', 'json', 'yaml', 'md', 'README', 'SOUL.md', 'AGENTS.md']);
  const filtered = uniq(out).filter((x) => !blacklist.has(x));

  return filtered.slice(0, 12);
}

function extractSchedule(text) {
  const out = [];

  // cron-like
  for (const m of text.matchAll(/\b(?:\d+|\*)\s+(?:\d+|\*|\*\/\d+)\s+\*\s+\*\s+(?:\d+|\*|[0-7]-[0-7])\b/g)) {
    out.push(m[0]);
  }

  // times
  for (const m of text.matchAll(/\b\d{1,2}:\d{2}\b/g)) out.push(m[0]);

  // CN time words
  for (const m of text.matchAll(/每天|每周|每小时|夜间|晨间|定时|每日/g)) out.push(m[0]);

  return uniq(out).slice(0, 8);
}

function extractRiskHints(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const sections = [];
  let currentHeading = '__intro__';
  let bucket = [];
  for (const l of lines) {
    if (/^#{1,6}\s+/.test(l)) {
      sections.push({ heading: currentHeading, lines: bucket });
      currentHeading = l.replace(/^#{1,6}\s+/, '').trim();
      bucket = [];
    } else {
      bucket.push(l);
    }
  }
  sections.push({ heading: currentHeading, lines: bucket });

  const riskSections = sections.filter((s) => /(risk|security|安全|风险|注意|边界|troubleshooting|warning|guardrail)/i.test(s.heading));
  const targetLines = (riskSections.length ? riskSections.flatMap((s) => s.lines) : lines);
  const out = [];
  const re = /(risk|security|安全|权限|边界|warning|注意|confirm|确认|漏洞|泄露|密码|secret|credential|key|token|ssh|acl|least|minimal)/i;
  for (const l of targetLines) {
    if (re.test(l) && l.length >= 8 && l.length <= 180 && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('```')) {
      out.push(l.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''));
    }
    if (out.length >= 5) break;
  }
  return uniq(out);
}

function summarizeRiskChinese(risks) {
  const text = risks.join(' ');
  const out = [];
  if (/confirm|确认/i.test(text)) out.push('涉及高风险动作时需要二次确认后再执行。');
  if (/password|secret|credential|token|key|apikey|密钥|凭证|密码/i.test(text)) out.push('密钥和凭证不要明文写入提示词或仓库文件。');
  if (/ssh/i.test(text)) out.push('远程访问建议使用 SSH Key，并避免口令直连。');
  if (/acl|permission|least|minimal|权限|最小/i.test(text)) out.push('权限按最小授权原则配置，先收敛再放开。');
  if (/prompt|injection|注入/i.test(text)) out.push('接收外部内容时要防提示词注入，先校验再执行。');
  if (/backup|restore|备份/i.test(text)) out.push('执行关键变更前先备份，便于回滚。');
  if (out.length === 0 && risks.length > 0) out.push('原文提到需先做安全检查，并在测试环境验证。');
  if (out.length === 0) out.push('原文未单列风险项，默认使用最小权限和二次确认。');
  return uniq(out).slice(0, 4);
}

function chineseUsageTips(desc, hasCmd, hasSkills) {
  const tips = [
    '先手动跑通一次，再开自动化。',
    '先用一个渠道验证结果，再扩到多个渠道。',
    '遇到高风险动作（删除/外发/改密）先要求确认。'
  ];
  if (hasCmd) tips.unshift('如果要执行命令，先在测试环境验证命令输出。');
  if (hasSkills) tips.unshift('先确认你已安装对应技能，再复制提示词。');
  return tips.slice(0, 4);
}

function renderCase(item, extracted) {
  const { commands, skills, schedule, risks } = extracted;
  const riskSummary = summarizeRiskChinese(risks);

  const cmdBlock = commands.length
    ? `\n### 原文命令片段（保持原文）\n\n\`\`\`bash\n${commands.join('\n')}\n\`\`\`\n`
    : `\n### 原文命令片段（保持原文）\n\n- 原文未提供可直接执行的命令片段。\n`;

  const skillsBlock = skills.length
    ? skills.map((s) => `- \`${s}\``).join('\n')
    : '- 原文未明确列出固定 skills/tools。';

  const scheduleBlock = schedule.length
    ? schedule.map((s) => `- ${s}`).join('\n')
    : '- 原文未给出固定调度频率。';

  const riskBlock = riskSummary.map((r) => `- ${r}`).join('\n');

  const tips = chineseUsageTips(item.desc, commands.length > 0, skills.length > 0)
    .map((x) => `- ${x}`).join('\n');

  const skillText = skills.length ? skills.slice(0, 6).join('、') : '你已启用的相关技能';

  const prompt = `你是我的 OpenClaw 助手，请帮我完成「${item.title}」。

任务目标：${item.desc}

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：${skillText}）。
5. 涉及高风险动作（删除、外发、改密、生产写操作）先暂停并请求确认。

输出格式：
## 今日执行计划
## 立即可执行动作
## 第一版结果
## 我需要补充的信息
## 风险提醒`;

  return `# ${item.title}

> ${item.desc}

## 这个案例能帮你做什么

这个案例适合想快速把「${item.desc}」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
${skillsBlock}
${cmdBlock}
### 原文提到的调度信息（保持原文）
${scheduleBlock}

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

\`\`\`text
${prompt}
\`\`\`

## 风险与边界

${riskBlock}

## 使用小贴士

${tips}

## CITATION

- 来源仓库： [${item.sourceRepo}](https://github.com/${item.sourceRepo})
- 原始条目： [${item.sourcePath}](https://github.com/${item.sourceRepo}/blob/main/${item.sourcePath})
`;
}

let okCount = 0;
let failCount = 0;

for (const item of index) {
  const fetched = await fetchSource(item.sourceRepo, item.sourcePath);
  const localAbs = path.join(root, item.localPath);
  fs.mkdirSync(path.dirname(localAbs), { recursive: true });

  if (!fetched.ok) {
    failCount += 1;
    fs.writeFileSync(localAbs, `# ${item.title}\n\n> ${item.desc}\n\n## CITATION\n\n- 来源仓库： [${item.sourceRepo}](https://github.com/${item.sourceRepo})\n- 原始条目： [${item.sourcePath}](https://github.com/${item.sourceRepo}/blob/main/${item.sourcePath})\n\n> 说明：源文件暂不可拉取（${fetched.error}），为避免幻觉，本页未补充推断性细节。\n`, 'utf8');
    continue;
  }

  okCount += 1;
  const text = fetched.text;
  const extracted = {
    commands: extractCommands(text),
    skills: extractSkillsAndTools(text),
    schedule: extractSchedule(text),
    risks: extractRiskHints(text),
  };

  fs.writeFileSync(localAbs, renderCase(item, extracted), 'utf8');
}

console.log(`Enriched files. source_ok=${okCount}, source_fail=${failCount}`);
