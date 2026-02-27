# 每日晨间简报

> 天气+日历+新闻一条消息搞定

## 这个案例能帮你做什么

这个案例适合想快速把「天气+日历+新闻一条消息搞定」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `Telegram`
- `Google Calendar`
- `Web Search`
- `cron`
- `OpenClaw`

### 原文命令片段（保持原文）

- 原文未提供可直接执行的命令片段。

### 原文提到的调度信息（保持原文）
- 6:30

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「每日晨间简报」。

任务目标：天气+日历+新闻一条消息搞定

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：Telegram、Google Calendar、Web Search、cron、OpenClaw）。
5. 涉及高风险动作（删除、外发、改密、生产写操作）先暂停并请求确认。

输出格式：
## 今日执行计划
## 立即可执行动作
## 第一版结果
## 我需要补充的信息
## 风险提醒
```

## 风险与边界

- 原文未单列风险项，默认使用最小权限和二次确认。

## 使用小贴士

- 先确认你已安装对应技能，再复制提示词。
- 先手动跑通一次，再开自动化。
- 先用一个渠道验证结果，再扩到多个渠道。
- 遇到高风险动作（删除/外发/改密）先要求确认。

## CITATION

- 来源仓库： [EvoLinkAI/awesome-openclaw-usecases-moltbook](https://github.com/EvoLinkAI/awesome-openclaw-usecases-moltbook)
- 原始条目： [usecases/52-morning-briefing-telegram.md](https://github.com/EvoLinkAI/awesome-openclaw-usecases-moltbook/blob/main/usecases/52-morning-briefing-telegram.md)
