/**
 * TennisCoach AI - 知识库数据文件
 * 包含：训练动作库、网球动作-肌肉群映射、ACSM标准
 * 由 MD 文件知识固化而来，供模型直接调用
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
      // 同发球肌肉群
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
      beginner: [3, 4],      // 每周训练次数
      intermediate: [4, 5],
      advanced: [5, 6]
    }
  },

  // ========== 训练动作库（精简版，可直接扩展）==========
  exercises: [
    // ---- 肩部 ----
    {
      id: "shoulder_dumbbell_lateral_raise",
      name_zh: "哑铃侧平举",
      name_en: "Dumbbell Lateral Raise",
      category: "strength",
      target_muscles: ["三角肌中束"],
      secondary_muscles: ["斜方肌上部", "前锯肌"],
      tennis_skills: ["击球稳定性", "肩部耐力", "网前截击"],
      difficulty: "beginner",
      equipment: ["哑铃(2-5kg)"],
      execution_tips: ["站姿挺胸核心收紧", "手臂微屈缓慢向两侧抬起至与肩平齐", "小指略高于拇指", "下放时控制速度不借力"],
      common_mistakes: ["耸肩导致斜方肌代偿", "利用身体晃动借力", "抬臂过高超过肩平面", "速度过快失去肌肉控制"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["弹力带侧平举", "缆绳侧平举"],
      contraindications: ["肩峰撞击综合征", "肩袖损伤急性期"]
    },
    {
      id: "shoulder_bent_over_dumbbell_scatch",
      name_zh: "俯身哑铃抓举",
      name_en: "Bent-Over Dumbbell Snatch",
      category: "power",
      target_muscles: ["三角肌后束", "斜方肌", "菱形肌"],
      secondary_muscles: ["竖脊肌", "臀大肌", "腘绳肌"],
      tennis_skills: ["发球加速", "高压球力量", "肩部爆发力"],
      difficulty: "intermediate",
      equipment: ["哑铃(5-15kg)"],
      execution_tips: ["俯身约45度背部平直", "单臂爆发性上拉哑铃至头顶", "利用髋部伸展产生力量", "顶部短暂停留后控制下放"],
      common_mistakes: ["弓背导致腰椎压力过大", "仅用手臂力量而非全身协调", "上拉轨迹偏离身体", "未充分利用髋部伸展力量"],
      sets_reps: { beginner: { sets: 2, reps: 8, rest_sec: 90 }, intermediate: { sets: 3, reps: 8, rest_sec: 75 }, advanced: { sets: 3, reps: 10, rest_sec: 60 } },
      alternatives: ["壶铃抓举", "哑铃高拉"],
      contraindications: ["腰椎间盘突出", "肩关节不稳"]
    },
    {
      id: "shoulder_external_rotation",
      name_zh: "肩外旋",
      name_en: "Shoulder External Rotation",
      category: "stability",
      target_muscles: ["冈下肌", "小圆肌"],
      secondary_muscles: ["三角肌后束"],
      tennis_skills: ["肩袖稳定", "发球减速控制", "伤病预防"],
      difficulty: "beginner",
      equipment: ["弹力带或轻哑铃(1-3kg)"],
      execution_tips: ["上臂贴紧体侧肘关节屈曲90度", "缓慢将前臂向外旋转", "保持肘部贴紧身体不外移", "回程控制速度避免弹力带回弹"],
      common_mistakes: ["肘部离开身体侧面", "利用身体旋转代偿", "速度过快失去控制", "阻力过大导致其他肌群代偿"],
      sets_reps: { beginner: { sets: 2, reps: 15, rest_sec: 45 }, intermediate: { sets: 3, reps: 15, rest_sec: 30 }, advanced: { sets: 3, reps: 20, rest_sec: 30 } },
      alternatives: ["侧卧哑铃外旋", "缆绳外旋"],
      contraindications: ["肩袖撕裂急性期", "肩关节脱位未恢复"]
    },
    {
      id: "shoulder_90_90_er",
      name_zh: "90/90外展外旋",
      name_en: "90/90 Abduction External Rotation",
      category: "stability",
      target_muscles: ["冈下肌", "小圆肌", "三角肌后束"],
      secondary_muscles: ["肩胛稳定肌群", "斜方肌下束"],
      tennis_skills: ["发球肩部稳定", "高压球控制", "肩袖强化"],
      difficulty: "intermediate",
      equipment: ["弹力带或轻哑铃(1-2kg)"],
      execution_tips: ["上臂外展至90度肘屈90度呈投降姿势", "保持上臂位置不变前臂向上旋转", "肩胛骨保持后缩下沉", "动作缓慢可控顶端停留1秒"],
      common_mistakes: ["上臂位置不稳定发生偏移", "弓背或挺腰代偿", "阻力过大导致耸肩", "旋转幅度不足"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["侧卧90/90外旋", "缆绳90/90外旋"],
      contraindications: ["肩峰撞击综合征", "肩袖损伤急性期", "肩关节不稳"]
    },
    // ---- 上肢 ----
    {
      id: "arm_triceps_cable_pushdown",
      name_zh: "肱三头肌拉力器下压",
      name_en: "Triceps Cable Pushdown",
      category: "strength",
      target_muscles: ["肱三头肌"],
      secondary_muscles: ["前臂伸肌", "核心稳定肌"],
      tennis_skills: ["发球手臂伸展力量", "截击推挡力量", "反手切削"],
      difficulty: "beginner",
      equipment: ["拉力器", "直杆或绳索附件"],
      execution_tips: ["站姿面对高位滑轮上臂夹紧体侧", "肘关节为轴心向下伸展前臂", "完全伸直时挤压肱三头肌", "缓慢回到起始位置不超过90度"],
      common_mistakes: ["肘部前后移动偏离体侧", "身体前倾利用体重下压", "回程时阻力拉动身体上移", "锁肘过度造成关节压力"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["窄距俯卧撑", "仰卧臂屈伸"],
      contraindications: ["肘关节炎症", "肱三头肌腱炎"]
    },
    {
      id: "arm_hammer_dumbbell_curl",
      name_zh: "锤式哑铃屈臂",
      name_en: "Hammer Dumbbell Curl",
      category: "strength",
      target_muscles: ["肱肌", "肱桡肌"],
      secondary_muscles: ["肱二头肌", "前臂肌群"],
      tennis_skills: ["握拍稳定性", "前臂力量", "截击控制"],
      difficulty: "beginner",
      equipment: ["哑铃(3-10kg)"],
      execution_tips: ["站姿或坐姿掌心相对（中立握法）", "保持上臂贴紧体侧不动", "肘关节为轴心向上弯举", "顶端短暂停留后缓慢下放"],
      common_mistakes: ["身体摇摆借力", "肘部前移改变力臂", "下放速度过快", "手腕旋转偏离中立位"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["绳索锤式弯举", "交替哑铃弯举"],
      contraindications: ["肘关节炎症", "肱二头肌腱炎"]
    },
    // ---- 腕部 ----
    {
      id: "wrist_pronated_curl",
      name_zh: "正握腕弯举",
      name_en: "Pronated Wrist Curl",
      category: "strength",
      target_muscles: ["前臂伸肌群", "桡侧腕伸肌"],
      secondary_muscles: ["指伸肌"],
      tennis_skills: ["反手击球腕部稳定", "网球肘预防", "握拍力量"],
      difficulty: "beginner",
      equipment: ["哑铃(1-3kg)或杠铃"],
      execution_tips: ["前臂放于膝上或平面上掌心朝下", "手腕悬空于支撑面外", "缓慢将手腕向上翘起（背伸）", "顶端停留1秒后控制下放"],
      common_mistakes: ["前臂离开支撑面", "动作幅度过大造成关节不适", "重量过大无法控制", "速度过快"],
      sets_reps: { beginner: { sets: 2, reps: 15, rest_sec: 45 }, intermediate: { sets: 3, reps: 15, rest_sec: 30 }, advanced: { sets: 3, reps: 20, rest_sec: 30 } },
      alternatives: ["弹力带腕背伸", "握力器训练"],
      contraindications: ["网球肘急性期", "腕关节腱鞘炎"]
    },
    {
      id: "wrist_supinated_curl",
      name_zh: "反握腕弯举",
      name_en: "Supinated Wrist Curl",
      category: "strength",
      target_muscles: ["前臂屈肌群", "桡侧腕屈肌"],
      secondary_muscles: ["指屈肌"],
      tennis_skills: ["正手上旋发力", "发球屈腕加速", "握拍力量"],
      difficulty: "beginner",
      equipment: ["哑铃(2-5kg)或杠铃"],
      execution_tips: ["前臂放于膝上或平面上掌心朝上", "手腕悬空于支撑面外", "缓慢将手腕向上卷起（掌屈）", "顶端挤压后缓慢回放"],
      common_mistakes: ["前臂抬离支撑面", "仅用手指卷动而非腕部发力", "重量过大影响动作质量", "未充分利用全程动作范围"],
      sets_reps: { beginner: { sets: 2, reps: 15, rest_sec: 45 }, intermediate: { sets: 3, reps: 15, rest_sec: 30 }, advanced: { sets: 3, reps: 20, rest_sec: 30 } },
      alternatives: ["弹力带腕屈", "毛巾拧转训练"],
      contraindications: ["高尔夫球肘急性期", "腕管综合征"]
    },
    // ---- 胸部 ----
    {
      id: "chest_push_up",
      name_zh: "俯卧撑",
      name_en: "Push-Up",
      category: "strength",
      target_muscles: ["胸大肌", "肱三头肌", "三角肌前束"],
      secondary_muscles: ["核心稳定肌", "前锯肌"],
      tennis_skills: ["正手击球推送力量", "截击推挡", "上肢整体力量"],
      difficulty: "beginner",
      equipment: ["无器材"],
      execution_tips: ["双手略宽于肩，身体呈一条直线", "缓慢下放至胸部接近地面", "爆发力推起，保持核心收紧", "全程保持身体中立位"],
      common_mistakes: ["塌腰或撅臀", "下放幅度不足", "借助惯性快速完成", "肩胛骨未后缩"],
      sets_reps: { beginner: { sets: 2, reps: "极限次数x0.7", rest_sec: 60 }, intermediate: { sets: 3, reps: "极限次数x0.8", rest_sec: 45 }, advanced: { sets: 3, reps: "极限次数", rest_sec: 30 } },
      alternatives: ["跪姿俯卧撑", " incline俯卧撑", "哑铃卧推"],
      contraindications: ["腕关节炎症", "肩关节急性损伤"]
    },
    {
      id: "chest_dumbbell_fly",
      name_zh: "哑铃飞鸟",
      name_en: "Dumbbell Fly",
      category: "strength",
      target_muscles: ["胸大肌"],
      secondary_muscles: ["前三角肌", "肱二头肌"],
      tennis_skills: ["正手击球胸部发力", "击球范围扩大"],
      difficulty: "intermediate",
      equipment: ["哑铃(5-15kg)", "训练凳"],
      execution_tips: ["仰卧于训练凳，双臂伸直持哑铃", "微屈肘部，双臂向两侧张开下放", "感受胸肌拉伸，然后用胸肌力量合拢双臂", "动作顶点挤压胸肌"],
      common_mistakes: ["肘部过度屈曲变成推举", "下放幅度过大造成肩关节压力", "利用惯性摆动哑铃", "肩胛骨未稳定"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["缆绳飞鸟", "弹力带飞鸟"],
      contraindications: ["肩关节损伤", "胸肌拉伤"]
    },
    // ---- 背部 ----
    {
      id: "back_lat_pulldown",
      name_zh: "高位下拉",
      name_en: "Lat Pulldown",
      category: "strength",
      target_muscles: ["背阔肌", "大圆肌"],
      secondary_muscles: ["肱二头肌", "菱形肌", "斜方肌下束"],
      tennis_skills: ["正手击球背部发力", "发球起势力量", "击球范围"],
      difficulty: "beginner",
      equipment: ["高位下拉器"],
      execution_tips: ["坐姿，大腿固定，双手宽握横杆", "肩胛骨后缩下沉，拉动横杆至锁骨位置", "缓慢回放，感受背阔肌拉伸", "避免身体过度后仰"],
      common_mistakes: ["利用身体后仰借力", "仅用手臂力量拉动", "下拉幅度不足", "肩胛骨未主动后缩"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["引体向上", "弹力带高位下拉"],
      contraindications: ["肩关节损伤", "腰椎问题"]
    },
    {
      id: "back_seated_row",
      name_zh: "坐姿划船",
      name_en: "Seated Cable Row",
      category: "strength",
      target_muscles: ["背阔肌", "菱形肌", "斜方肌中束"],
      secondary_muscles: ["肱二头肌", "三角肌后束"],
      tennis_skills: ["反手击球背部力量", "击球后程加速", "肩胛骨稳定性"],
      difficulty: "beginner",
      equipment: ["划船器", "弹力带"],
      execution_tips: ["坐姿，双脚踩实，膝盖微屈", "双手握柄，肩胛后缩拉动", "肘部向后收至身体两侧", "缓慢回放，保持肌肉张力"],
      common_mistakes: ["身体前后摆动借力", "仅用手臂拉动未收缩肩胛", "回放速度过快失去张力", "圆肩姿势划船"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["哑铃划船", "弹力带划船"],
      contraindications: ["腰椎不适", "肩关节急性炎症"]
    },
    // ---- 核心 ----
    {
      id: "core_plank",
      name_zh: "平板支撑",
      name_en: "Plank",
      category: "stability",
      target_muscles: ["腹直肌", "腹横肌", "竖脊肌"],
      secondary_muscles: ["臀肌", "三角肌", "股四头肌"],
      tennis_skills: ["击球稳定性", "核心传导力量", "身体控制"],
      difficulty: "beginner",
      equipment: ["无器材"],
      execution_tips: ["前臂与脚尖支撑，身体呈一条直线", "腹部收紧，臀部不高抬不塌陷", "保持自然呼吸不憋气", "感受核心肌群持续收缩"],
      common_mistakes: ["塌腰导致腰椎受压", "撅臀降低训练效果", "头部过度抬起或下垂", "憋气导致血压升高"],
      sets_reps: { beginner: { sets: 2, reps: "30秒", rest_sec: 60 }, intermediate: { sets: 3, reps: "60秒", rest_sec: 45 }, advanced: { sets: 3, reps: "90秒", rest_sec: 30 } },
      alternatives: ["侧平板支撑", "动态平板支撑"],
      contraindications: ["腰椎病变", "腕关节炎症"]
    },
    {
      id: "core_russian_twist",
      name_zh: "俄罗斯转体",
      name_en: "Russian Twist",
      category: "stability",
      target_muscles: ["腹斜肌", "腹直肌"],
      secondary_muscles: ["竖脊肌", "臀肌"],
      tennis_skills: ["正手反手击球躯干旋转", "发球挥拍力量", "步伐变向"],
      difficulty: "intermediate",
      equipment: ["无器材或药球"],
      execution_tips: ["坐姿，膝盖弯曲脚后跟离地", "双手合十或持球，躯干后倾约45度", "用腹斜肌发力左右旋转触碰地面", "保持腿部稳定不随躯干摆动"],
      common_mistakes: ["利用惯性快速旋转", "脚部着地失去核心挑战", "旋转幅度不足", "下背部过度弯曲"],
      sets_reps: { beginner: { sets: 2, reps: "每侧10次", rest_sec: 60 }, intermediate: { sets: 3, reps: "每侧15次", rest_sec: 45 }, advanced: { sets: 3, reps: "每侧20次", rest_sec: 30 } },
      alternatives: ["仰卧交替触脚跟", "药球侧抛"],
      contraindications: ["腰椎间盘突出", "骶髂关节问题"]
    },
    // ---- 下肢 ----
    {
      id: "legs_squat",
      name_zh: "徒手深蹲",
      name_en: "Bodyweight Squat",
      category: "strength",
      target_muscles: ["股四头肌", "臀大肌", "腘绳肌"],
      secondary_muscles: ["竖脊肌", "腹肌", "小腿肌群"],
      tennis_skills: ["击球下肢稳定性", "发球起势力量", "步伐爆发力"],
      difficulty: "beginner",
      equipment: ["无器材"],
      execution_tips: ["双脚与肩同宽，脚尖略外展", "屈髋屈膝下蹲至大腿平行地面", "膝盖与脚尖方向一致不超过脚尖", "脚跟蹬地站起，臀部收紧"],
      common_mistakes: ["膝盖内扣", "重心偏前脚跟离地", "下蹲幅度不足", "弓背圆肩"],
      sets_reps: { beginner: { sets: 2, reps: 15, rest_sec: 60 }, intermediate: { sets: 3, reps: 20, rest_sec: 45 }, advanced: { sets: 3, reps: 25, rest_sec: 30 } },
      alternatives: ["高脚杯深蹲", "分腿蹲", "弹力带深蹲"],
      contraindications: ["膝关节急性炎症", "严重腰椎间盘突出"]
    },
    {
      id: "legs_lunges",
      name_zh: "弓步蹲",
      name_en: "Walking Lunges",
      category: "strength",
      target_muscles: ["股四头肌", "臀大肌", "腘绳肌"],
      secondary_muscles: ["臀中肌", "腓肠肌", "竖脊肌"],
      tennis_skills: ["截击弓步动作", "步伐稳定性", "单腿稳定性"],
      difficulty: "beginner",
      equipment: ["无器材或哑铃"],
      execution_tips: ["向前迈步，后膝接近地面但不触地", "前膝不超过脚尖，重心在两腿之间", "用力蹬地回到起始位置", "交替进行，保持躯干直立"],
      common_mistakes: ["前膝内扣", "步幅过小或过大", "躯干过度前倾", "后膝撞击地面"],
      sets_reps: { beginner: { sets: 2, reps: "每腿10次", rest_sec: 60 }, intermediate: { sets: 3, reps: "每腿12次", rest_sec: 45 }, advanced: { sets: 3, reps: "每腿15次", rest_sec: 30 } },
      alternatives: ["原地弓步", "反向弓步", "侧向弓步"],
      contraindications: ["膝关节韧带损伤", "髋关节置换术后"]
    },
    {
      id: "legs_calf_raise",
      name_zh: "提踵",
      name_en: "Calf Raise",
      category: "strength",
      target_muscles: ["腓肠肌", "比目鱼肌"],
      secondary_muscles: ["胫骨后肌"],
      tennis_skills: ["发球蹬地力量", "击球推进力", "步伐敏捷性"],
      difficulty: "beginner",
      equipment: ["无器材或哑铃"],
      execution_tips: ["站姿，双脚与肩同宽", "尽可能高地抬起脚跟", "顶端停留1秒挤压小腿肌肉", "缓慢下放至脚跟低于踏板平面"],
      common_mistakes: ["动作速度过快", "幅度不足", "膝盖过度伸直锁死", "重心偏移"],
      sets_reps: { beginner: { sets: 2, reps: 20, rest_sec: 45 }, intermediate: { sets: 3, reps: 25, rest_sec: 30 }, advanced: { sets: 3, reps: 30, rest_sec: 30 } },
      alternatives: ["单腿提踵", "坐姿提踵（针对比目鱼肌）"],
      contraindications: ["跟腱炎急性期", "足底筋膜炎"]
    },
    // ---- 有氧/敏捷 ----
    {
      id: "cardio_jumping_rope",
      name_zh: "跳绳",
      name_en: "Jump Rope",
      category: "cardio",
      target_muscles: ["腓肠肌", "比目鱼肌", "股四头肌"],
      secondary_muscles: ["臀肌", "核心稳定肌", "肩前臂肌群"],
      tennis_skills: ["步伐敏捷性", "心肺耐力", "手脚协调性"],
      difficulty: "beginner",
      equipment: ["跳绳"],
      execution_tips: ["双手持绳两端，大臂贴紧体侧", "用手腕旋转绳子而非整个手臂", "前脚掌着地，膝盖微屈缓冲", "保持节奏稳定，呼吸均匀"],
      common_mistakes: ["跳得过高浪费能量", "手腕外翻绳子打结", "脚跟着地增加关节冲击", "速度过快失去节奏"],
      sets_reps: { beginner: { sets: 2, reps: "1分钟", rest_sec: 60 }, intermediate: { sets: 3, reps: "2分钟", rest_sec: 45 }, advanced: { sets: 3, reps: "3分钟", rest_sec: 30 } },
      alternatives: ["高抬腿原地跑", "开合跳"],
      contraindications: ["严重膝关节骨关节炎", "足底筋膜炎急性期"]
    },
    {
      id: "plyo_lateral_lunge",
      name_zh: "侧向弓步",
      name_en: "Lateral Lunge",
      category: "plyometric",
      target_muscles: ["臀大肌", "臀中肌", "股四头肌", "内收肌"],
      secondary_muscles: ["竖脊肌", "腓肠肌"],
      tennis_skills: ["侧向移动能力", "截击步伐", "髋关节灵活性"],
      difficulty: "intermediate",
      equipment: ["无器材或哑铃"],
      execution_tips: ["向侧方迈步，重心移至迈出的腿", "屈膝使大腿平行地面，另一腿伸直", "用力蹬地回到起始位置", "交替进行左右侧"],
      common_mistakes: ["膝盖超过脚尖", "躯干前倾过度", "迈步幅度不足", "回程时借助惯性"],
      sets_reps: { beginner: { sets: 2, reps: "每侧10次", rest_sec: 60 }, intermediate: { sets: 3, reps: "每侧12次", rest_sec: 45 }, advanced: { sets: 3, reps: "每侧15次", rest_sec: 30 } },
      alternatives: ["侧滑步", "侧向下蹲"],
      contraindications: ["膝关节半月板损伤", "髋关节置换术后"]
    },
    // ---- 拉伸/放松 ----
    {
      id: "stretch_chest Doorway",
      name_zh: "门框胸部拉伸",
      name_en: "Doorway Chest Stretch",
      category: "flexibility",
      target_muscles: ["胸大肌", "胸小肌", "前三角肌"],
      tennis_skills: ["改善击球后肩部活动度", "预防圆肩"],
      difficulty: "beginner",
      equipment: ["门框或无器材"],
      execution_tips: ["站在门框旁，手臂屈90度撑在门框上", "身体缓慢前移感受胸部拉伸", "保持30秒，切勿用力过猛", "换另一侧重复"],
      common_mistakes: ["拉伸力度过大造成肌肉防御性收缩", "屏住呼吸", "身体过度前倾"],
      sets_reps: { beginner: { sets: 2, reps: "每侧30秒", rest_sec: 0 }, intermediate: { sets: 3, reps: "每侧30秒", rest_sec: 0 }, advanced: { sets: 3, reps: "每侧45秒", rest_sec: 0 } },
      alternatives: ["仰卧胸部拉伸", "泡沫轴胸椎放松"]
    },
    {
      id: "stretch_child_pose",
      name_zh: "婴儿式",
      name_en: "Child's Pose",
      category: "flexibility",
      target_muscles: ["背阔肌", "竖脊肌", "臀肌"],
      tennis_skills: ["运动后背部放松", "预防腰椎紧张"],
      difficulty: "beginner",
      equipment: ["瑜伽垫"],
      execution_tips: ["跪姿，臀部坐于脚跟", "上身前倾，双臂尽量前伸", "额头触地，全身放松", "保持深呼吸"],
      common_mistakes: ["膝盖不适时继续强迫进行", "头部抬起颈部紧张", "憋气"],
      sets_reps: { beginner: { sets: 1, reps: "60秒", rest_sec: 0 }, intermediate: { sets: 2, reps: "60秒", rest_sec: 0 }, advanced: { sets: 2, reps: "90秒", rest_sec: 0 } },
      alternatives: ["猫牛式", "仰卧脊柱扭转"]
    },
    // ---- 新增动作（补充多样性）----
    {
      id: "core_deadbug",
      name_zh: "死虫式",
      name_en: "Deadbug",
      category: "stability",
      target_muscles: ["腹直肌", "腹横肌", "髂腰肌"],
      secondary_muscles: ["臀大肌"],
      tennis_skills: ["核心稳定性", "击球平衡"],
      difficulty: "beginner",
      equipment: ["无器材"],
      execution_tips: ["仰卧，双臂垂直指向天花板", "双腿抬起呈90度", "对侧手脚缓慢延伸后收回", "全程腰部贴地"],
      common_mistakes: ["腰部拱起离地", "动作过快靠惯性", "手脚幅度过大失去稳定"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["平板支撑", "鸟狗式"]
    },
    {
      id: "legs_goblet_squat",
      name_zh: "高脚杯深蹲",
      name_en: "Goblet Squat",
      category: "strength",
      target_muscles: ["股四头肌", "臀大肌", "核心肌群"],
      secondary_muscles: ["竖脊肌", "前臂握力"],
      tennis_skills: ["下肢爆发力", "正手击球下肢发力"],
      difficulty: "intermediate",
      equipment: ["哑铃(8-20kg)", "壶铃"],
      execution_tips: ["双脚略宽于肩，脚尖略外展", "持哑铃于胸前，肘部贴近躯干", "下蹲至大腿平行地面", "脚跟发力站起"],
      common_mistakes: ["膝盖内扣", "上身过度前倾", "脚跟离地", "下蹲深度不足"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 90 }, intermediate: { sets: 3, reps: 12, rest_sec: 75 }, advanced: { sets: 4, reps: 15, rest_sec: 60 } },
      alternatives: ["徒手深蹲", "前蹲"]
    },
    {
      id: "shoulder_face_pull",
      name_zh: "面拉",
      name_en: "Cable Face Pull",
      category: "strength",
      target_muscles: ["后三角肌", "菱形肌", "棘下肌"],
      secondary_muscles: ["斜方肌中束", "前锯肌"],
      tennis_skills: ["肩部稳定性", "反手击球", "预防肩伤"],
      difficulty: "intermediate",
      equipment: ["缆绳器械", "弹力带"],
      execution_tips: ["缆绳调至面部位高度", "双手握绳端，拇指朝外", "向面部拉动，肘部外展", "在面部位置短暂停留后缓慢还原"],
      common_mistakes: ["拉动时耸肩", "使用过大重量", "肘部不展导致肩峰撞击", "拉动轨迹过低"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 15, rest_sec: 45 }, advanced: { sets: 3, reps: 20, rest_sec: 30 } },
      alternatives: ["弹力带面拉", "反向飞鸟"]
    },
    {
      id: "core_mountain_climber",
      name_zh: "登山者",
      name_en: "Mountain Climber",
      category: "cardio",
      target_muscles: ["腹直肌", "髂腰肌", "肩部稳定肌"],
      secondary_muscles: ["腓肠肌", "肱三头肌"],
      tennis_skills: ["核心耐力", "敏捷步伐", "心肺功能"],
      difficulty: "beginner",
      equipment: ["无器材"],
      execution_tips: ["俯卧撑起始姿势，核心收紧", "交替将膝盖快速提至胸前", "保持臀部不抬高不下塌", "控制节奏，呼吸配合"],
      common_mistakes: ["臀部过高或过低", "膝盖提起幅度不足", "腰部下沉", "速度过快失去控制"],
      sets_reps: { beginner: { sets: 2, reps: "30秒", rest_sec: 60 }, intermediate: { sets: 3, reps: "45秒", rest_sec: 45 }, advanced: { sets: 3, reps: "60秒", rest_sec: 30 } },
      alternatives: ["平板支撑", "高抬腿原地跑"]
    },
    {
      id: "legs_step_up",
      name_zh: "踏步蹲",
      name_en: "Step-Up",
      category: "strength",
      target_muscles: ["股四头肌", "臀大肌", "腘绳肌"],
      secondary_muscles: ["腓肠肌", "核心稳定肌"],
      tennis_skills: ["单脚平衡", "步伐爆发力", "网前截击姿态"],
      difficulty: "beginner",
      equipment: ["训练凳", "哑铃(可选)"],
      execution_tips: ["一脚完全踩实训练凳", "另一脚用力蹬地踩上凳面", "缓慢控制下放", "双腿交替进行"],
      common_mistakes: ["踩凳脚不完全踩实", "借助惯性甩身而上", "下放速度过快", "膝盖内扣"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["弓步蹲", "保加利亚分腿蹲"]
    },
    {
      id: "arm_bicep_curl",
      name_zh: "哑铃二头弯举",
      name_en: "Dumbbell Bicep Curl",
      category: "strength",
      target_muscles: ["肱二头肌", "肱肌"],
      secondary_muscles: ["前臂屈肌群", "三角肌前束"],
      tennis_skills: ["正手击球力量", "反手击球控制"],
      difficulty: "beginner",
      equipment: ["哑铃(5-15kg)"],
      execution_tips: ["站姿，双手持哑铃，掌心朝前", "上臂贴住躯干两侧不动", "仅靠肘关节屈曲将哑铃举起", "顶峰收缩一秒后缓慢下放"],
      common_mistakes: ["借助身体晃动借力", "上臂不固定随哑铃摆动", "下放速度过快不控制", "举得太高导致肩前伸"],
      sets_reps: { beginner: { sets: 2, reps: 12, rest_sec: 60 }, intermediate: { sets: 3, reps: 12, rest_sec: 45 }, advanced: { sets: 3, reps: 15, rest_sec: 30 } },
      alternatives: ["锤式弯举", "缆绳二头弯举"]
    },
    {
      id: "shoulder_overhead_press",
      name_zh: "哑铃肩推",
      name_en: "Dumbbell Overhead Press",
      category: "strength",
      target_muscles: ["三角肌前束", "三角肌中束", "肱三头肌"],
      secondary_muscles: ["斜方肌", "核心稳定肌"],
      tennis_skills: ["发球力量", "高压球力量", "上肢爆发力"],
      difficulty: "intermediate",
      equipment: ["哑铃(5-20kg)"],
      execution_tips: ["坐姿或站姿，哑铃举至肩高位", "掌心朝前，哑铃平行", "垂直向上推至双臂伸直但不锁死", "缓慢下放至肩高位"],
      common_mistakes: ["下背部过度伸展", "哑铃推起时轨迹不垂直", "手腕向后弯曲", "借助下肢蹬地借力"],
      sets_reps: { beginner: { sets: 2, reps: 10, rest_sec: 75 }, intermediate: { sets: 3, reps: 12, rest_sec: 60 }, advanced: { sets: 4, reps: 12, rest_sec: 45 } },
      alternatives: ["杠铃肩推", "缆绳肩推"]
    },
    {
      id: "plyo_box_jump",
      name_zh: "跳箱",
      name_en: "Box Jump",
      category: "plyometric",
      target_muscles: ["臀大肌", "股四头肌", "腓肠肌"],
      secondary_muscles: ["腘绳肌", "核心爆发肌"],
      tennis_skills: ["下肢爆发力", "发球起跳", "快速启动"],
      difficulty: "intermediate",
      equipment: ["跳箱", "牢固平台"],
      execution_tips: ["站于箱前约20cm", "快速下蹲后爆发性跳上箱面", "双脚同时落箱，膝盖微屈缓冲", "走下箱子（不要跳下）"],
      common_mistakes: ["盒子过高导致动作变形", "落地时膝盖内扣", "起跳前过度预蹲", "从箱上跳下损伤膝盖"],
      sets_reps: { beginner: { sets: 2, reps: 6, rest_sec: 90 }, intermediate: { sets: 3, reps: 8, rest_sec: 75 }, advanced: { sets: 4, reps: 10, rest_sec: 60 } },
      alternatives: ["深蹲跳", "蛙跳"]
    }
  ],

  /**
   * 根据目标技能匹配推荐动作
   * @param {string[]} targetSkills - 用户选择的目标技能
   * @param {string} level - beginner/intermediate/advanced
   * @returns {Object[]} 推荐动作列表
   */
  getRecommendedExercises(targetSkills, level) {
    // 技能→动作映射（高优先级，含新增动作）
    const skillMap = {
      "正手": ["shoulder_dumbbell_lateral_raise", "chest_push_up", "back_lat_pulldown", "core_russian_twist", "legs_squat", "arm_bicep_curl", "shoulder_overhead_press"],
      "反手": ["shoulder_external_rotation", "shoulder_90_90_er", "back_seated_row", "wrist_pronated_curl", "arm_triceps_cable_pushdown", "shoulder_face_pull"],
      "发球/高压": ["shoulder_bent_over_dumbbell_scatch", "arm_triceps_cable_pushdown", "core_plank", "legs_squat", "legs_calf_raise", "plyo_box_jump", "shoulder_overhead_press"],
      "截击": ["chest_push_up", "arm_triceps_cable_pushdown", "legs_lunges", "shoulder_dumbbell_lateral_raise", "legs_step_up"],
      "步伐": ["legs_squat", "legs_lunges", "legs_calf_raise", "cardio_jumping_rope", "plyo_lateral_lunge", "plyo_box_jump", "core_mountain_climber"]
    };

    // 标记技能匹配的动作（高优先级）
    const priorityIds = new Set();
    (targetSkills || []).forEach(skill => {
      (skillMap[skill] || []).forEach(id => priorityIds.add(id));
    });
    // 基础必选动作
    priorityIds.add("core_plank");
    priorityIds.add("legs_squat");
    priorityIds.add("shoulder_external_rotation");

    // 返回全部动作，附加 priority 标记供选择器使用
    return this.exercises.map(ex => ({
      ...ex,
      _priority: priorityIds.has(ex.id) ? 2 : 1  // 2=高优(技能相关), 1=普通
    }));
  },

  /**
   * 根据训练水平筛选动作
   */
  getExercisesByLevel(level) {
    if (level === "beginner") {
      return this.exercises.filter(ex => ex.difficulty === "beginner");
    } else if (level === "advanced") {
      return this.exercises; // all exercises
    }
    return this.exercises; // intermediate gets all
  }
};

// 导出（兼容浏览器和 Node.js）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TennisCoachKB;
}
