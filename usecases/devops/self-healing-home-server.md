# 自愈家庭服务器

> 运行一个始终在线的基础设施智能体，具有 SSH 访问权限、自动化 cron 作业，以及跨家庭网络的自愈能力。

## 这个案例能帮你做什么

这个案例适合想快速把「运行一个始终在线的基础设施智能体，具有 SSH 访问权限、自动化 cron 作业，以及跨家庭网络的自愈能力。」落地的人。
你可以先跑一个最小版本，确认有效后再加自动化频率。

## 开始前准备

### 原文提到的技能/工具（保持原文）
- `ssh`
- `kubectl`
- `terraform`
- `ansible`
- `1password`
- `gog`
- `n8n`
- `Gmail`
- `GitHub`
- `cron`
- `heartbeat`
- `OpenClaw`

### 原文命令片段（保持原文）

```bash
ssh
openclaw doctor
```

### 原文提到的调度信息（保持原文）
- 4:00
- 8:00
- 1:00

## 推荐使用方式（非技术版）

1. 先把渠道连通（例如 Telegram / 飞书 / 邮箱中的一个）。
2. 复制提示词先手动跑通，确认结果格式符合你的使用习惯。
3. 再逐步增加自动化频率，避免一开始任务过多难排错。

## 可复制提示词

```text
你是我的 OpenClaw 助手，请帮我完成「自愈家庭服务器」。

任务目标：运行一个始终在线的基础设施智能体，具有 SSH 访问权限、自动化 cron 作业，以及跨家庭网络的自愈能力。

请按这个顺序执行：
1. 先给出今天可落地的最小版本（3-5步）。
2. 直接产出第一版结果，不要只讲思路。
3. 如果缺少信息，把问题集中放在最后让我一次补全。
4. 使用我已启用的技能（优先：ssh、kubectl、terraform、ansible、1password、gog）。
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

- 来源仓库： [hesamsheikh/awesome-openclaw-usecases](https://github.com/hesamsheikh/awesome-openclaw-usecases)
- 原始条目： [usecases/self-healing-home-server.md](https://github.com/hesamsheikh/awesome-openclaw-usecases/blob/main/usecases/self-healing-home-server.md)
