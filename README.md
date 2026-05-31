# TennisCoach AI - 智能网球体能训练助手

> 基于运动科学知识（ACSM 指南 + 网球专项训练理论）的个性化网球体能训练计划生成器

## 功能特性

| 功能 | 说明 |
|------|------|
| 用户信息采集 | 年龄、性别、身高体重、伤病史 |
| 网球水平评定 | NTRP 2.0 - 5.0 选择器 |
| 基础力量评估 | 俯卧撑/徒手深蹲/平板支撑极限测试 |
| 目标技能选择 | 正手、反手、发球/高压、截击、步伐 |
| 训练计划生成 | 基于知识库 + ACSM 标准，输出单周计划 |
| 动作指导详情 | 要点提示、组数、次数、常见错误、替代动作 |
| 导出分享 | 导出独立 HTML 文件 / 下载为 PDF |

## 文件结构

```
tennis-coach-ai/
├── index.html            # 主页面（表单 + 计划展示）
├── css/
│   └── style.css        # 全局样式
├── js/
│   ├── app.js           # 主应用逻辑（步骤导航、计划生成、导出）
│   ├── knowledge-base.js # 知识库（训练动作、肌肉群映射、ACSM 标准）
│   └── prompts.js       # AI 生成 Prompt 模板（独立维护）
├── data/
│   └── exercises.json   # （预留）训练动作 JSON 数据
├── config.json          # 模型授权配置
├── serve.js             # 本地开发服务器
└── assets/             # 静态资源目录
```

## 快速启动

### 方式一：直接打开（推荐）

直接双击 `index.html` 用浏览器打开即可使用（规则引擎模式）。

> ⚠️ 注意：直接以 `file://` 协议打开时，部分浏览器会阻止 `fetch()` 请求，
> 导致无法加载 `config.json`（不影响规则引擎生成的训练计划）。

### 方式二：本地服务器（完整功能）

```bash
cd /path/to/tennis-coach-ai
node serve.js
# 然后在浏览器打开 http://localhost:8082/
```

### 方式三：Python 简易服务器

```bash
cd /path/to/tennis-coach-ai
python3 -m http.server 8080
# 然后在浏览器打开 http://localhost:8080/
```

## 配置说明（config.json）

```json
{
  "model": {
    "provider": "openai",
    "apiUrl": "https://api.openai.com/v1/chat/completions",
    "apiKey": "YOUR_API_KEY_HERE",
    "modelName": "gpt-4o",
    "temperature": 0.7
  },
  "features": {
    "enableAIGeneration": false,
    "fallbackToRuleBased": true
  }
}
```

- 将 `enableAIGeneration` 设为 `true` 并填入有效 API Key，即可启用 AI 生成模式
- 设为 `false` 时使用内置规则引擎（基于知识库 + ACSM 标准）

## Prompt 模板迭代

所有用于训练计划生成的 Prompt 统一维护在 `js/prompts.js`：

- `TennisCoachPrompts.generateTrainingPlan()` — 训练计划生成主 Prompt
- `TennisCoachPrompts.exerciseGuidance()` — 动作指导详情 Prompt
- `TennisCoachPrompts.assessStrengthLevel()` — 力量水平评估 Prompt
- `TennisCoachPrompts.acsmComplianceCheck()` — ACSM 标准合规检查 Prompt

修改这些函数即可调整 AI 生成逻辑，无需改动主应用代码。

## 知识库扩展

训练动作数据维护在 `js/knowledge-base.js`：

- `TennisCoachKB.exercises[]` — 训练动作库（可继续添加）
- `TennisCoachKB.muscleGroups{}` — 网球动作 → 肌肉群映射
- `TennisCoachKB.skillToMuscles{}` — 目标技能 → 推荐肌肉群
- `TennisCoachKB.acsmStandards{}` — ACSM 训练标准

## ACSM 标准说明

本应用遵循 **ACSM（美国运动医学会）** 训练标准：

- 热身：5-10 分钟低强度有氧 + 动态拉伸
- 力量训练：每组 8-15 次，2-4 组，组间休息 30-90 秒
- 有氧运动：每周至少 150 分钟中等强度或 75 分钟高强度
- 柔韧性：每周至少 2-3 次，每次 10-30 秒/动作，2-4 组
- 循序渐进：每周训练量增幅不超过 10%

## 技术栈

- 纯前端（HTML + CSS + Vanilla JS，无框架依赖）
- 知识库内联在 `knowledge-base.js`
- 规则引擎训练计划生成（不依赖后端）
- 可选 AI 生成（配置 API Key 后启用）

## 浏览器兼容性

| 浏览器 | 版本要求 |
|--------|----------|
| Chrome  | ≥ 90 |
| Edge    | ≥ 90 |
| Safari  | ≥ 15 |
| Firefox | ≥ 88 |

## 已知限制

- AI 生成模式需要有效的 OpenAI 兼容 API Key
- 导出 PDF 功能依赖浏览器自带"打印 → 另存为 PDF"功能
- 动作库目前包含 20+ 个动作，可继续扩展

## 后续扩展建议

- [ ] 增加更多训练动作（从 MD 文件补充）
- [ ] 支持多周训练计划（周期化训练）
- [ ] 增加进度追踪功能（记录完成情况和感受）
- [ ] 支持导出为图片格式分享
- [ ] 增加伤害预防专项训练模块
