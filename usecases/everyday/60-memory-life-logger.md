# 生活记忆管理

> 不再忘记生日、偏好和承诺

## 这个案例能帮你做什么

这个案例适合想快速把「不再忘记生日、偏好和承诺」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `/memory/life-memories/follow-ups.json`
- `/memory/life-memories/master-index.json`
- `Telegram`

### 原文命令片段（保持原文）

- 原文未提供可直接执行的命令片段。

### 原文提到的调度信息（保持原文）
- 0 19 * * 0
- 10:00
- 7:00

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「生活记忆管理」。

任务目标：不再忘记生日、偏好和承诺

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：/memory/life-memories/follow-ups.json、/memory/life-memories/master-index.json、Telegram）。
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
- 接收外部内容时要防提示词注入，先校验再执行。

## 使用小贴士

- 先确认你已安装对应技能，再复制提示词。
- 先手动跑通一次，再开自动化。
- 先用一个渠道验证结果，再扩到多个渠道。
- 遇到高风险动作（删除/外发/改密）先要求确认。

## CITATION

- 来源仓库： [EvoLinkAI/awesome-openclaw-usecases-moltbook](https://github.com/EvoLinkAI/awesome-openclaw-usecases-moltbook)
- 原始条目： [usecases/60-memory-life-logger.md](https://github.com/EvoLinkAI/awesome-openclaw-usecases-moltbook/blob/main/usecases/60-memory-life-logger.md)
