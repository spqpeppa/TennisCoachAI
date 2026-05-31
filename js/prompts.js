/**
 * TennisCoach AI - Prompt 模板文件
 * 所有用于训练计划生成的 Prompt 统一维护在此文件
 * 方便后续迭代和优化
 */

const TennisCoachPrompts = {

  /**
   * 训练计划生成主 Prompt
   * 变量: {userProfile}, {tennisLevel}, {strengthAssessment}, {targetSkills}, {weeklyFrequency}, {acsmStandards}, {knowledgeBase}
   */
  generateTrainingPlan: ({
    userProfile,
    tennisLevel,
    strengthAssessment,
    targetSkills,
    weeklyFrequency,
    acsmStandards,
    knowledgeBase
  }) => {
    return `你是 TennisCoach AI，一个专业的网球体能训练助手。请根据以下用户信息，生成一份科学、安全、个性化的单周网球体能训练计划。

## 用户信息
- 年龄：${userProfile.age} 岁
- 性别：${userProfile.gender}
- 身高：${userProfile.height} cm
- 体重：${userProfile.weight} kg
- 每周运动频次：${weeklyFrequency} 次/周
- 伤病史：${userProfile.injuryHistory || '无'}

## 网球水平（NTRP）
- 级别：${tennisLevel}（${tennisLevel <= 2.5 ? '初学者' : tennisLevel <= 3.5 ? '进阶初学者' : tennisLevel <= 4.5 ? '中级' : '高级'}）

## 基础力量评估
- 俯卧撑极限次数/分钟：${strengthAssessment.pushups} 次
- 徒手深蹲次数/分钟：${strengthAssessment.squats} 次
- 平板支撑极限时间：${strengthAssessment.plank} 秒

## 目标技能（需要重点提升）
${targetSkills.map(s => `- ${s}`).join('\n')}

## ACSM（美国运动医学会）训练标准
- 热身：5-10分钟低强度有氧 + 动态拉伸
- 训练频率：每周 ${weeklyFrequency} 次
- 力量训练：每组 8-15 次，2-4 组，组间休息 30-90 秒
- 有氧运动：每周至少 150 分钟中等强度或 75 分钟高强度
- 柔韧性：每周至少 2-3 次，每次 10-30 秒/动作，2-4 组
- 循序渐进：每周训练量增幅不超过 10%

## 网球各动作依赖的肌肉群知识
${knowledgeBase.muscleGroups}

## 训练动作库（可用动作）
${knowledgeBase.exerciseList}

## 输出要求
请生成一份完整的单周训练计划（周日到周六），严格按照 JSON 格式输出，格式如下：

\`\`\`json
{
  "userProfile": { "age": ..., "gender": ..., "height": ..., "weight": ..., "tennisLevel": ..., "strengthLevel": "beginner|intermediate|advanced", "targetSkills": [...] },
  "weeklyOverview": "本周训练重点概述",
  "days": [
    {
      "dayOfWeek": "周日",
      "date": "自动计算",
      "isRestDay": false,
      "focus": "今日训练重点",
      "warmUp": [ "动作1", "动作2" ],
      "exercises": [
        {
          "name": "动作名称",
          "sets": 3,
          "reps": 12,
          "weight": "重量建议",
          "restSec": 60,
          "tips": "要点提示",
          "commonMistakes": [ "错误1", "错误2" ],
          "alternatives": [ "替代动作1", "替代动作2" ],
          "targetMuscles": [ "目标肌肉" ]
        }
      ],
      "coolDown": [ "拉伸动作1", "拉伸动作2" ],
      "durationMin": 60
    }
  ]
}
\`\`\`

## 重要约束
1. 根据用户力量评估结果显示（俯卧撑/深蹲次数、平板时间）判断 strengthLevel
2. 目标技能对应的肌肉群要在训练中重点覆盖
3. 遵循 ACSM 标准，初学者以动作学习和轻度训练为主
4. 每周安排 1-2 天休息日（标注为休息日）
5. 每次训练包含：热身 → 主训练 → 拉伸放松
6. 动作选择要基于知识库中的可用动作
7. 直接输出 JSON，不要附加其他解释文字
`;
  },

  /**
   * 动作指导详情 Prompt
   * 用于生成单个动作的详细说明
   */
  exerciseGuidance: ({ exerciseName, userLevel, injuryHistory }) => {
    return `请为网球爱好者生成「${exerciseName}」动作的详细指导说明。

用户信息：
- 训练水平：${userLevel}
- 伤病史：${injuryHistory || '无'}

请输出以下格式的 JSON：
{
  "name": "动作名称",
  "nameEn": "English Name",
  "difficulty": "beginner|intermediate|advanced",
  "targetMuscles": [ "目标肌肉群" ],
  "equipment": [ "所需器材" ],
  "executionSteps": [ "步骤1", "步骤2", "..." ],
  "keyTips": [ "要点1", "要点2", "..." ],
  "commonMistakes": [ "错误1", "错误2", "..." ],
  "setsRepsGuidance": { "beginner": "2组x12次", "intermediate": "3组x12次", "advanced": "3组x15次" },
  "alternatives": [ "替代动作1", "替代动作2" ],
  "contraindications": [ "禁忌症" ],
  "progression": [ "进阶建议" ]
}

直接输出 JSON，不要附加其他解释。`;
  },

  /**
   * 用户水平评估 Prompt
   * 根据力量评估结果判断用户的训练水平
   */
  assessStrengthLevel: ({ pushups, squats, plank, age, gender }) => {
    return `根据以下力量评估数据，判断用户的训练水平（beginner/intermediate/advanced），并给出简要评估说明。

评估数据：
- 俯卧撑极限次数/分钟：${pushups}
- 徒手深蹲次数/分钟：${squats}
- 平板支撑极限时间（秒）：${plank}
- 年龄：${age}
- 性别：${gender}

请直接输出 JSON：
{
  "level": "beginner|intermediate|advanced",
  "score": { "pushups": ..., "squats": ..., "plank": ... },
  "overallScore": 0-100,
  "assessment": "评估说明",
  "recommendations": [ "建议1", "建议2" ]
}`;
  },

  /**
   * ACSM 标准合规检查 Prompt
   * 检查训练计划是否符合 ACSM 标准
   */
  acsmComplianceCheck: (trainingPlan) => {
    return `请检查以下训练计划是否符合 ACSM（美国运动医学会）标准：

训练计划概要：
${JSON.stringify(trainingPlan, null, 2)}

ACSM 标准检查项：
1. 热身是否充分（5-10分钟）
2. 组数次数是否在推荐范围内
3. 组间休息是否合理
4. 每周训练量增幅是否超过 10%（针对多周计划）
5. 是否包含柔韧性训练
6. 训练频率是否合理

请输出 JSON：
{
  "compliant": true/false,
  "issues": [ "问题1", "问题2" ],
  "suggestions": [ "建议1", "建议2" ]
}`;
  }

};

// 导出（兼容浏览器和 Node.js）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TennisCoachPrompts;
}
