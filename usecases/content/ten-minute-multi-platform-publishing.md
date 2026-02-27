# 10分钟全平台内容发布

> 把选题、成稿、分发整合为一个快节奏发布流程。

## 这个案例能帮你做什么

这个案例适合想快速把「把选题、成稿、分发整合为一个快节奏发布流程。」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `Telegram`
- `Notion`
- `cron`
- `OpenClaw`

### 原文命令片段（保持原文）

```bash
openclaw ask "搜索过去24小时AI编程领域的热点，生成5个选题"
openclaw ziliu publish "$draft_id" \
curl -fsSL https://openclaw.example/install.sh | bash  # 替换为实际安装地址
openclaw config set api.key "your-api-key"
openclaw config set model "claude-opus-4"
crontab -e
openclaw run daily-topic-push
openclaw ask "写一篇关于AI编程的文章"
openclaw run publish-all "article-id"
```

### 原文提到的调度信息（保持原文）
- 0 8 * * 1
- 每天
- 定时
- 每周
- 每日

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「10分钟全平台内容发布」。

任务目标：把选题、成稿、分发整合为一个快节奏发布流程。

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：Telegram、Notion、cron、OpenClaw）。
5. 涉及高风险动作（删除、外发、改密、生产写操作）先暂停并请求确认。

输出格式：
## 今日执行计划
## 立即可执行动作
## 第一版结果
## 我需要补充的信息
## 风险提醒
```

## 风险与边界

- 涉及高风险动作时需要二次确认后再执行。

## 使用小贴士

- 先确认你已安装对应技能，再复制提示词。
- 如果要执行命令，先在测试环境验证命令输出。
- 先手动跑通一次，再开自动化。
- 先用一个渠道验证结果，再扩到多个渠道。

## CITATION

- 来源仓库： [xianyu110/awesome-openclaw-tutorial](https://github.com/xianyu110/awesome-openclaw-tutorial)
- 原始条目： [docs/04-practical-cases/15-solo-entrepreneur-cases.md](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/main/docs/04-practical-cases/15-solo-entrepreneur-cases.md)
