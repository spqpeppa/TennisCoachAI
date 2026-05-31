/**
 * TennisCoach AI - 知识库数据文件
 * 包含：训练动作库、网球动作-肌肉群映射、ACSM标准
 * 数据来源：训练动作知识库 MD 文件（59个专业动作）
 * 覆盖类别：strength(力量), power(爆发力), stability(稳定性), agility(步伐/灵敏)
 * 由 AI 批量转换合并
 */

const TennisCoachKB = {

  // ========== 网球动作依赖的肌肉群知识 ==========
  muscleGroups: {
    "正手击球": {
      lowerBody: ["腓肠肌", "比目鱼肌", "股四头肌", "臀肌"],
      trunk: ["腹斜肌", "背部伸肌", "竖脊肌"],
      acceleration: ["背阔肌", "前三角肌", "肩胛下肌", "胸大肌", "肱二头肌"],
      deceleration: ["棘下肌", "小圆肌", "后三角肌", "菱形肌", "斜方肌", "肱三头肌"]
    },
    "反手击球_单手": {
      lowerBody: ["腓肠肌", "比目鱼肌", "股四头肌", "臀肌"],
      trunk: ["腹斜肌", "背部伸肌"],
      acceleration: ["棘下肌", "小圆肌", "后三角肌", "斜方肌"],
      key: "腕伸肌力量和肌肉耐力尤为重要",
      deceleration: ["肩胛下肌", "胸大肌", "肱二头肌"]
    },
    "反手击球_双手": {
      lowerBody: ["腓肠肌", "比目鱼肌", "股四头肌", "臀肌"],
      trunk: ["腹斜肌", "内斜肌", "腹外斜肌"],
      key: "躯干旋转度要求更大，非惯用手臂前臂屈伸肌群主导发力"
    },
    "发球": {
      preparation: ["股四头肌", "腓肠肌", "比目鱼肌", "臀肌", "腹斜肌", "腹肌", "躯干伸肌"],
      acceleration: ["肩胛下肌", "胸大肌", "前三角肌", "肱二头肌", "背阔肌", "肱三头肌"],
      deceleration: ["竖脊肌", "腹斜肌", "棘下肌", "小圆肌", "前锯肌"]
    },
    "高压球": {
      preparation: ["股四头肌", "腓肠肌", "臀肌"],
      acceleration: ["肩胛下肌", "胸大肌", "前三角肌", "肱三头肌"],
      deceleration: ["棘下肌", "小圆肌", "竖脊肌"]
    },
    "截击_正手": {
      lowerBody: ["股四头肌", "臀大肌", "腓肠肌"],
      acceleration: ["前三角肌", "胸大肌", "肩胛下肌"]
    },
    "截击_反手": {
      lowerBody: ["股四头肌", "臀大肌", "腓肠肌"],
      acceleration: ["后三角肌", "棘下肌", "小圆肌", "菱形肌"],
      key: "挥拍幅度小，肩部肌肉离心收缩能力非常关键"
    },
    "步伐": {
      primary: ["腓肠肌", "比目鱼肌", "股四头肌", "臀大肌", "腘绳肌"],
      stabilizer: ["竖脊肌", "腹斜肌", "臀中肌"]
    }
  },

  // ========== 目标技能 → 需重点训练肌肉群 ==========
  skillToMuscles: {
    "正手": ["前三角肌", "胸大肌", "背阔肌", "腹斜肌", "肱二头肌", "股四头肌", "臀肌"],
    "反手": ["后三角肌", "棘下肌", "小圆肌", "菱形肌", "斜方肌", "前臂伸肌"],
    "发球/高压": ["前三角肌", "肱三头肌", "肩胛下肌", "背阔肌", "股四头肌", "腹斜肌"],
    "截击": ["前三角肌", "后三角肌", "股四头肌", "臀大肌", "肱三头肌"],
    "步伐": ["腓肠肌", "比目鱼肌", "股四头肌", "臀大肌", "腘绳肌", "臀中肌"]
  },

  // ========== NTRP 水平描述 ==========
  ntrpLevels: {
    2.0: { desc: "初学者", trainingFocus: ["动作学习", "基础力量", "运动常识"] },
    2.5: { desc: "进阶初学者", trainingFocus: ["动作巩固", "基础力量", "初级战术"] },
    3.0: { desc: "中级", trainingFocus: ["力量提升", "耐力训练", "战术执行"] },
    3.5: { desc: "中高级", trainingFocus: ["专项力量", "爆发力", "比赛耐力"] },
    4.0: { desc: "高级", trainingFocus: ["高水平力量", "敏捷性", "比赛专项"] },
    4.5: { desc: "顶尖业余", trainingFocus: ["竞技级训练", "预防损伤", "心理训练"] },
    5.0: { desc: "准职业", trainingFocus: ["职业级体能", "专项爆发力", "全面竞技能力"] }
  },

  // ========== ACSM 标准（美国运动医学会）==========
  acsmStandards: {
    warmUp: { durationMin: [5, 10], type: ["低强度有氧", "动态拉伸"] },
    coolDown: { durationMin: [5, 10], type: ["静态拉伸", "泡沫轴放松"] },
    strength: {
      sets: [2, 4],
      reps: [8, 15],
      restSec: [30, 90],
      tempo: "2-0-2-0（向心2秒/离心2秒）",
      progressiveOverload: "每周训练量增幅不超过10%"
    },
    cardio: {
      moderateIntensityMinPerWeek: 150,
      vigorousIntensityMinPerWeek: 75
    },
    flexibility: {
      frequencyPerWeek: [2, 3],
      durationPerStretchSec: [10, 30],
      sets: [2, 4]
    },
    weeklyTrainingVolume: {
      beginner: [3, 4],
      intermediate: [4, 5],
      advanced: [5, 6]
    }
  },

  // ========== 训练动作库（59个专业动作）==========
  exercises: [
    // ---- [strength] 哑铃侧平举 (shoulder_dumbbell_lateral_raise) ----,
    {
      id: "shoulder_dumbbell_lateral_raise",
      name_zh: "哑铃侧平举",
      name_en: "Dumbbell Lateral Raise",
      category: "strength",
      target_muscles: [
          "三角肌中束"
        ],
      secondary_muscles: [
          "斜方肌上部",
          "前锯肌"
        ],
      tennis_skills: [
          "击球稳定性",
          "肩部耐力",
          "网前截击"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(2-5kg)"
        ],
      execution_tips: [
          "站姿挺胸，核心收紧",
          "手臂微屈，缓慢向两侧抬起至与肩平齐",
          "小指略高于拇指以更好激活中束",
          "下放时控制速度，不要借力甩动"
        ],
      common_mistakes: [
          "耸肩导致斜方肌代偿",
          "利用身体晃动借力",
          "抬臂过高超过肩平面",
          "速度过快失去肌肉控制"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩峰撞击综合征",
          "肩袖损伤急性期"
        ],
      alternatives: [
          "弹力带侧平举",
          "缆绳侧平举"
        ],
      movement_pattern: "肩外展",
      kinetic_chain: "核心稳定→肩外展→三角肌发力→手臂抬升",
    },
    // ---- [power] 俯身哑铃抓举 (shoulder_bent_over_dumbbell_snatch) ----,
    {
      id: "shoulder_bent_over_dumbbell_snatch",
      name_zh: "俯身哑铃抓举",
      name_en: "Bent-Over Dumbbell Snatch",
      category: "power",
      target_muscles: [
          "三角肌后束",
          "斜方肌",
          "菱形肌"
        ],
      secondary_muscles: [
          "竖脊肌",
          "臀大肌",
          "腘绳肌"
        ],
      tennis_skills: [
          "发球加速",
          "高压球力量",
          "肩部爆发力"
        ],
      difficulty: "intermediate",
      equipment: [
          "哑铃(5-15kg)"
        ],
      execution_tips: [
          "俯身约45度，背部保持平直",
          "单臂爆发性上拉哑铃至头顶",
          "利用髋部伸展产生力量",
          "顶部短暂停留后控制下放"
        ],
      common_mistakes: [
          "弓背导致腰椎压力过大",
          "仅用手臂力量而非全身协调",
          "上拉轨迹偏离身体",
          "未充分利用髋部伸展力量"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "腰椎间盘突出",
          "肩关节不稳"
        ],
      alternatives: [
          "壶铃抓举",
          "哑铃高拉"
        ],
      movement_pattern: "拉+爆发伸展",
      kinetic_chain: "髋铰链→背部拉→肩上拉→手臂伸展→顶部锁定",
    },
    // ---- [stability] 肘到臀的肩胛骨后缩运动 (shoulder_elbow_to_hip_scapular_retraction) ----,
    {
      id: "shoulder_elbow_to_hip_scapular_retraction",
      name_zh: "肘到臀的肩胛骨后缩运动",
      name_en: "Elbow-to-Hip Scapular Retraction",
      category: "stability",
      target_muscles: [
          "菱形肌",
          "斜方肌中下束",
          "肩胛稳定肌群"
        ],
      secondary_muscles: [
          "背阔肌",
          "三角肌后束"
        ],
      tennis_skills: [
          "击球时肩胛稳定",
          "反手击球控制",
          "伤病预防"
        ],
      difficulty: "beginner",
      equipment: [
          "无器材或弹力带"
        ],
      execution_tips: [
          "站立或坐姿，双臂屈肘约90度",
          "将肘部向后向下收至臀部方向",
          "感受肩胛骨用力夹紧",
          "保持颈部放松不耸肩",
          "顶端停留2-3秒"
        ],
      common_mistakes: [
          "耸肩而非下沉肩胛",
          "动作幅度不足",
          "过度后仰代偿",
          "速度过快没有充分收缩"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "急性肩胛区域疼痛"
        ],
      alternatives: [
          "面拉",
          "Y-T-W肩胛训练"
        ],
      movement_pattern: "肩胛后缩下沉",
      kinetic_chain: "肩胛后缩→肘向臀部方向收→菱形肌挤压→肩胛下沉稳定",
    },
    // ---- [stability] 外旋 (shoulder_external_rotation) ----,
    {
      id: "shoulder_external_rotation",
      name_zh: "外旋",
      name_en: "Shoulder External Rotation",
      category: "stability",
      target_muscles: [
          "冈下肌",
          "小圆肌"
        ],
      secondary_muscles: [
          "三角肌后束"
        ],
      tennis_skills: [
          "肩袖稳定",
          "发球减速控制",
          "伤病预防"
        ],
      difficulty: "beginner",
      equipment: [
          "弹力带或轻哑铃(1-3kg)"
        ],
      execution_tips: [
          "上臂贴紧体侧，肘关节屈曲90度",
          "缓慢将前臂向外旋转",
          "保持肘部贴紧身体不外移",
          "回程控制速度，避免弹力带回弹"
        ],
      common_mistakes: [
          "肘部离开身体侧面",
          "利用身体旋转代偿",
          "速度过快失去控制",
          "阻力过大导致其他肌群代偿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 15,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩袖撕裂急性期",
          "肩关节脱位未恢复"
        ],
      alternatives: [
          "侧卧哑铃外旋",
          "缆绳外旋"
        ],
      movement_pattern: "肩外旋",
      kinetic_chain: "肩胛稳定→肩外旋肌群发力→前臂向外旋转",
    },
    // ---- [stability] 90/90外展外旋运动 (shoulder_90_90_abduction_external_rotation) ----,
    {
      id: "shoulder_90_90_abduction_external_rotation",
      name_zh: "90/90外展外旋运动",
      name_en: "90/90 Abduction External Rotation",
      category: "stability",
      target_muscles: [
          "冈下肌",
          "小圆肌",
          "三角肌后束"
        ],
      secondary_muscles: [
          "肩胛稳定肌群",
          "斜方肌下束"
        ],
      tennis_skills: [
          "发球肩部稳定",
          "高压球控制",
          "肩袖强化"
        ],
      difficulty: "intermediate",
      equipment: [
          "弹力带或轻哑铃(1-2kg)"
        ],
      execution_tips: [
          "上臂外展至90度，肘屈90度呈'投降'姿势",
          "保持上臂位置不变，前臂向上旋转",
          "肩胛骨保持后缩下沉",
          "动作缓慢且可控，顶端停留1秒"
        ],
      common_mistakes: [
          "上臂位置不稳定发生偏移",
          "弓背或挺腰代偿",
          "阻力过大导致耸肩",
          "旋转幅度不足"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩峰撞击综合征",
          "肩袖损伤急性期",
          "肩关节不稳"
        ],
      alternatives: [
          "侧卧90/90外旋",
          "缆绳90/90外旋"
        ],
      movement_pattern: "肩90度外展位外旋",
      kinetic_chain: "肩胛稳定→肩外展90度固定→外旋肌群发力→前臂向上旋转",
    },
    // ---- [stability] 90/90外展内旋运动 (shoulder_90_90_abduction_internal_rotation) ----,
    {
      id: "shoulder_90_90_abduction_internal_rotation",
      name_zh: "90/90外展内旋运动",
      name_en: "90/90 Abduction Internal Rotation",
      category: "stability",
      target_muscles: [
          "肩胛下肌",
          "大圆肌"
        ],
      secondary_muscles: [
          "胸大肌",
          "前锯肌"
        ],
      tennis_skills: [
          "发球加速阶段力量",
          "正手击球内旋鞭打",
          "肩袖平衡"
        ],
      difficulty: "intermediate",
      equipment: [
          "弹力带或轻哑铃(1-2kg)"
        ],
      execution_tips: [
          "上臂外展至90度，肘屈90度",
          "保持上臂位置不变，前臂向下旋转",
          "不要让肘部下垂",
          "控制动作速度，感受内旋肌群收缩"
        ],
      common_mistakes: [
          "肘部下沉失去90度外展位",
          "躯干前倾代偿",
          "旋转范围过大导致肩前侧不适",
          "动作过快失去控制"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩前方不稳",
          "肩袖撕裂",
          "肩峰撞击"
        ],
      alternatives: [
          "缆绳内旋",
          "弹力带站姿内旋"
        ],
      movement_pattern: "肩90度外展位内旋",
      kinetic_chain: "肩胛稳定→肩外展90度固定→内旋肌群发力→前臂向下旋转",
    },
    // ---- [strength] 低拉力 (shoulder_low_pull) ----,
    {
      id: "shoulder_low_pull",
      name_zh: "低拉力",
      name_en: "Low Cable Pull",
      category: "strength",
      target_muscles: [
          "三角肌后束",
          "菱形肌",
          "斜方肌中束"
        ],
      secondary_muscles: [
          "肱二头肌",
          "前臂肌群"
        ],
      tennis_skills: [
          "反手击球稳定",
          "网前截击控制",
          "肩后侧力量平衡"
        ],
      difficulty: "beginner",
      equipment: [
          "拉力器或弹力带"
        ],
      execution_tips: [
          "面对低位滑轮或固定弹力带",
          "双手握把向后下方拉",
          "感受肩胛骨后缩夹紧",
          "肘部保持微屈",
          "缓慢回到起始位置"
        ],
      common_mistakes: [
          "身体后仰借力",
          "仅用手臂拉而非肩胛带动",
          "速度过快缺乏肌肉张力",
          "肩部耸起代偿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩关节急性炎症",
          "肱二头肌腱炎"
        ],
      alternatives: [
          "弹力带面拉",
          "俯身哑铃飞鸟"
        ],
      movement_pattern: "低位拉",
      kinetic_chain: "下肢稳定→躯干固定→肩后伸+后缩→肩胛骨收紧",
    },
    // ---- [strength] 肱三头肌拉力器下压 (arm_triceps_cable_pushdown) ----,
    {
      id: "arm_triceps_cable_pushdown",
      name_zh: "肱三头肌拉力器下压",
      name_en: "Triceps Cable Pushdown",
      category: "strength",
      target_muscles: [
          "肱三头肌"
        ],
      secondary_muscles: [
          "前臂伸肌",
          "核心稳定肌"
        ],
      tennis_skills: [
          "发球手臂伸展力量",
          "截击推挡力量",
          "反手切削"
        ],
      difficulty: "beginner",
      equipment: [
          "拉力器",
          "直杆或绳索附件"
        ],
      execution_tips: [
          "站姿面对高位滑轮，上臂夹紧体侧",
          "肘关节为轴心向下伸展前臂",
          "完全伸直时挤压肱三头肌",
          "缓慢回到起始位置，不超过前臂与上臂90度"
        ],
      common_mistakes: [
          "肘部前后移动偏离体侧",
          "身体前倾利用体重下压",
          "回程时阻力拉动身体上移",
          "锁肘过度造成关节压力"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肘关节炎症",
          "肱三头肌腱炎"
        ],
      alternatives: [
          "窄距俯卧撑",
          "仰卧臂屈伸"
        ],
      movement_pattern: "肘伸展",
      kinetic_chain: "核心稳定→肩固定→肘关节伸展→肱三头肌收缩",
    },
    // ---- [strength] 半屈伸 (arm_half_extension) ----,
    {
      id: "arm_half_extension",
      name_zh: "半屈伸",
      name_en: "Half Extension (Partial Triceps Extension)",
      category: "strength",
      target_muscles: [
          "肱三头肌长头"
        ],
      secondary_muscles: [
          "肱三头肌内侧头",
          "肩后部稳定肌"
        ],
      tennis_skills: [
          "发球随挥控制",
          "过顶击球稳定性"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(3-8kg)或弹力带"
        ],
      execution_tips: [
          "手臂举过头顶，肘部朝天花板",
          "在半程范围内做肘部伸展",
          "保持上臂固定不动",
          "专注肌肉持续紧张感"
        ],
      common_mistakes: [
          "上臂前后摇摆",
          "动作幅度过大或过小",
          "背部过度后仰",
          "速度过快失去张力"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肘关节不稳定",
          "肱三头肌腱损伤"
        ],
      alternatives: [
          "颈后臂屈伸",
          "拉力器过顶臂屈伸"
        ],
      movement_pattern: "部分肘伸展",
      kinetic_chain: "肩稳定→肘半程伸展→肱三头肌持续张力",
    },
    // ---- [strength] 拉力器过顶臂屈伸 (arm_cable_overhead_triceps_extension) ----,
    {
      id: "arm_cable_overhead_triceps_extension",
      name_zh: "拉力器过顶臂屈伸",
      name_en: "Cable Overhead Triceps Extension",
      category: "strength",
      target_muscles: [
          "肱三头肌长头"
        ],
      secondary_muscles: [
          "肱三头肌外侧头",
          "核心稳定肌"
        ],
      tennis_skills: [
          "发球过顶伸展力量",
          "高压球力量",
          "过顶控制"
        ],
      difficulty: "intermediate",
      equipment: [
          "拉力器",
          "绳索附件"
        ],
      execution_tips: [
          "背对低位滑轮，双手持绳索过头",
          "前跨一步获得稳定站姿",
          "上臂固定于耳侧，向前上方伸展肘关节",
          "完全伸直后挤压，缓慢回收"
        ],
      common_mistakes: [
          "上臂随动作前后摆动",
          "弓背或过度挺腰",
          "用肩部力量代偿",
          "起始位肘部打开角度过大"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩关节活动受限",
          "肘关节炎症"
        ],
      alternatives: [
          "哑铃颈后臂屈伸",
          "弹力带过顶臂屈伸"
        ],
      movement_pattern: "过顶肘伸展",
      kinetic_chain: "核心稳定→肩上举固定→肘关节伸展→肱三头肌长头充分收缩",
    },
    // ---- [strength] 锤式哑铃屈臂 (arm_hammer_dumbbell_curl) ----,
    {
      id: "arm_hammer_dumbbell_curl",
      name_zh: "锤式哑铃屈臂",
      name_en: "Hammer Dumbbell Curl",
      category: "strength",
      target_muscles: [
          "肱肌",
          "肱桡肌"
        ],
      secondary_muscles: [
          "肱二头肌",
          "前臂肌群"
        ],
      tennis_skills: [
          "握拍稳定性",
          "前臂力量",
          "截击控制"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(3-10kg)"
        ],
      execution_tips: [
          "站姿或坐姿，掌心相对（中立握法）",
          "保持上臂贴紧体侧不动",
          "肘关节为轴心向上弯举",
          "顶端短暂停留后缓慢下放"
        ],
      common_mistakes: [
          "身体摇摆借力",
          "肘部前移改变力臂",
          "下放速度过快",
          "手腕旋转偏离中立位"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肘关节炎症",
          "肱二头肌腱炎"
        ],
      alternatives: [
          "绳索锤式弯举",
          "交替哑铃弯举"
        ],
      movement_pattern: "中立位肘屈",
      kinetic_chain: "核心稳定→上臂固定→肘屈曲→肱肌与肱桡肌协同发力",
    },
    // ---- [strength] 正握腕弯举 (wrist_pronated_curl) ----,
    {
      id: "wrist_pronated_curl",
      name_zh: "正握腕弯举",
      name_en: "Pronated Wrist Curl (Wrist Extension)",
      category: "strength",
      target_muscles: [
          "前臂伸肌群",
          "桡侧腕伸肌"
        ],
      secondary_muscles: [
          "指伸肌"
        ],
      tennis_skills: [
          "反手击球腕部稳定",
          "网球肘预防",
          "握拍力量"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(1-3kg)或杠铃"
        ],
      execution_tips: [
          "前臂放于膝上或平面上，掌心朝下",
          "手腕悬空于支撑面外",
          "缓慢将手腕向上翘起（背伸）",
          "顶端停留1秒后控制下放"
        ],
      common_mistakes: [
          "前臂离开支撑面",
          "动作幅度过大造成关节不适",
          "重量过大无法控制",
          "速度过快"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 15,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "网球肘急性期",
          "腕关节腱鞘炎"
        ],
      alternatives: [
          "弹力带腕背伸",
          "握力器训练"
        ],
      movement_pattern: "腕背伸",
      kinetic_chain: "前臂固定→腕关节背伸→前臂伸肌群收缩",
    },
    // ---- [strength] 反握腕弯举 (wrist_supinated_curl) ----,
    {
      id: "wrist_supinated_curl",
      name_zh: "反握腕弯举",
      name_en: "Supinated Wrist Curl (Wrist Flexion)",
      category: "strength",
      target_muscles: [
          "前臂屈肌群",
          "桡侧腕屈肌"
        ],
      secondary_muscles: [
          "指屈肌"
        ],
      tennis_skills: [
          "正手上旋发力",
          "发球屈腕加速",
          "握拍力量"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(2-5kg)或杠铃"
        ],
      execution_tips: [
          "前臂放于膝上或平面上，掌心朝上",
          "手腕悬空于支撑面外",
          "缓慢将手腕向上卷起（掌屈）",
          "顶端挤压后缓慢回放"
        ],
      common_mistakes: [
          "前臂抬离支撑面",
          "仅用手指卷动而非腕部发力",
          "重量过大影响动作质量",
          "未充分利用全程动作范围"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 15,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "高尔夫球肘急性期",
          "腕管综合征"
        ],
      alternatives: [
          "弹力带腕屈",
          "毛巾拧转训练"
        ],
      movement_pattern: "腕屈曲",
      kinetic_chain: "前臂固定→腕关节掌屈→前臂屈肌群收缩",
    },
    // ---- [stability] 前臂外旋 (wrist_forearm_pronation) ----,
    {
      id: "wrist_forearm_pronation",
      name_zh: "前臂外旋",
      name_en: "Forearm Pronation",
      category: "stability",
      target_muscles: [
          "旋前圆肌",
          "旋前方肌"
        ],
      secondary_muscles: [
          "前臂屈肌群"
        ],
      tennis_skills: [
          "正手上旋击球",
          "发球内旋动作",
          "切削控制"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(1-3kg)或锤子形重物"
        ],
      execution_tips: [
          "肘部屈曲90度固定于体侧",
          "手持哑铃一端（偏重），掌心朝上起始",
          "缓慢旋转前臂使掌心转向地面",
          "控制回到起始位置"
        ],
      common_mistakes: [
          "肘部离开体侧",
          "利用肩关节旋转代偿",
          "速度过快缺乏控制",
          "动作范围不充分"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "前臂肌腱炎",
          "肘关节不稳"
        ],
      alternatives: [
          "弹力带旋前",
          "毛巾拧转"
        ],
      movement_pattern: "前臂旋前",
      kinetic_chain: "肘固定→前臂旋前→旋前肌群收缩→掌心转向下方",
    },
    // ---- [stability] 前臂内旋 (wrist_forearm_supination) ----,
    {
      id: "wrist_forearm_supination",
      name_zh: "前臂内旋",
      name_en: "Forearm Supination",
      category: "stability",
      target_muscles: [
          "旋后肌",
          "肱二头肌"
        ],
      secondary_muscles: [
          "前臂伸肌群"
        ],
      tennis_skills: [
          "反手击球旋转",
          "截击面控制",
          "前臂稳定性"
        ],
      difficulty: "beginner",
      equipment: [
          "哑铃(1-3kg)或锤子形重物"
        ],
      execution_tips: [
          "肘部屈曲90度固定于体侧",
          "手持哑铃一端，掌心朝下起始",
          "缓慢旋转前臂使掌心转向天花板",
          "控制回到起始位置"
        ],
      common_mistakes: [
          "借助肩关节旋转",
          "肘部脱离固定位置",
          "动作范围不完整",
          "用力过猛缺乏控制"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "前臂肌腱炎",
          "肘关节外侧疼痛"
        ],
      alternatives: [
          "弹力带旋后",
          "螺丝刀练习"
        ],
      movement_pattern: "前臂旋后",
      kinetic_chain: "肘固定→前臂旋后→旋后肌收缩→掌心转向上方",
    },
    // ---- [strength] 俯卧撑 (chest_push_up) ----,
    {
      id: "chest_push_up",
      name_zh: "俯卧撑",
      name_en: "Push-Up",
      category: "strength",
      target_muscles: [
          "胸大肌",
          "肱三头肌",
          "三角肌前束"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "前锯肌"
        ],
      tennis_skills: [
          "正手击球推送力量",
          "截击推挡",
          "上肢整体力量"
        ],
      difficulty: "beginner",
      equipment: [
          "无器材"
        ],
      execution_tips: [
          "双手略宽于肩，手指朝前",
          "身体从头到脚成一条直线",
          "下降时肘部约45度角打开",
          "胸部接近地面后推起，全程保持核心紧绷"
        ],
      common_mistakes: [
          "臀部下沉或翘起破坏身体直线",
          "颈部过度前伸",
          "肘部过度外展成T型增加肩压",
          "动作幅度不完整"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "腕关节急性损伤",
          "肩关节不稳定"
        ],
      alternatives: [
          "跪姿俯卧撑",
          "上斜俯卧撑",
          "哑铃卧推"
        ],
      movement_pattern: "水平推",
      kinetic_chain: "核心稳定→肩胛前引→胸肌收缩→肘伸展→推起身体",
    },
    // ---- [strength] 站姿前推 (chest_standing_press) ----,
    {
      id: "chest_standing_press",
      name_zh: "站姿前推",
      name_en: "Standing Cable Chest Press",
      category: "strength",
      target_muscles: [
          "胸大肌",
          "三角肌前束"
        ],
      secondary_muscles: [
          "肱三头肌",
          "核心稳定肌",
          "前锯肌"
        ],
      tennis_skills: [
          "正手推送力量",
          "截击稳定性",
          "站姿发力模式"
        ],
      difficulty: "intermediate",
      equipment: [
          "拉力器或弹力带"
        ],
      execution_tips: [
          "面朝远离滑轮方向，前后脚站姿",
          "双手持把于胸两侧",
          "向前推出至手臂伸直",
          "核心保持稳定抗旋转，缓慢回收"
        ],
      common_mistakes: [
          "身体前倾借力",
          "核心不稳身体旋转",
          "肩部耸起",
          "推出时手臂轨迹偏移"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩前方不稳",
          "急性胸肌拉伤"
        ],
      alternatives: [
          "弹力带站姿推胸",
          "单臂哑铃卧推"
        ],
      movement_pattern: "站姿水平推",
      kinetic_chain: "下肢稳定→核心抗旋转→胸肌发力→手臂前推",
    },
    // ---- [strength] 平板卧推 (chest_flat_bench_press) ----,
    {
      id: "chest_flat_bench_press",
      name_zh: "平板卧推",
      name_en: "Flat Bench Press",
      category: "strength",
      target_muscles: [
          "胸大肌中部",
          "肱三头肌"
        ],
      secondary_muscles: [
          "三角肌前束",
          "前锯肌"
        ],
      tennis_skills: [
          "上肢推力基础",
          "正手击球基础力量",
          "截击爆发力"
        ],
      difficulty: "intermediate",
      equipment: [
          "杠铃",
          "卧推架",
          "平板凳"
        ],
      execution_tips: [
          "仰卧平板凳上，双脚踩实地面",
          "肩胛骨后缩下沉贴紧凳面",
          "杠铃下放至胸部中下方",
          "发力推起至手臂伸直但不锁死"
        ],
      common_mistakes: [
          "肩胛骨未后缩导致肩关节负担",
          "杠铃触胸时弹起借力",
          "臀部抬离凳面",
          "握距过宽或过窄"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 90
        },
        "advanced": {
          "sets": 4,
          "reps": 8,
          "rest_sec": 75
        }
      },
      contraindications: [
          "肩峰撞击",
          "胸肌撕裂恢复期"
        ],
      alternatives: [
          "哑铃卧推",
          "器械推胸"
        ],
      movement_pattern: "仰卧水平推",
      kinetic_chain: "肩胛后缩稳定→胸肌拉伸→胸肌收缩→肘伸展→推起杠铃",
    },
    // ---- [strength] 上斜式推举 (chest_incline_press) ----,
    {
      id: "chest_incline_press",
      name_zh: "上斜式推举",
      name_en: "Incline Press",
      category: "strength",
      target_muscles: [
          "胸大肌上部",
          "三角肌前束"
        ],
      secondary_muscles: [
          "肱三头肌",
          "前锯肌"
        ],
      tennis_skills: [
          "发球上推力量",
          "高压球力量",
          "上肢推力"
        ],
      difficulty: "intermediate",
      equipment: [
          "哑铃或杠铃",
          "可调节斜板凳(30-45度)"
        ],
      execution_tips: [
          "斜板调至30-45度角",
          "肩胛后缩下沉贴紧椅背",
          "哑铃/杠铃从肩上方推起",
          "下放至锁骨与胸部之间"
        ],
      common_mistakes: [
          "角度过大变成肩推",
          "臀部抬离椅面",
          "肩胛未固定导致肩前侧不适",
          "双侧力量不均衡"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 4,
          "reps": 8,
          "rest_sec": 60
        }
      },
      contraindications: [
          "肩峰撞击综合征",
          "肩关节不稳"
        ],
      alternatives: [
          "上斜哑铃飞鸟",
          "低位缆绳夹胸"
        ],
      movement_pattern: "上斜推",
      kinetic_chain: "肩胛稳定→胸上部拉伸→胸肌上部+三角肌前束发力→推起",
    },
    // ---- [power] 胸前扔健身实心球 (chest_medicine_ball_chest_throw) ----,
    {
      id: "chest_medicine_ball_chest_throw",
      name_zh: "胸前扔健身实心球",
      name_en: "Medicine Ball Chest Throw",
      category: "power",
      target_muscles: [
          "胸大肌",
          "肱三头肌",
          "三角肌前束"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "前锯肌"
        ],
      tennis_skills: [
          "截击爆发力",
          "正手击球力量传递",
          "快速推送能力"
        ],
      difficulty: "intermediate",
      equipment: [
          "药球/健身实心球(2-4kg)",
          "墙壁或训练伙伴"
        ],
      execution_tips: [
          "面对墙壁约2米距离站立",
          "将球持于胸前，肘部打开",
          "利用胸部和手臂爆发性推出",
          "接住反弹球后立即再次推出"
        ],
      common_mistakes: [
          "仅用手臂推而非胸部发力",
          "站距过近影响发力空间",
          "推出时身体失去平衡",
          "未充分利用下肢和核心"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "肩关节不稳定",
          "腕关节损伤"
        ],
      alternatives: [
          "弹力带快速推胸",
          "药球地面砸球"
        ],
      movement_pattern: "爆发性水平推",
      kinetic_chain: "下肢驱动→核心稳定→胸肌爆发收缩→手臂快速伸展→释放",
    },
    // ---- [strength] 哑铃扩胸 (chest_dumbbell_fly) ----,
    {
      id: "chest_dumbbell_fly",
      name_zh: "哑铃扩胸",
      name_en: "Dumbbell Chest Fly",
      category: "strength",
      target_muscles: [
          "胸大肌",
          "三角肌前束"
        ],
      secondary_muscles: [
          "肱二头肌（稳定）",
          "前锯肌"
        ],
      tennis_skills: [
          "正手击球横向力量",
          "胸肌柔韧性",
          "肩关节活动度"
        ],
      difficulty: "intermediate",
      equipment: [
          "哑铃(3-12kg)",
          "平板凳"
        ],
      execution_tips: [
          "仰卧平板凳上，双手持哑铃于胸上方",
          "手臂微屈，缓慢向两侧张开",
          "下降至与胸平齐时感受拉伸",
          "收回时想象环抱一棵大树"
        ],
      common_mistakes: [
          "手臂过于伸直造成肘关节压力",
          "下降幅度过大拉伤胸肌",
          "动作变成卧推（肘屈过多）",
          "重量过大无法控制轨迹"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩前方不稳",
          "胸肌拉伤恢复期"
        ],
      alternatives: [
          "缆绳夹胸",
          "蝶机夹胸"
        ],
      movement_pattern: "水平内收",
      kinetic_chain: "肩胛后缩→胸肌拉伸→胸肌收缩内收→手臂合拢",
    },
    // ---- [strength] 颈前下拉 (back_lat_pulldown_front) ----,
    {
      id: "back_lat_pulldown_front",
      name_zh: "颈前下拉",
      name_en: "Front Lat Pulldown",
      category: "strength",
      target_muscles: [
          "背阔肌",
          "大圆肌"
        ],
      secondary_muscles: [
          "肱二头肌",
          "菱形肌",
          "斜方肌下束"
        ],
      tennis_skills: [
          "发球拉拍力量",
          "过顶击球下拉",
          "肩关节稳定"
        ],
      difficulty: "beginner",
      equipment: [
          "高位下拉器械",
          "宽握横杆"
        ],
      execution_tips: [
          "坐姿面对器械，大腿固定于垫下",
          "双手宽握横杆，略宽于肩",
          "肩胛先下沉再拉，横杆拉至锁骨前方",
          "胸部挺起迎向横杆，缓慢回放"
        ],
      common_mistakes: [
          "身体过度后仰借力",
          "用手臂拉而非背部发力",
          "肩胛未先行下沉就拉",
          "回放时完全放松失去肌肉张力"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 4,
          "reps": 10,
          "rest_sec": 45
        }
      },
      contraindications: [
          "肩关节活动受限",
          "肱二头肌腱炎"
        ],
      alternatives: [
          "引体向上",
          "弹力带下拉"
        ],
      movement_pattern: "垂直拉",
      kinetic_chain: "肩胛下沉→背阔肌收缩→肘屈+肩内收→横杆拉至锁骨",
    },
    // ---- [strength] 转体下拉 (back_rotational_pulldown) ----,
    {
      id: "back_rotational_pulldown",
      name_zh: "转体下拉",
      name_en: "Rotational Pulldown",
      category: "strength",
      target_muscles: [
          "背阔肌",
          "腹斜肌"
        ],
      secondary_muscles: [
          "大圆肌",
          "肱二头肌",
          "核心旋转肌群"
        ],
      tennis_skills: [
          "正手拉拍蓄力",
          "发球转体下拉",
          "旋转力量链接"
        ],
      difficulty: "intermediate",
      equipment: [
          "高位下拉器械",
          "单手把手"
        ],
      execution_tips: [
          "坐姿面对高位滑轮",
          "单手握把向对侧髋部方向拉下",
          "躯干配合轻微旋转",
          "感受背阔肌和腹斜肌的协同发力"
        ],
      common_mistakes: [
          "过度旋转导致脊柱不稳",
          "仅用手臂拉动缺乏背部参与",
          "速度过快失去控制",
          "肩部耸起代偿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "腰椎间盘问题",
          "肩关节不稳"
        ],
      alternatives: [
          "缆绳单臂下拉",
          "弹力带旋转下拉"
        ],
      movement_pattern: "旋转下拉",
      kinetic_chain: "肩胛下沉→背阔肌收缩→躯干旋转→单侧下拉完成",
    },
    // ---- [strength] 坐姿划船 (back_seated_row) ----,
    {
      id: "back_seated_row",
      name_zh: "坐姿划船",
      name_en: "Seated Cable Row",
      category: "strength",
      target_muscles: [
          "菱形肌",
          "斜方肌中束",
          "背阔肌"
        ],
      secondary_muscles: [
          "肱二头肌",
          "三角肌后束",
          "竖脊肌"
        ],
      tennis_skills: [
          "反手击球拉回力量",
          "肩胛稳定性",
          "姿势维持"
        ],
      difficulty: "beginner",
      equipment: [
          "坐姿划船器械",
          "V形把手或直杆"
        ],
      execution_tips: [
          "坐姿挺胸，膝盖微屈，脚踩踏板",
          "先启动肩胛后缩再屈肘拉",
          "拉至腹部位置，挤压背部肌肉",
          "缓慢回放但不让重量片碰撞"
        ],
      common_mistakes: [
          "身体前后大幅摇摆借力",
          "弓背圆肩",
          "仅用手臂拉动",
          "拉回时肩部耸起"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 4,
          "reps": 10,
          "rest_sec": 45
        }
      },
      contraindications: [
          "急性腰痛",
          "肱二头肌腱损伤"
        ],
      alternatives: [
          "弹力带坐姿划船",
          "单臂哑铃划船"
        ],
      movement_pattern: "水平拉",
      kinetic_chain: "下肢固定→核心稳定→肩胛后缩→背阔肌与菱形肌收缩→肘屈拉回",
    },
    // ---- [strength] 反式蝶机展肩 (back_reverse_pec_deck) ----,
    {
      id: "back_reverse_pec_deck",
      name_zh: "反式蝶机展肩",
      name_en: "Reverse Pec Deck Fly",
      category: "strength",
      target_muscles: [
          "三角肌后束",
          "菱形肌"
        ],
      secondary_muscles: [
          "斜方肌中束",
          "冈下肌"
        ],
      tennis_skills: [
          "反手击球稳定",
          "肩后侧力量平衡",
          "肩袖保护"
        ],
      difficulty: "beginner",
      equipment: [
          "蝶机（反向使用）"
        ],
      execution_tips: [
          "面朝器械坐下，胸贴靠垫",
          "双手握把手，手臂微屈",
          "向后展开手臂至与躯干平齐",
          "顶端挤压后缓慢回收"
        ],
      common_mistakes: [
          "身体离开靠垫借力",
          "手臂过于伸直增加肘部压力",
          "耸肩用斜方肌上部代偿",
          "动作幅度过大"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩后方疼痛",
          "肩关节活动受限"
        ],
      alternatives: [
          "俯身哑铃飞鸟",
          "弹力带面拉"
        ],
      movement_pattern: "肩水平外展",
      kinetic_chain: "肩胛固定→三角肌后束+菱形肌发力→手臂向后展开",
    },
    // ---- [strength] 俯身杠铃划船 (back_bent_over_barbell_row) ----,
    {
      id: "back_bent_over_barbell_row",
      name_zh: "俯身杠铃划船",
      name_en: "Bent-Over Barbell Row",
      category: "strength",
      target_muscles: [
          "背阔肌",
          "菱形肌",
          "斜方肌中下束"
        ],
      secondary_muscles: [
          "竖脊肌",
          "肱二头肌",
          "三角肌后束"
        ],
      tennis_skills: [
          "全面背部力量",
          "正手蓄力姿势",
          "核心抗屈稳定"
        ],
      difficulty: "intermediate",
      equipment: [
          "杠铃"
        ],
      execution_tips: [
          "站姿髋铰链俯身约45度，背部平直",
          "双手正握略宽于肩",
          "将杠铃拉向下腹部",
          "肩胛骨充分夹紧后缓慢下放"
        ],
      common_mistakes: [
          "弓背圆肩增加腰椎负担",
          "身体角度过于直立变成耸肩",
          "利用身体弹动借力",
          "拉的位置过高偏向胸部"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 4,
          "reps": 8,
          "rest_sec": 60
        }
      },
      contraindications: [
          "腰椎间盘突出",
          "急性腰肌劳损"
        ],
      alternatives: [
          "T杠划船",
          "单臂哑铃划船"
        ],
      movement_pattern: "俯身水平拉",
      kinetic_chain: "髋铰链姿势保持→核心稳定→肩胛后缩→背部肌群收缩→杠铃拉向腹部",
    },
    // ---- [strength] 硬拉 (back_deadlift) ----,
    {
      id: "back_deadlift",
      name_zh: "硬拉",
      name_en: "Deadlift",
      category: "strength",
      target_muscles: [
          "竖脊肌",
          "臀大肌",
          "腘绳肌"
        ],
      secondary_muscles: [
          "股四头肌",
          "斜方肌",
          "前臂握力",
          "核心肌群"
        ],
      tennis_skills: [
          "下肢驱动力量",
          "后链力量基础",
          "全身协调发力"
        ],
      difficulty: "advanced",
      equipment: [
          "杠铃",
          "杠铃片"
        ],
      execution_tips: [
          "双脚与髋同宽，杠铃贴小腿",
          "髋铰链下蹲握杠，背部平直",
          "发力时想象'推地板'而非'拉杠铃'",
          "髋膝同时伸展，杠铃贴身上移",
          "顶端臀部夹紧不过度后仰"
        ],
      common_mistakes: [
          "弓背圆肩极易导致腰椎受伤",
          "杠铃远离身体增加力臂",
          "起始位臀位过高变成直腿硬拉",
          "膝盖内扣",
          "过度后仰锁定"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 120
        },
        "intermediate": {
          "sets": 3,
          "reps": 6,
          "rest_sec": 120
        },
        "advanced": {
          "sets": 4,
          "reps": 5,
          "rest_sec": 120
        }
      },
      contraindications: [
          "腰椎间盘突出",
          "急性腰痛",
          "膝关节严重损伤"
        ],
      alternatives: [
          "六角杆硬拉",
          "壶铃硬拉",
          "罗马尼亚硬拉"
        ],
      movement_pattern: "髋铰链",
      kinetic_chain: "握紧杠铃→核心绷紧→髋膝同步伸展→背部保持中立→站起锁定",
    },
    // ---- [strength] 屈膝仰卧起 (core_crunch) ----,
    {
      id: "core_crunch",
      name_zh: "屈膝仰卧起",
      name_en: "Crunch",
      category: "strength",
      target_muscles: [
          "腹直肌上部"
        ],
      secondary_muscles: [
          "腹斜肌"
        ],
      tennis_skills: [
          "躯干屈曲力量",
          "发球抛球后收腹",
          "核心基础"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "仰卧屈膝，脚平踩地面",
          "双手轻放耳侧或交叉于胸前",
          "卷腹至肩胛骨离地即可",
          "下放时保持腹肌持续紧张"
        ],
      common_mistakes: [
          "双手抱头拉颈部",
          "全程仰卧起坐（过度屈曲）",
          "利用惯性快速弹起",
          "脚部抬离地面"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 15,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 25,
          "rest_sec": 30
        }
      },
      contraindications: [
          "急性腰痛",
          "颈椎问题"
        ],
      alternatives: [
          "死虫式",
          "反向卷腹"
        ],
      movement_pattern: "躯干屈曲",
      kinetic_chain: "骨盆固定→腹直肌收缩→肩胛离地→脊柱屈曲",
    },
    // ---- [strength] 侧式卷腹 (core_oblique_crunch) ----,
    {
      id: "core_oblique_crunch",
      name_zh: "侧式卷腹",
      name_en: "Oblique Crunch",
      category: "strength",
      target_muscles: [
          "腹斜肌"
        ],
      secondary_muscles: [
          "腹直肌",
          "髂腰肌"
        ],
      tennis_skills: [
          "旋转力量",
          "侧向稳定性",
          "正反手转体力量"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "侧卧或仰卧膝盖倒向一侧",
          "向对侧肩方向卷起",
          "感受侧腹明显收缩",
          "每侧完成相同次数"
        ],
      common_mistakes: [
          "用髋屈肌代偿",
          "动作幅度过小无法激活",
          "速度过快依赖惯性",
          "两侧训练量不均衡"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "腰椎侧凸",
          "急性腰肌劳损"
        ],
      alternatives: [
          "站姿侧屈",
          "缆绳侧向卷腹"
        ],
      movement_pattern: "躯干侧屈+旋转",
      kinetic_chain: "骨盆固定→腹斜肌收缩→躯干侧向屈曲/旋转",
    },
    // ---- [strength] 触足卷腹 (core_toe_touch_crunch) ----,
    {
      id: "core_toe_touch_crunch",
      name_zh: "触足卷腹",
      name_en: "Toe Touch Crunch (with Bicycle and Rotational variations)",
      category: "strength",
      target_muscles: [
          "腹直肌",
          "腹斜肌"
        ],
      secondary_muscles: [
          "髂腰肌",
          "股四头肌"
        ],
      tennis_skills: [
          "核心耐力",
          "旋转力量",
          "快速方向变换中的躯干控制"
        ],
      difficulty: "intermediate",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "仰卧双腿伸直上举至垂直（触足）",
          "手臂伸直向上够脚尖",
          "空中蹬车变体：交替屈膝模拟骑车",
          "转体触足变体：对侧手肘触对侧膝盖"
        ],
      common_mistakes: [
          "颈部过度前屈",
          "下背部拱起离地",
          "动作速度过快牺牲质量",
          "腿部下落时失去腹部张力"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "颈椎疾病",
          "严重腰痛"
        ],
      alternatives: [
          "V字卷腹",
          "悬垂举腿"
        ],
      movement_pattern: "躯干屈曲+旋转",
      kinetic_chain: "腿部上抬→腹肌收缩→手触脚/对侧旋转→交替循环",
    },
    // ---- [stability] 平板支撑 (core_plank) ----,
    {
      id: "core_plank",
      name_zh: "平板支撑",
      name_en: "Plank",
      category: "stability",
      target_muscles: [
          "腹横肌",
          "腹直肌",
          "竖脊肌"
        ],
      secondary_muscles: [
          "臀肌",
          "三角肌",
          "股四头肌"
        ],
      tennis_skills: [
          "核心稳定性",
          "击球时躯干刚性",
          "长时间比赛体能"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "前臂撑地，肘在肩正下方",
          "身体从头到脚成一条直线",
          "腹部收紧，臀部微夹",
          "保持正常呼吸，不要憋气"
        ],
      common_mistakes: [
          "臀部过高或下沉",
          "肩膀耸起靠近耳朵",
          "憋气导致血压升高",
          "颈部过度抬头或低头"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 1,
          "rest_sec": 60,
          "duration_sec": 20
        },
        "intermediate": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 45,
          "duration_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 30,
          "duration_sec": 60
        }
      },
      contraindications: [
          "严重腰痛",
          "肩关节损伤"
        ],
      alternatives: [
          "侧平板支撑",
          "死虫式"
        ],
      movement_pattern: "等长收缩/抗伸展",
      kinetic_chain: "全身等长收缩→腹部抗伸展→脊柱中立维持",
    },
    // ---- [strength] 俄罗斯式扭转 (core_russian_twist) ----,
    {
      id: "core_russian_twist",
      name_zh: "俄罗斯式扭转",
      name_en: "Russian Twist",
      category: "strength",
      target_muscles: [
          "腹斜肌",
          "腹横肌"
        ],
      secondary_muscles: [
          "腹直肌",
          "髂腰肌"
        ],
      tennis_skills: [
          "旋转力量",
          "正反手转体",
          "快速方向变换"
        ],
      difficulty: "intermediate",
      equipment: [
          "瑜伽垫",
          "药球或哑铃(2-5kg，可选)"
        ],
      execution_tips: [
          "坐姿身体后倾约45度，膝盖微屈",
          "双手持重物或合掌于胸前",
          "躯干左右旋转，目光跟随双手",
          "保持下背部不塌陷",
          "可抬脚离地增加难度"
        ],
      common_mistakes: [
          "仅旋转手臂而非躯干",
          "身体前后摇摆",
          "下背部过度弯曲",
          "速度过快失去控制"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 16,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 24,
          "rest_sec": 30
        }
      },
      contraindications: [
          "腰椎间盘问题",
          "急性腰痛"
        ],
      alternatives: [
          "缆绳砍伐",
          "帕洛夫推"
        ],
      movement_pattern: "坐姿躯干旋转",
      kinetic_chain: "坐姿V形保持→核心稳定→腹斜肌驱动→躯干左右旋转",
    },
    // ---- [stability] 游泳 (core_swimming) ----,
    {
      id: "core_swimming",
      name_zh: "游泳",
      name_en: "Swimming (Prone Alternating Limb Raise)",
      category: "stability",
      target_muscles: [
          "竖脊肌",
          "多裂肌",
          "臀大肌"
        ],
      secondary_muscles: [
          "三角肌后束",
          "腘绳肌",
          "斜方肌"
        ],
      tennis_skills: [
          "后链稳定性",
          "脊柱保护",
          "协调性"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "俯卧于垫上，双臂前伸",
          "交替抬起对侧手和脚",
          "动作小而快，持续交替",
          "保持颈部中立，目视地面"
        ],
      common_mistakes: [
          "动作幅度过大导致腰部过度后伸",
          "颈部过度抬起",
          "憋气不呼吸",
          "只抬手臂不抬腿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 1,
          "rest_sec": 45,
          "duration_sec": 20
        },
        "intermediate": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 30,
          "duration_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 30,
          "duration_sec": 45
        }
      },
      contraindications: [
          "腰椎滑脱",
          "严重腰痛"
        ],
      alternatives: [
          "鸟狗式",
          "俯卧两头起"
        ],
      movement_pattern: "俯卧对侧上下肢交替抬起",
      kinetic_chain: "俯卧固定→对侧手脚交替抬起→后链肌群交替收缩→模拟游泳划水",
    },
    // ---- [stability] 卧雪天使 (core_snow_angel) ----,
    {
      id: "core_snow_angel",
      name_zh: "卧雪天使",
      name_en: "Snow Angel (Prone)",
      category: "stability",
      target_muscles: [
          "斜方肌下束",
          "菱形肌",
          "竖脊肌"
        ],
      secondary_muscles: [
          "三角肌后束",
          "臀大肌",
          "多裂肌"
        ],
      tennis_skills: [
          "肩胛稳定性",
          "肩关节活动度",
          "后链协调"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "俯卧面朝下，手臂在体侧掌心朝下",
          "保持手臂离地，从体侧向头顶方向划弧",
          "全程肩胛骨保持后缩下沉",
          "到头顶后原路返回"
        ],
      common_mistakes: [
          "手臂落地休息",
          "肩部耸起代偿",
          "腰部过度后伸",
          "动作速度过快"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩关节活动严重受限",
          "急性肩痛"
        ],
      alternatives: [
          "Y-T-W训练",
          "俯身弹力带外展"
        ],
      movement_pattern: "俯卧肩胛活动",
      kinetic_chain: "俯卧稳定→手臂从体侧向头顶划弧→肩胛控制全程→回到体侧",
    },
    // ---- [stability] 俯卧两头起 (core_superman) ----,
    {
      id: "core_superman",
      name_zh: "俯卧两头起",
      name_en: "Superman",
      category: "stability",
      target_muscles: [
          "竖脊肌",
          "臀大肌",
          "多裂肌"
        ],
      secondary_muscles: [
          "三角肌后束",
          "腘绳肌",
          "斜方肌"
        ],
      tennis_skills: [
          "后链力量",
          "脊柱伸展稳定",
          "发球后仰控制"
        ],
      difficulty: "beginner",
      equipment: [
          "瑜伽垫"
        ],
      execution_tips: [
          "俯卧于垫上，双臂前伸双腿伸直",
          "同时抬起双手和双脚离地",
          "感受背部和臀部肌肉收缩",
          "顶端停留2-3秒后缓慢放下"
        ],
      common_mistakes: [
          "颈部过度后仰",
          "利用惯性弹起",
          "仅抬上半身不抬腿",
          "腰部过度后伸引起疼痛"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "腰椎滑脱",
          "急性腰椎间盘突出"
        ],
      alternatives: [
          "鸟狗式",
          "反向飞鸟"
        ],
      movement_pattern: "脊柱伸展",
      kinetic_chain: "俯卧→同时抬起双臂双腿→后链肌群整体收缩→顶端停留",
    },
    // ---- [strength] 深蹲 (leg_squat) ----,
    {
      id: "leg_squat",
      name_zh: "深蹲",
      name_en: "Squat",
      category: "strength",
      target_muscles: [
          "股四头肌",
          "臀大肌"
        ],
      secondary_muscles: [
          "腘绳肌",
          "竖脊肌",
          "核心肌群"
        ],
      tennis_skills: [
          "下肢驱动力量",
          "分腿步启动",
          "蹬地发力"
        ],
      difficulty: "intermediate",
      equipment: [
          "杠铃（可选）",
          "深蹲架（可选）"
        ],
      execution_tips: [
          "双脚与肩同宽或略宽，脚尖微外旋",
          "挺胸收腹，目视前方",
          "屈髋屈膝同时下蹲至大腿至少与地面平行",
          "膝盖方向与脚尖一致",
          "蹬地站起，臀部夹紧"
        ],
      common_mistakes: [
          "膝盖内扣",
          "重心前移脚跟抬起",
          "弓背圆肩",
          "深度不足（未到平行）",
          "起身时膝盖先于髋部伸展"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 90
        },
        "advanced": {
          "sets": 4,
          "reps": 8,
          "rest_sec": 75
        }
      },
      contraindications: [
          "膝关节严重损伤",
          "急性腰痛"
        ],
      alternatives: [
          "高脚杯深蹲",
          "腿举",
          "箱式深蹲"
        ],
      movement_pattern: "下蹲",
      kinetic_chain: "核心绷紧→髋膝踝同步屈曲→下蹲至平行→髋膝伸展→站起",
    },
    // ---- [strength] 罗马尼亚硬拉 (leg_romanian_deadlift) ----,
    {
      id: "leg_romanian_deadlift",
      name_zh: "罗马尼亚硬拉",
      name_en: "Romanian Deadlift",
      category: "strength",
      target_muscles: [
          "腘绳肌",
          "臀大肌"
        ],
      secondary_muscles: [
          "竖脊肌",
          "核心肌群",
          "前臂握力"
        ],
      tennis_skills: [
          "后链力量",
          "髋铰链发力模式",
          "减速制动能力"
        ],
      difficulty: "intermediate",
      equipment: [
          "杠铃或哑铃"
        ],
      execution_tips: [
          "站姿持杠于体前，膝盖微屈固定",
          "髋部向后推，躯干前倾",
          "杠铃贴大腿前侧下滑",
          "感受腘绳肌明显拉伸后髋部前推回到站姿"
        ],
      common_mistakes: [
          "膝盖弯曲过多变成传统硬拉",
          "弓背圆肩",
          "杠铃远离身体",
          "下放幅度不足或过度"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 60
        }
      },
      contraindications: [
          "腰椎间盘突出",
          "急性腘绳肌拉伤"
        ],
      alternatives: [
          "单腿罗马尼亚硬拉",
          "壶铃摆荡"
        ],
      movement_pattern: "髋铰链",
      kinetic_chain: "站姿握杠→髋铰链后推臀→腘绳肌拉伸→髋伸展→站起",
    },
    // ---- [strength] 腿筋拉伸 (leg_hamstring_curl) ----,
    {
      id: "leg_hamstring_curl",
      name_zh: "腿筋拉伸",
      name_en: "Hamstring Curl",
      category: "strength",
      target_muscles: [
          "腘绳肌"
        ],
      secondary_muscles: [
          "腓肠肌"
        ],
      tennis_skills: [
          "减速制动",
          "冲刺启动",
          "膝关节保护"
        ],
      difficulty: "beginner",
      equipment: [
          "腿弯举器械或弹力带"
        ],
      execution_tips: [
          "俯卧于器械上，滚轴垫位于脚踝上方",
          "保持髋部紧贴垫面",
          "弯曲膝盖将脚跟拉向臀部",
          "顶端挤压后缓慢回放"
        ],
      common_mistakes: [
          "髋部抬离垫面借力",
          "动作回放时速度过快",
          "膝盖弯曲角度不足",
          "用腰部力量代偿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        }
      },
      contraindications: [
          "急性腘绳肌拉伤",
          "膝关节后侧不稳"
        ],
      alternatives: [
          "瑞士球腿弯举",
          "北欧腿弯举"
        ],
      movement_pattern: "膝屈曲",
      kinetic_chain: "俯卧/坐姿固定→膝关节屈曲→腘绳肌收缩→脚跟向臀部靠近",
    },
    // ---- [strength] 弓步下蹲 (leg_lunge) ----,
    {
      id: "leg_lunge",
      name_zh: "弓步下蹲",
      name_en: "Forward Lunge",
      category: "strength",
      target_muscles: [
          "股四头肌",
          "臀大肌"
        ],
      secondary_muscles: [
          "腘绳肌",
          "核心稳定肌",
          "小腿肌群"
        ],
      tennis_skills: [
          "跨步击球",
          "前后移动",
          "单腿稳定性"
        ],
      difficulty: "beginner",
      equipment: [
          "无器材（可加哑铃增加负重）"
        ],
      execution_tips: [
          "向前跨出一大步",
          "前膝弯曲至约90度，不超过脚尖",
          "后膝接近地面但不触地",
          "挺胸收腹保持躯干直立",
          "前脚蹬地回到起始位置"
        ],
      common_mistakes: [
          "前膝内扣",
          "躯干过度前倾",
          "步幅过小导致膝盖超过脚尖过多",
          "重心不稳身体摇晃"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "膝关节严重损伤",
          "踝关节不稳"
        ],
      alternatives: [
          "后撤弓步",
          "保加利亚分腿蹲"
        ],
      movement_pattern: "单腿弓步",
      kinetic_chain: "向前跨步→前腿屈膝下蹲→后腿膝盖接近地面→前腿蹬地返回",
    },
    // ---- [strength] 侧弓步 (leg_lateral_lunge) ----,
    {
      id: "leg_lateral_lunge",
      name_zh: "侧弓步",
      name_en: "Lateral Lunge",
      category: "strength",
      target_muscles: [
          "内收肌群",
          "臀中肌",
          "股四头肌"
        ],
      secondary_muscles: [
          "腘绳肌",
          "核心稳定肌"
        ],
      tennis_skills: [
          "侧向移动力量",
          "开放步击球",
          "方向变换"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材（可持哑铃增加难度）"
        ],
      execution_tips: [
          "向一侧跨出大步",
          "重心转移至跨步腿，屈膝下蹲",
          "另一腿保持伸直",
          "臀部向后坐，保持背部挺直",
          "蹬地回到中间起始位"
        ],
      common_mistakes: [
          "膝盖内扣",
          "重心前倾脚跟抬起",
          "步幅不足限制活动范围",
          "伸直腿的脚尖外翻"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "内收肌拉伤",
          "膝内侧韧带损伤"
        ],
      alternatives: [
          "哥萨克深蹲",
          "侧向滑步蹲"
        ],
      movement_pattern: "侧向弓步",
      kinetic_chain: "侧向跨步→外侧腿屈膝下蹲→内侧腿伸直→蹬地返回",
    },
    // ---- [strength] 45度弓步 (leg_45_degree_lunge) ----,
    {
      id: "leg_45_degree_lunge",
      name_zh: "45度弓步",
      name_en: "45-Degree Lunge",
      category: "strength",
      target_muscles: [
          "臀大肌",
          "股四头肌",
          "臀中肌"
        ],
      secondary_muscles: [
          "内收肌",
          "核心稳定肌",
          "腘绳肌"
        ],
      tennis_skills: [
          "斜向移动力量",
          "开放步正手",
          "多方向步法"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材（可持哑铃增加负重）"
        ],
      execution_tips: [
          "向前方45度角方向跨出一步",
          "前膝弯曲至约90度",
          "保持躯干直立，核心收紧",
          "前脚蹬地回到起始位置",
          "两侧交替进行"
        ],
      common_mistakes: [
          "跨步角度不正确（过于正前或过于侧向）",
          "膝盖方向与脚尖不一致",
          "躯干旋转或侧倾",
          "步幅过小"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "膝关节不稳",
          "髋关节活动受限"
        ],
      alternatives: [
          "多方向弓步",
          "钟面弓步"
        ],
      movement_pattern: "斜向弓步",
      kinetic_chain: "向前外45度跨步→屈膝下蹲→多方向肌群协同→蹬地返回",
    },
    // ---- [strength] 交叉弓步 (leg_crossover_lunge) ----,
    {
      id: "leg_crossover_lunge",
      name_zh: "交叉弓步",
      name_en: "Crossover Lunge",
      category: "strength",
      target_muscles: [
          "臀大肌",
          "臀中肌",
          "内收肌群"
        ],
      secondary_muscles: [
          "股四头肌",
          "核心旋转稳定肌"
        ],
      tennis_skills: [
          "交叉步回位",
          "旋转中的下肢稳定",
          "髋部灵活性"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材（可持哑铃增加负重）"
        ],
      execution_tips: [
          "一脚向对侧后方交叉跨步",
          "双膝弯曲下蹲",
          "感受前腿臀部外侧拉伸",
          "保持躯干尽量正对前方",
          "前脚蹬地回到起始位"
        ],
      common_mistakes: [
          "交叉幅度不够",
          "膝盖内扣",
          "上半身过度旋转",
          "平衡不稳摇晃"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "膝关节不稳定",
          "踝关节扭伤恢复期"
        ],
      alternatives: [
          "幕式深蹲",
          "后交叉弓步"
        ],
      movement_pattern: "交叉弓步",
      kinetic_chain: "一腿向后交叉跨步→屈膝下蹲→臀部拉伸+收缩→蹬地返回",
    },
    // ---- [power] 跳箱 (leg_box_jump) ----,
    {
      id: "leg_box_jump",
      name_zh: "跳箱",
      name_en: "Box Jump",
      category: "power",
      target_muscles: [
          "股四头肌",
          "臀大肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "腘绳肌",
          "核心稳定肌"
        ],
      tennis_skills: [
          "爆发力",
          "蹬地起跳能力",
          "快速启动"
        ],
      difficulty: "intermediate",
      equipment: [
          "跳箱(30-60cm)"
        ],
      execution_tips: [
          "面对跳箱站立，双脚与肩同宽",
          "预蹲摆臂蓄力",
          "爆发性跳起，双脚同时落在箱上",
          "落地时膝盖微屈缓冲",
          "站起后步行下箱（不跳下）"
        ],
      common_mistakes: [
          "落地时膝盖锁死不缓冲",
          "跳箱高度过高超出能力",
          "落地时重心不稳",
          "从箱上跳下增加关节冲击"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 6,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "膝关节损伤",
          "跟腱问题",
          "踝关节不稳"
        ],
      alternatives: [
          "深蹲跳",
          "台阶上步"
        ],
      movement_pattern: "双脚跳跃",
      kinetic_chain: "预蹲蓄力→髋膝踝三关节同步伸展→爆发跳起→安全落地",
    },
    // ---- [power] 深蹲跳 (leg_squat_jump) ----,
    {
      id: "leg_squat_jump",
      name_zh: "深蹲跳",
      name_en: "Squat Jump",
      category: "power",
      target_muscles: [
          "股四头肌",
          "臀大肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "核心肌群",
          "腘绳肌"
        ],
      tennis_skills: [
          "垂直爆发力",
          "发球蹬地",
          "快速启动"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材"
        ],
      execution_tips: [
          "站姿双脚与肩同宽",
          "下蹲至大腿接近平行地面",
          "爆发性蹬地跳起，尽可能跳高",
          "落地时屈膝缓冲，直接进入下一次下蹲"
        ],
      common_mistakes: [
          "落地时膝盖锁死",
          "膝盖内扣",
          "下蹲深度不够",
          "落地过重对关节冲击大"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "膝关节损伤",
          "跟腱炎",
          "急性腰痛"
        ],
      alternatives: [
          "半蹲跳",
          "跳箱"
        ],
      movement_pattern: "蹲跳",
      kinetic_chain: "下蹲蓄力→三关节爆发伸展→起跳→空中伸展→落地缓冲",
    },
    // ---- [strength] 提踵 (leg_calf_raise) ----,
    {
      id: "leg_calf_raise",
      name_zh: "提踵",
      name_en: "Calf Raise",
      category: "strength",
      target_muscles: [
          "腓肠肌",
          "比目鱼肌"
        ],
      secondary_muscles: [
          "胫骨前肌（离心控制）"
        ],
      tennis_skills: [
          "蹬地推进",
          "快速启动",
          "减震缓冲"
        ],
      difficulty: "beginner",
      equipment: [
          "台阶或提踵板（可选）",
          "哑铃（可选增加负重）"
        ],
      execution_tips: [
          "双脚前掌站于台阶边缘，脚跟悬空",
          "缓慢下降脚跟至最低点拉伸",
          "用力踮起至最高点挤压小腿",
          "顶端停留1-2秒后缓慢下降"
        ],
      common_mistakes: [
          "动作幅度不完整",
          "速度过快弹跳式完成",
          "膝盖弯曲过多",
          "身体摇晃不稳"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 15,
          "rest_sec": 45
        },
        "intermediate": {
          "sets": 3,
          "reps": 15,
          "rest_sec": 30
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "跟腱炎急性期",
          "踝关节不稳"
        ],
      alternatives: [
          "坐姿提踵",
          "单腿提踵"
        ],
      movement_pattern: "踝跖屈",
      kinetic_chain: "站立稳定→踝关节跖屈→小腿肌群收缩→踮起脚尖",
    },
    // ---- [power] 吊绳旋转削球 (rotation_cable_chop) ----,
    {
      id: "rotation_cable_chop",
      name_zh: "吊绳旋转削球",
      name_en: "Cable Rotation Chop",
      category: "power",
      target_muscles: [
          "腹斜肌",
          "前锯肌",
          "臀部"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "三角肌",
          "背阔肌"
        ],
      tennis_skills: [
          "正手击球旋转",
          "切削球力量",
          "对角发力模式"
        ],
      difficulty: "intermediate",
      equipment: [
          "拉力器（高位）",
          "绳索或把手"
        ],
      execution_tips: [
          "侧对高位滑轮，双手握把手",
          "从高位向对侧髋部方向旋转下拉",
          "旋转力量从髋部启动",
          "手臂保持伸直引导方向",
          "控制回到起始位置"
        ],
      common_mistakes: [
          "仅用手臂拉动无躯干旋转",
          "下肢不稳身体摇晃",
          "弓背或过度侧弯",
          "速度过快无法控制回程"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "腰椎间盘问题",
          "急性腰痛"
        ],
      alternatives: [
          "药球斜砍",
          "弹力带砍伐"
        ],
      movement_pattern: "高位向低位旋转砍伐",
      kinetic_chain: "下肢稳定→髋旋转→躯干旋转→手臂引导缆绳对角下砍",
    },
    // ---- [power] 吊绳旋转上推 (rotation_cable_lift) ----,
    {
      id: "rotation_cable_lift",
      name_zh: "吊绳旋转上推",
      name_en: "Cable Rotation Lift",
      category: "power",
      target_muscles: [
          "腹斜肌",
          "三角肌",
          "臀部"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "斜方肌",
          "股四头肌"
        ],
      tennis_skills: [
          "发球向上旋转力量",
          "高压球发力",
          "上行动力链"
        ],
      difficulty: "intermediate",
      equipment: [
          "拉力器（低位）",
          "绳索或把手"
        ],
      execution_tips: [
          "侧对低位滑轮，双手握把手",
          "从低位向对侧肩上方旋转上推",
          "力量启动自下肢蹬地和髋旋转",
          "眼睛跟随双手方向",
          "控制回到起始位"
        ],
      common_mistakes: [
          "仅抬手臂不旋转躯干",
          "下肢无蹬地配合",
          "过度后仰",
          "核心不紧身体摇摆"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 10,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 30
        }
      },
      contraindications: [
          "肩关节不稳",
          "腰椎间盘问题"
        ],
      alternatives: [
          "药球上掷",
          "弹力带旋转上推"
        ],
      movement_pattern: "低位向高位旋转上推",
      kinetic_chain: "下肢蹬地→髋旋转→躯干旋转→手臂向对侧上方推送",
    },
    // ---- [power] 单臂旋转哑铃抓举 (rotation_single_arm_dumbbell_snatch) ----,
    {
      id: "rotation_single_arm_dumbbell_snatch",
      name_zh: "单臂旋转哑铃抓举",
      name_en: "Single-Arm Rotational Dumbbell Snatch",
      category: "power",
      target_muscles: [
          "臀大肌",
          "三角肌",
          "斜方肌"
        ],
      secondary_muscles: [
          "腹斜肌",
          "竖脊肌",
          "核心旋转肌群"
        ],
      tennis_skills: [
          "全身旋转爆发力",
          "发球动力链",
          "单侧力量"
        ],
      difficulty: "advanced",
      equipment: [
          "哑铃(8-15kg)"
        ],
      execution_tips: [
          "单手持哑铃，站姿略宽于肩",
          "下蹲蓄力，哑铃在双腿之间",
          "爆发蹬地同时髋旋转，将哑铃上拉过头",
          "配合躯干旋转完成过顶锁定",
          "控制下放回到起始位"
        ],
      common_mistakes: [
          "缺乏旋转只做直上抓举",
          "用手臂硬拉而非全身协调",
          "落地时重心不稳",
          "腰部过度后仰"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 6,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "肩关节不稳",
          "腰椎问题",
          "膝关节损伤"
        ],
      alternatives: [
          "壶铃单臂抓举",
          "哑铃高拉"
        ],
      movement_pattern: "旋转抓举",
      kinetic_chain: "蹬地→髋伸展+旋转→肩上拉→手臂上举→旋转锁定",
    },
    // ---- [power] 哑铃跳跃耸肩 (rotation_dumbbell_jump_shrug) ----,
    {
      id: "rotation_dumbbell_jump_shrug",
      name_zh: "哑铃跳跃耸肩",
      name_en: "Dumbbell Jump Shrug",
      category: "power",
      target_muscles: [
          "斜方肌",
          "小腿肌群",
          "臀大肌"
        ],
      secondary_muscles: [
          "股四头肌",
          "前臂",
          "三角肌"
        ],
      tennis_skills: [
          "爆发性蹬地",
          "发球起跳",
          "全身协调爆发"
        ],
      difficulty: "intermediate",
      equipment: [
          "哑铃(5-15kg)"
        ],
      execution_tips: [
          "双手持哑铃于体侧",
          "预蹲后爆发跳起",
          "跳起时肩部快速耸起",
          "落地时膝盖微屈缓冲",
          "哑铃全程握紧"
        ],
      common_mistakes: [
          "跳跃高度不足",
          "耸肩时机不对（过早或过晚）",
          "落地膝盖锁死",
          "握力不足哑铃晃动"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "膝关节损伤",
          "跟腱问题",
          "肩部急性痛"
        ],
      alternatives: [
          "杠铃高拉",
          "壶铃摆荡"
        ],
      movement_pattern: "蹲跳+耸肩",
      kinetic_chain: "预蹲→三关节爆发伸展→跳起→斜方肌耸肩→落地缓冲",
    },
    // ---- [stability] 过头深蹲 (rotation_overhead_squat) ----,
    {
      id: "rotation_overhead_squat",
      name_zh: "过头深蹲",
      name_en: "Overhead Squat",
      category: "stability",
      target_muscles: [
          "股四头肌",
          "臀大肌",
          "肩稳定肌群"
        ],
      secondary_muscles: [
          "核心肌群",
          "斜方肌",
          "竖脊肌",
          "上背部"
        ],
      tennis_skills: [
          "全身稳定性",
          "肩关节活动度",
          "发球姿势控制"
        ],
      difficulty: "advanced",
      equipment: [
          "杠铃或木棍",
          "可选：杠铃片"
        ],
      execution_tips: [
          "双手宽握将杠铃/木棍举过头顶",
          "手臂伸直锁定在耳后方",
          "保持躯干直立下蹲",
          "全程杠铃在脚中心正上方",
          "蹲到最深处后站起"
        ],
      common_mistakes: [
          "杠铃前移手臂弯曲",
          "躯干过度前倾",
          "脚跟抬起",
          "深蹲深度不足",
          "肩部灵活性不足导致代偿"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "肩关节活动严重受限",
          "腰椎不稳",
          "膝关节问题"
        ],
      alternatives: [
          "杯式深蹲配合暂停",
          "前蹲"
        ],
      movement_pattern: "过头负重下蹲",
      kinetic_chain: "手臂举过头稳定→核心绷紧→髋膝同步屈曲→深蹲→保持杠铃稳定→站起",
    },
    // ---- [power] 正手健身实心球投掷 (rotation_forehand_med_ball_throw) ----,
    {
      id: "rotation_forehand_med_ball_throw",
      name_zh: "正手健身实心球投掷",
      name_en: "Forehand Medicine Ball Throw",
      category: "power",
      target_muscles: [
          "腹斜肌",
          "臀部",
          "肩旋转肌群"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "前臂",
          "胸大肌"
        ],
      tennis_skills: [
          "正手击球力量",
          "旋转爆发力",
          "动力链传递"
        ],
      difficulty: "intermediate",
      equipment: [
          "药球/健身实心球(2-4kg)",
          "墙壁"
        ],
      execution_tips: [
          "侧对墙壁，模拟正手击球站位",
          "将球持于正手侧髋部",
          "从下肢蹬地启动，髋→躯干→肩顺序旋转",
          "模拟正手挥拍动作将球掷向墙壁",
          "后脚跟转动完成完整转体"
        ],
      common_mistakes: [
          "仅用手臂投掷无躯干旋转",
          "未从地面蓄力",
          "转体不充分",
          "释放时机不当"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "急性腰痛",
          "肩关节不稳"
        ],
      alternatives: [
          "弹力带正手旋转",
          "缆绳旋转推"
        ],
      movement_pattern: "正手旋转投掷",
      kinetic_chain: "侧向蹬地→髋旋转→躯干旋转→肩加速→正手方向释放",
    },
    // ---- [power] 反手健身实心球投掷 (rotation_backhand_med_ball_throw) ----,
    {
      id: "rotation_backhand_med_ball_throw",
      name_zh: "反手健身实心球投掷",
      name_en: "Backhand Medicine Ball Throw",
      category: "power",
      target_muscles: [
          "腹斜肌",
          "臀部",
          "背部肌群"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "肱三头肌",
          "前臂"
        ],
      tennis_skills: [
          "反手击球力量",
          "反向旋转爆发力",
          "反手动力链"
        ],
      difficulty: "intermediate",
      equipment: [
          "药球/健身实心球(2-4kg)",
          "墙壁"
        ],
      execution_tips: [
          "侧对墙壁，模拟反手击球站位",
          "将球持于反手侧（身体另一侧）",
          "蹬地旋转，模拟反手挥拍将球掷出",
          "双手配合（如双反）或单手（如单反）",
          "完成完整的转体和随挥"
        ],
      common_mistakes: [
          "旋转幅度不足",
          "未利用下肢和髋部力量",
          "释放方向不正确",
          "重心过高未充分下沉"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "急性腰痛",
          "肘关节问题"
        ],
      alternatives: [
          "弹力带反手旋转",
          "缆绳反手推"
        ],
      movement_pattern: "反手旋转投掷",
      kinetic_chain: "侧向蹬地→髋反向旋转→躯干旋转→肩→反手方向释放",
    },
    // ---- [power] 发球健身实心球投掷 (rotation_serve_med_ball_throw) ----,
    {
      id: "rotation_serve_med_ball_throw",
      name_zh: "发球健身实心球投掷",
      name_en: "Serve Medicine Ball Throw",
      category: "power",
      target_muscles: [
          "腹直肌",
          "腹斜肌",
          "三角肌",
          "背阔肌"
        ],
      secondary_muscles: [
          "肱三头肌",
          "臀大肌",
          "小腿肌群"
        ],
      tennis_skills: [
          "发球力量",
          "过顶爆发力",
          "完整发球动力链"
        ],
      difficulty: "intermediate",
      equipment: [
          "药球/健身实心球(2-3kg)",
          "墙壁或开阔场地"
        ],
      execution_tips: [
          "模拟发球站位，球举过头顶后方",
          "蹬地起跳同时将球向前上方掷出",
          "模拟完整发球动作的动力链",
          "注意肩部内旋鞭打动作",
          "跟随球的方向完成随挥"
        ],
      common_mistakes: [
          "未利用下肢蹬地力量",
          "仅用手臂掷球",
          "躯干屈曲时机不当",
          "肩部内旋不充分"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 6,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        }
      },
      contraindications: [
          "肩关节不稳",
          "急性腰痛",
          "肩袖损伤"
        ],
      alternatives: [
          "发球弹力带模拟",
          "缆绳过顶推"
        ],
      movement_pattern: "过顶旋转投掷",
      kinetic_chain: "蹬地→髋伸展→躯干伸展+旋转→肩内旋→手臂加速→过顶释放",
    },
    // ---- [agility] 侧滑步 (footwork_side_shuffle) ----,
    {
      id: "footwork_side_shuffle",
      name_zh: "侧滑步",
      name_en: "Side Shuffle",
      category: "agility",
      target_muscles: [
          "臀中肌",
          "股四头肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "内收肌",
          "核心稳定肌"
        ],
      tennis_skills: [
          "底线左右移动",
          "准备姿势维持",
          "快速侧向覆盖"
        ],
      difficulty: "beginner",
      equipment: [
          "无器材",
          "平整场地"
        ],
      execution_tips: [
          "保持低重心，膝盖微屈",
          "双脚不要交叉",
          "外侧脚用力蹬地推动身体",
          "保持身体面向网的方向",
          "步幅适中保持平衡"
        ],
      common_mistakes: [
          "重心过高影响移动速度",
          "双脚碰撞或交叉",
          "身体侧转而非面向前方",
          "步伐过大失去平衡"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 6,
          "rest_sec": 60,
          "distance_m": 5
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 45,
          "distance_m": 6
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 30,
          "distance_m": 8
        }
      },
      contraindications: [
          "踝关节急性扭伤",
          "膝关节不稳"
        ],
      alternatives: [
          "弹力带侧走",
          "防守滑步"
        ],
      movement_pattern: "侧向滑步",
      kinetic_chain: "低重心准备→外侧脚蹬地→身体侧向滑动→内侧脚着地→重复",
    },
    // ---- [agility] 交叉侧滑步 (footwork_crossover_shuffle) ----,
    {
      id: "footwork_crossover_shuffle",
      name_zh: "交叉侧滑步",
      name_en: "Crossover Side Shuffle",
      category: "agility",
      target_muscles: [
          "臀中肌",
          "内收肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "核心旋转肌",
          "股四头肌"
        ],
      tennis_skills: [
          "远距离覆盖",
          "交叉步回位",
          "快速方向变换"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材",
          "平整场地"
        ],
      execution_tips: [
          "起始为侧滑步，需更远距离时转换为交叉步",
          "交叉步时一脚从前方跨过另一脚",
          "到达击球位置后转为开放步或分步准备",
          "保持上半身稳定，目视来球方向",
          "练习左右两侧交替"
        ],
      common_mistakes: [
          "交叉时绊到自己的脚",
          "转换时机不当（过早或过晚）",
          "上半身过度旋转",
          "到达位置后未调整为击球姿势"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 6,
          "rest_sec": 75
        },
        "intermediate": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 45
        }
      },
      contraindications: [
          "踝关节不稳",
          "膝关节韧带损伤"
        ],
      alternatives: [
          "单纯侧滑步",
          "防御性交叉步"
        ],
      movement_pattern: "交叉步+侧滑步组合",
      kinetic_chain: "侧向启动→一脚交叉前迈→另一脚跟进→转为侧滑步→准备击球",
    },
    // ---- [agility] 击打落地球后回位 (footwork_groundstroke_recovery) ----,
    {
      id: "footwork_groundstroke_recovery",
      name_zh: "击打落地球后回位",
      name_en: "Groundstroke Recovery (with Diagonal Recovery)",
      category: "agility",
      target_muscles: [
          "股四头肌",
          "臀肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "腘绳肌"
        ],
      tennis_skills: [
          "击球后回位",
          "场地覆盖效率",
          "比赛节奏控制"
        ],
      difficulty: "intermediate",
      equipment: [
          "网球场",
          "标志物/锥桶"
        ],
      execution_tips: [
          "击球后立即蹬地向场地中心回位",
          "使用侧滑步或交叉步回位",
          "回到中心后立即恢复准备姿势",
          "斜向回位变体：击球后向对角线方向移动",
          "保持低重心，随时准备下一次移动"
        ],
      common_mistakes: [
          "击球后停顿观看球的去向",
          "回位路线过长不走直线",
          "回到中心后站直未保持准备姿势",
          "回位速度与击球质量不匹配"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 8,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 10,
          "rest_sec": 60
        },
        "advanced": {
          "sets": 3,
          "reps": 12,
          "rest_sec": 45
        }
      },
      contraindications: [
          "急性踝/膝关节损伤",
          "严重体能不足"
        ],
      alternatives: [
          "影子挥拍+回位",
          "标志桶移动训练"
        ],
      movement_pattern: "击球+回位组合",
      kinetic_chain: "移动至击球位→分步制动→击球→蹬地回位→回到准备位→含斜向回位变体",
    },
    // ---- [agility] 十字交叉步法训练 (footwork_cross_pattern) ----,
    {
      id: "footwork_cross_pattern",
      name_zh: "十字交叉步法训练",
      name_en: "Cross Pattern Footwork Drill",
      category: "agility",
      target_muscles: [
          "臀中肌",
          "股四头肌",
          "小腿肌群"
        ],
      secondary_muscles: [
          "内收肌",
          "核心稳定肌",
          "腘绳肌"
        ],
      tennis_skills: [
          "多方向移动能力",
          "快速变向",
          "全场覆盖"
        ],
      difficulty: "intermediate",
      equipment: [
          "标志物/锥桶(4个)",
          "平整场地"
        ],
      execution_tips: [
          "在地面摆出十字形标志物",
          "从中心向前冲→回中→向后退→回中→向左滑→回中→向右滑→回中",
          "每次到达标志物时急停并触地",
          "保持低重心和准备姿势",
          "力求快速且动作质量高"
        ],
      common_mistakes: [
          "变向时重心过高",
          "急停时制动不足滑过目标",
          "后退时看不到方向",
          "回中后未恢复准备姿势"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 4,
          "rest_sec": 90
        },
        "intermediate": {
          "sets": 3,
          "reps": 6,
          "rest_sec": 75
        },
        "advanced": {
          "sets": 3,
          "reps": 8,
          "rest_sec": 60
        }
      },
      contraindications: [
          "踝关节不稳",
          "膝关节急性损伤"
        ],
      alternatives: [
          "T形跑",
          "星形移动训练"
        ],
      movement_pattern: "十字方向移动",
      kinetic_chain: "中心出发→前后左右四方向移动→急停变向→回到中心→循环",
    },
    // ---- [agility] 小碎步 (footwork_split_step) ----,
    {
      id: "footwork_split_step",
      name_zh: "小碎步",
      name_en: "Split Step (Quick Feet)",
      category: "agility",
      target_muscles: [
          "小腿肌群",
          "足底肌群"
        ],
      secondary_muscles: [
          "股四头肌",
          "臀肌",
          "核心稳定肌"
        ],
      tennis_skills: [
          "分步准备",
          "反应速度",
          "启动效率"
        ],
      difficulty: "beginner",
      equipment: [
          "无器材"
        ],
      execution_tips: [
          "保持前脚掌着地，快速小幅度弹跳",
          "在对手击球瞬间做分步着地",
          "着地时双脚略宽于肩",
          "膝盖微屈，重心低且前倾",
          "着地后立即向来球方向启动"
        ],
      common_mistakes: [
          "跳得过高浪费时间",
          "落地后停顿太久",
          "全脚掌着地无法快速启动",
          "身体过于僵硬不放松"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 1,
          "rest_sec": 45,
          "duration_sec": 15
        },
        "intermediate": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 30,
          "duration_sec": 20
        },
        "advanced": {
          "sets": 3,
          "reps": 1,
          "rest_sec": 30,
          "duration_sec": 30
        }
      },
      contraindications: [
          "跟腱炎",
          "足底筋膜炎",
          "踝关节急性扭伤"
        ],
      alternatives: [
          "跳绳",
          "踏步训练"
        ],
      movement_pattern: "快速小幅弹跳",
      kinetic_chain: "轻跳→双脚同时轻落地→准备蹬地→向任意方向启动",
    },
    // ---- [strength] 跨步行走 (footwork_lunge_walk) ----,
    {
      id: "footwork_lunge_walk",
      name_zh: "跨步行走",
      name_en: "Lunge Walk",
      category: "strength",
      target_muscles: [
          "股四头肌",
          "臀大肌",
          "腘绳肌"
        ],
      secondary_muscles: [
          "核心稳定肌",
          "小腿肌群",
          "内收肌"
        ],
      tennis_skills: [
          "大步跨步击球",
          "前后移动力量",
          "单腿稳定性"
        ],
      difficulty: "intermediate",
      equipment: [
          "无器材（可持哑铃增加负重）",
          "足够长的空间"
        ],
      execution_tips: [
          "向前跨出一大步，前膝弯曲至90度",
          "后膝接近但不触地",
          "躯干保持直立不前倾",
          "后腿蹬地向前迈出下一步",
          "保持稳定节奏连续行走"
        ],
      common_mistakes: [
          "步幅过小或过大",
          "膝盖内扣",
          "躯干前倾或左右摇摆",
          "速度过快失去平衡"
        ],
      sets_reps: {
        "beginner": {
          "sets": 2,
          "reps": 12,
          "rest_sec": 60
        },
        "intermediate": {
          "sets": 3,
          "reps": 16,
          "rest_sec": 45
        },
        "advanced": {
          "sets": 3,
          "reps": 20,
          "rest_sec": 30
        }
      },
      contraindications: [
          "膝关节严重损伤",
          "踝关节不稳"
        ],
      alternatives: [
          "静态弓步",
          "后退弓步行走"
        ],
      movement_pattern: "行走弓步",
      kinetic_chain: "向前跨步→前腿屈膝下蹲→后腿蹬地→重心前移→后腿跨出下一步",
    }
  ],

  /**
   * 根据目标技能匹配推荐动作
   * @param {string[]} targetSkills - 用户选择的目标技能
   * @param {string} level - beginner/intermediate/advanced
   * @returns {Object[]} 推荐动作列表
   */
  getRecommendedExercises(targetSkills, level) {
    const skillMap = {
      "正手": [
        "shoulder_dumbbell_lateral_raise","shoulder_low_pull","arm_triceps_cable_pushdown",
        "chest_push_up","back_lat_pulldown","core_russian_twist",
        "legs_squat","legs_goblet_squat","arm_bicep_curl","shoulder_overhead_press"
      ],
      "反手": [
        "shoulder_external_rotation","shoulder_90_90_abduction_external_rotation",
        "shoulder_90_90_abduction_internal_rotation","shoulder_elbow_to_hip_scapular_retraction",
        "back_seated_row","wrist_pronated_curl","wrist_supinated_curl",
        "arm_triceps_cable_pushdown","shoulder_face_pull"
      ],
      "发球/高压": [
        "shoulder_bent_over_dumbbell_snatch","shoulder_overhead_press",
        "arm_triceps_cable_pushdown","core_plank","legs_squat",
        "legs_calf_raise","plyo_box_jump","core_deadbug"
      ],
      "截击": [
        "chest_push_up","arm_triceps_cable_pushdown","legs_lunges",
        "shoulder_dumbbell_lateral_raise","legs_step_up","plyo_lateral_lunge"
      ],
      "步伐": [
        "footwork_side_shuffle","footwork_split_step",
        "footwork_crossover_shuffle","footwork_cross_pattern",
        "footwork_groundstroke_recovery",
        "legs_squat","legs_lunges","legs_calf_raise",
        "cardio_jumping_rope","plyo_lateral_lunge","core_mountain_climber"
      ]
    };

    const priorityIds = new Set();
    (targetSkills || []).forEach(skill => {
      (skillMap[skill] || []).forEach(id => priorityIds.add(id));
    });
    priorityIds.add("core_plank");
    priorityIds.add("legs_squat");
    priorityIds.add("shoulder_external_rotation");

    return this.exercises.map(ex => ({
      ...ex,
      _priority: priorityIds.has(ex.id) ? 2 : 1
    }));
  },

  /**
   * 根据训练水平筛选动作
   */
  getExercisesByLevel(level) {
    if (level === "beginner") {
      return this.exercises.filter(ex => ex.difficulty === "beginner");
    } else if (level === "advanced") {
      return this.exercises;
    }
    return this.exercises;
  }
};

// 导出（兼容浏览器和 Node.js）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TennisCoachKB;
}
