# VPS部署与加固流程

> 从部署到安全收口的一体化流程，适合长期在线运行。

## 这个案例能帮你做什么

这个案例适合想快速把「从部署到安全收口的一体化流程，适合长期在线运行。」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `gateway.trusted_proxies_missing`
- `fs.credentials_dir.perms_readable`
- `0.0.0.0`
- `minimal`
- `session_status`
- `coding`
- `messaging`
- `full`
- `heartbeat-example.md`
- `agent-prompts.md`
- `cron`
- `heartbeat`

### 原文命令片段（保持原文）

```bash
ssh user@your-vps-ip
curl -fsSL https://tailscale.com/install.sh | sh
tailscale ip -4
ssh user@100.64.1.2
ssh user@your-public-vps-ip
openclaw doctor --fix
openclaw security audit --deep
openclaw gateway restart
git add .gitignore openclaw.json
git commit -m "config: baseline"
```

### 原文提到的调度信息（保持原文）
- 0 2 * * 0

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「VPS部署与加固流程」。

任务目标：从部署到安全收口的一体化流程，适合长期在线运行。

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：gateway.trusted_proxies_missing、fs.credentials_dir.perms_readable、0.0.0.0、minimal、session_status、coding）。
5. 涉及高风险动作（删除、外发、改密、生产写操作）先暂停并请求确认。

输出格式：
## 今日执行计划
## 立即可执行动作
## 第一版结果
## 我需要补充的信息
## 风险提醒
```

## 风险与边界

- 密钥和凭证不要明文写入提示词或仓库文件。
- 远程访问建议使用 SSH Key，并避免口令直连。

## 使用小贴士

- 先确认你已安装对应技能，再复制提示词。
- 如果要执行命令，先在测试环境验证命令输出。
- 先手动跑通一次，再开自动化。
- 先用一个渠道验证结果，再扩到多个渠道。

## CITATION

- 来源仓库： [digitalknk/openclaw-runbook](https://github.com/digitalknk/openclaw-runbook)
- 原始条目： [examples/vps-setup.md](https://github.com/digitalknk/openclaw-runbook/blob/main/examples/vps-setup.md)
