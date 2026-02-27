# 智能任务管理系统

> 自动拆解任务、安排优先级并跟踪进度。

## 这个案例能帮你做什么

这个案例适合想快速把「自动拆解任务、安排优先级并跟踪进度。」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `Telegram`
- `Discord`
- `Notion`
- `GitHub`
- `cron`
- `OpenClaw`

### 原文命令片段（保持原文）

```bash
openclaw agent --message "请使用 rss-reader skill 收集 ~/.openclaw/info-sources.json 中配置的RSS源，保存到 $OUTPUT_DIR/rss-$DATE.json"
openclaw agent --message "请收集GitHub今日Python热门项目，保存到 $OUTPUT_DIR/github-$DATE.json"
openclaw agent --message "请搜索'OpenClaw AI工具'相关信息，最多10条结果，保存到 $OUTPUT_DIR/search-$DATE.json"
openclaw agent --message "请合并 $OUTPUT_DIR/*-$DATE.json 中的所有信息并去重，保存到 $OUTPUT_DIR/merged-$DATE.json"
openclaw agent --message "请分析 $OUTPUT_DIR/merged-$DATE.json 中的内容并评分，保存到 $OUTPUT_DIR/analyzed-$DATE.json"
openclaw channels send feishu \
crontab -e
openclaw skills run brave-search \
bash ~/.openclaw/scripts/content-creation.sh "OpenClaw自动化测试实战"
openclaw agent --message "分析最近的技术热点，生成3个博客选题"
```

### 原文提到的调度信息（保持原文）
- 08:00
- 09:00
- 18:00
- 11:00
- 14:00
- 16:00
- 15:00
- 12:00

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「智能任务管理系统」。

任务目标：自动拆解任务、安排优先级并跟踪进度。

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：Telegram、Discord、Notion、GitHub、cron、OpenClaw）。
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

## 使用小贴士

- 先确认你已安装对应技能，再复制提示词。
- 如果要执行命令，先在测试环境验证命令输出。
- 先手动跑通一次，再开自动化。
- 先用一个渠道验证结果，再扩到多个渠道。

## CITATION

- 来源仓库： [xianyu110/awesome-openclaw-tutorial](https://github.com/xianyu110/awesome-openclaw-tutorial)
- 原始条目： [docs/04-practical-cases/13-advanced-automation.md](https://github.com/xianyu110/awesome-openclaw-tutorial/blob/main/docs/04-practical-cases/13-advanced-automation.md)
