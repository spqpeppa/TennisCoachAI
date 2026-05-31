/**
 * TennisCoach AI - 主应用逻辑
 * 依赖：knowledge-base.js, prompts.js, config.json
 */

// ========== 全局状态 ==========
const AppState = {
  currentStep: 1,
  userProfile: {
    age: null,
    gender: '',
    height: null,
    weight: null,
    injuryHistory: ''
  },
  tennisLevel: null,      // 2.0 - 5.0
  strengthAssessment: {
    pushups: null,
    squats: null,
    plank: null
  },
  strengthLevel: null,  // "beginner" | "intermediate" | "advanced"
  targetSkills: [],
  generatedPlan: null
};

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
  renderNtrpSelector();
  renderSkillSelector();
});

// ========== NTRP 水平选择器 ==========
function renderNtrpSelector() {
  const container = document.getElementById('ntrp-selector');
  const levels = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
  container.innerHTML = levels.map(v => `
    <div class="ntrp-option">
      <input type="radio" name="ntrp" id="ntrp-${v}" value="${v}"
             onchange="onNtrpChange(${v})">
      <label class="ntrp-label" for="ntrp-${v}">
        <span class="ntrp-label__value">${v}</span>
        <span class="ntrp-label__desc">${getNtrpDesc(v)}</span>
      </label>
    </div>
  `).join('');
}

function getNtrpDesc(v) {
  const map = { 2.0: '初学者', 2.5: '进阶初学', 3.0: '中级', 3.5: '中高级', 4.0: '高级', 4.5: '顶尖业余', 5.0: '准职业' };
  return map[v] || '';
}

function onNtrpChange(v) {
  AppState.tennisLevel = v;
  const hint = document.getElementById('ntrp-hint');
  hint.textContent = `已选择：${v}（${getNtrpDesc(v)}）`;
  hint.style.color = '#1a73e8';
}

// ========== 技能选择器 ==========
function renderSkillSelector() {
  const container = document.getElementById('skill-selector');
  const skills = [
    { id: '正手', icon: '🎾', label: '正手' },
    { id: '反手', icon: '🏸', label: '反手' },
    { id: '发球/高压', icon: '🔥', label: '发球/高压' },
    { id: '截击', icon: '💨', label: '截击' },
    { id: '步伐', icon: '🏃', label: '步伐' }
  ];
  container.innerHTML = skills.map(s => `
    <div class="skill-option">
      <input type="checkbox" name="skill" id="skill-${s.id}" value="${s.id}"
             onchange="onSkillChange()">
      <label class="skill-label" for="skill-${s.id}">
        <span class="skill-label__icon">${s.icon}</span>
        <span>${s.label}</span>
      </label>
    </div>
  `).join('');
}

function onSkillChange() {
  const checked = document.querySelectorAll('input[name="skill"]:checked');
  AppState.targetSkills = Array.from(checked).map(el => el.value);
}

// ========== 步骤导航 ==========
function nextStep(targetStep) {
  if (!validateCurrentStep(AppState.currentStep)) return;
  saveCurrentStepData(AppState.currentStep);
  AppState.currentStep = targetStep;
  updateStepUI();
}

function prevStep(targetStep) {
  AppState.currentStep = targetStep;
  updateStepUI();
}

function updateStepUI() {
  // 隐藏所有 section（现在只有2个）
  for (let i = 1; i <= 2; i++) {
    const el = document.getElementById(`section-${i}`);
    if (el) el.style.display = 'none';
  }
  // 显示当前 section
  const currentEl = document.getElementById(`section-${AppState.currentStep}`);
  if (currentEl) currentEl.style.display = '';

  // 更新步骤指示器
  document.querySelectorAll('.step-item').forEach(item => {
    const step = parseInt(item.dataset.step);
    item.classList.remove('active', 'completed');
    if (step === AppState.currentStep) {
      item.classList.add('active');
    } else if (step < AppState.currentStep) {
      item.classList.add('completed');
    }
  });

  // 隐藏计划区
  document.getElementById('plan-section').classList.remove('active');
  document.getElementById('loader').classList.remove('active');
}

function showError(msg) {
  const el = document.getElementById('error-msg');
  el.textContent = msg;
  el.classList.add('active');
  setTimeout(() => el.classList.remove('active'), 5000);
}

function clearError() {
  document.getElementById('error-msg').classList.remove('active');
}

// ========== 表单验证 ==========
function validateCurrentStep(step) {
  clearError();
  if (step === 1) {
    // 基本信息
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const weeklyFreq = document.getElementById('weekly-exercise-frequency').value;
    if (!age || age < 10 || age > 80) { showError('请输入有效年龄（10-80）'); return false; }
    if (!gender) { showError('请选择性别'); return false; }
    if (!height || height < 100 || height > 250) { showError('请输入有效身高（100-250 cm）'); return false; }
    if (!weight || weight < 30 || weight > 200) { showError('请输入有效体重（30-200 kg）'); return false; }
    if (!weeklyFreq) { showError('请选择每周可运动次数'); return false; }
    // NTRP 水平
    if (!AppState.tennisLevel) { showError('请选择您的 NTRP 水平'); return false; }
    // 力量评估
    const pushups = document.getElementById('pushups').value;
    const squats = document.getElementById('squats').value;
    const plank = document.getElementById('plank').value;
    if (pushups === '' || pushups < 0) { showError('请输入俯卧撑极限次数'); return false; }
    if (squats === '' || squats < 0) { showError('请输入徒手深蹲极限次数'); return false; }
    if (plank === '' || plank < 0) { showError('请输入平板支撑极限时间'); return false; }
    return true;
  }
  if (step === 2) {
    if (AppState.targetSkills.length === 0) { showError('请至少选择一项目标技能'); return false; }
    return true;
  }
  return true;
}

function saveCurrentStepData(step) {
  if (step === 1) {
    // 保存基本信息
    AppState.userProfile = {
      age: parseInt(document.getElementById('age').value),
      gender: document.getElementById('gender').value,
      height: parseInt(document.getElementById('height').value),
      weight: parseInt(document.getElementById('weight').value),
      weeklyExerciseFrequency: parseInt(document.getElementById('weekly-exercise-frequency').value),
      injuryHistory: document.getElementById('injury-history').value.trim()
    };
    // 保存力量评估
    AppState.strengthAssessment = {
      pushups: parseInt(document.getElementById('pushups').value),
      squats: parseInt(document.getElementById('squats').value),
      plank: parseInt(document.getElementById('plank').value)
    };
    AppState.strengthLevel = assessStrengthLevel();
    // tennisLevel 已在 onNtrpChange 时保存到 AppState
  }
}

// ========== 力量水平评估 ==========
function assessStrengthLevel() {
  const { pushups, squats, plank } = AppState.strengthAssessment;
  const { age, gender } = AppState.userProfile;

  // ===== 年龄安全上限（ACSM 安全原则）=====
  // 60岁及以上：最高初级（骨骼肌肉适能有限，防受伤）
  // 50-59岁：最高中级（恢复能力减弱）
  // 50岁以下：无年龄上限
  let ageCap = 'advanced';
  if (age >= 60) ageCap = 'beginner';
  else if (age >= 50) ageCap = 'intermediate';

  // ===== 基础力量评分（0-100）=====
  let score = 0;

  // 俯卧撑评分（体重相对力量）
  const pushupScore = gender === 'male'
    ? Math.min(100, (pushups / (age < 30 ? 40 : age < 50 ? 30 : 20)) * 100)
    : Math.min(100, (pushups / (age < 30 ? 20 : age < 50 ? 15 : 10)) * 100);

  // 深蹲评分（下肢耐力）
  const squatScore = Math.min(100, (squats / 40) * 100);

  // 平板支撑评分（核心耐力）
  const plankMin = plank / 60;
  const plankScore = Math.min(100, (plankMin / (age < 30 ? 2 : 1.5)) * 100);

  score = pushupScore * 0.35 + squatScore * 0.35 + plankScore * 0.3;

  // ===== 综合评级 =====
  let level;
  if (score >= 70) level = 'advanced';
  else if (score >= 35) level = 'intermediate';
  else level = 'beginner';

  // ===== 应用年龄安全上限 =====
  const levelRank = { beginner: 0, intermediate: 1, advanced: 2 };
  const capRank = levelRank[ageCap];
  const currentRank = levelRank[level];
  if (currentRank > capRank) {
    console.log(`[力量评估] 原始评级: ${level}(${score.toFixed(1)}分), 年龄${age}岁安全上限: ${ageCap}, 已调整`);
    level = ageCap;
  }

  console.log(`[力量评估] 年龄:${age} 性别:${gender} | 俯卧撑:${pushups} 深蹲:${squats} 平板:${plank}秒 | 分数:${score.toFixed(1)} | 等级:${level}`);
  return level;
}

// ========== 训练计划生成（基于规则 + 知识库）==========
async function generatePlan() {
  if (!validateCurrentStep(2)) return;
  // 步骤2只有目标技能，数据已通过 onSkillChange 实时更新到 AppState

  // 显示加载动画
  document.getElementById('loader').classList.add('active');
  document.getElementById('plan-section').classList.remove('active');

  // 尝试使用 AI 生成（如果启用）
  const config = await fetchConfig();
  let plan;
  if (config && config.features && config.features.enableAIGeneration) {
    try {
      plan = await generatePlanWithAI(config);
    } catch (e) {
      console.warn('AI 生成失败，使用规则引擎：', e);
      plan = generatePlanRuleBased();
    }
  } else {
    plan = generatePlanRuleBased();
  }

  AppState.generatedPlan = plan;

  // 渲染计划
  renderPlan(plan);

  // 隐藏加载，显示结果
  document.getElementById('loader').classList.remove('active');
  document.getElementById('plan-section').classList.add('active');

  // 更新日期范围标题
  updatePlanDateRange(plan);

  // 滚动到计划区域
  setTimeout(() => {
    document.getElementById('plan-section').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

async function fetchConfig() {
  try {
    const resp = await fetch('config.json');
    return await resp.json();
  } catch {
    return null;
  }
}

// ========== 规则引擎：生成训练计划 ==========
function generatePlanRuleBased() {
  const { userProfile, tennisLevel, strengthLevel, targetSkills } = AppState;
  // 使用用户选择的每周运动次数，而不是自动计算
  const weeklyFreq = userProfile.weeklyExerciseFrequency || getWeeklyFrequency(strengthLevel, tennisLevel);
  const kb = TennisCoachKB;

  // 确定每周训练日分布模式（避免连续训练）
  const trainDaysPattern = selectTrainDays(weeklyFreq);

  // 获取推荐动作
  const recommended = kb.getRecommendedExercises(targetSkills, strengthLevel);

  // 为28天每天分配动作（4周计划）
  const days = [];
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const today = new Date();

  for (let i = 0; i < 28; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;
    const dayOfWeek = dayNames[date.getDay()];

    // 判断今天是否训练：按周循环模式
    if (!trainDaysPattern.has(date.getDay())) {
      days.push({
        dayIndex: i,
        dayOfWeek,
        date: dateStr,
        isRestDay: true,
        focus: '休息日',
        warmUp: [],
        exercises: [],
        coolDown: ['婴儿式 60秒', '门框胸部拉伸 每侧30秒', '腘绳肌拉伸 每侧30秒'],
        durationMin: 0
      });
      continue;
    }

    // 今日训练重点（根据目标技能和训练阶段轮换）
    const focus = getDayFocus(targetSkills, i, trainDaysPattern.size, 28);
    const isFullBody = isFullBodyDay(i, trainDaysPattern, 28);
    const { warmUp, exercises, coolDown } = generateDayWorkout({
      focus,
      isFullBody,
      strengthLevel,
      recommended,
      kb,
      userProfile,
      dayIndex: i,
      totalDays: 28
    });

    days.push({
      dayIndex: i,
      dayOfWeek,
      date: dateStr,
      isRestDay: false,
      focus,
      warmUp,
      exercises,
      coolDown,
      durationMin: 45 + (strengthLevel === 'advanced' ? 30 : strengthLevel === 'intermediate' ? 15 : 0)
    });
  }

  return {
    userProfile: {
      ...userProfile,
      tennisLevel,
      strengthLevel,
      targetSkills
    },
    planOverview: generatePlanOverview(targetSkills, strengthLevel, tennisLevel, 28),
    days
  };
}

function getWeeklyFrequency(strengthLevel, tennisLevel) {
  if (strengthLevel === 'beginner') return Math.min(3, Math.max(2, Math.floor(tennisLevel)));
  if (strengthLevel === 'intermediate') return Math.min(5, Math.max(3, Math.ceil(tennisLevel)));
  return Math.min(6, Math.max(4, Math.ceil(tennisLevel) + 1));
}

function selectTrainDays(weeklyFreq) {
  // 根据每周训练频率返回训练日分布模式（避免连续训练）
  const patterns = {
    2: [1, 4],           // 周一、周五
    3: [0, 2, 5],      // 周日、周二、周五
    4: [0, 2, 4, 6],   // 周日、周二、周四、周六
    5: [0, 1, 3, 4, 6], // 增加周一
    6: [0, 1, 2, 3, 4, 6] // 仅周三休息
  };
  const pattern = patterns[weeklyFreq] || patterns[3];
  return new Set(pattern);
}

function getDayFocus(targetSkills, dayIndex, totalTrainDaysPerWeek, totalDays) {
  const skillMap = {
    '正手': '正手击球力量 + 核心稳定性',
    '反手': '反手击球控制 + 肩袖稳定性',
    '发球/高压': '发球爆发力 + 肩部力量',
    '截击': '截击反应 + 下肢敏捷',
    '步伐': '步伐移动 + 下肢力量'
  };
  // 按训练日轮换重点（30天内会多次循环）
  const sorted = [...targetSkills].sort();
  const idx = dayIndex % Math.max(sorted.length, 1);
  return sorted[idx] ? skillMap[sorted[idx]] : '全身综合力量 + 心肺耐力';
}

function isFullBodyDay(dayIndex, trainDaysPattern, totalDays) {
  // 训练日较少时，每天都全身；训练日多时，分化训练
  return trainDaysPattern.size <= 3;
}

function generatePlanOverview(targetSkills, strengthLevel, tennisLevel, totalDays) {
  const skillNames = targetSkills.join('、');
  const levelDesc = tennisLevel <= 2.5 ? '初学者' : tennisLevel <= 3.5 ? '中级' : '中高级';
  const dayText = totalDays === 28 ? '28天（4周）' : totalDays === 30 ? '30天' : '本周';
  return `本${dayText}训练计划为${levelDesc}水平定制，重点提升【${skillNames}】。${
    strengthLevel === 'beginner' ? '以动作学习和轻重量为主，注重动作质量。' :
    strengthLevel === 'intermediate' ? '中等强度训练，兼顾力量提升和动作精进。' :
    '高强度专项训练，最大化网球表现。'
  }训练计划遵循 ACSM 标准，包含充分热身和放松。`;
}

function generateDayWorkout({ focus, isFullBody, strengthLevel, recommended, kb, userProfile, dayIndex, totalDays }) {
  const warmUp = [
    '原地慢跑或跳绳 3-5 分钟（低强度热身）',
    '肩关节环绕 前后各10圈',
    '髋关节环绕 前后各10圈',
    '动态弓步 每侧5次',
    '高抬腿 20次'
  ];

  // 从推荐动作中选择今日动作
  const selected = selectExercisesForDay(recommended, focus, isFullBody, strengthLevel, kb, dayIndex, totalDays);

  const coolDown = [
    '胸前压肩拉伸 30秒',
    '门框胸部拉伸 每侧30秒',
    '婴儿式背部放松 60秒',
    '腘绳肌拉伸 每侧30秒',
    '腓肠肌拉伸 每侧30秒'
  ];

  return { warmUp, exercises: selected, coolDown };
}

function selectExercisesForDay(recommended, focus, isFullBody, strengthLevel, kb, dayIndex, totalDays) {
  // 排除拉伸类动作（它们属于coolDown，不是主训练）
  let strengthExercises = recommended.filter(ex => ex.category !== 'flexibility');

  // ===== 按用户力量水平过滤动作难度（避免受伤）=====
  // beginner  → 仅 beginner 难度
  // intermediate → beginner + intermediate
  // advanced → 全部（不限制）
  const difficultyAllow = {
    beginner: ['beginner'],
    intermediate: ['beginner', 'intermediate'],
    advanced: ['beginner', 'intermediate', 'advanced']
  };
  const allowed = difficultyAllow[strengthLevel] || ['beginner', 'intermediate'];
  const difficultyFiltered = strengthExercises.filter(ex => {
    if (!ex.difficulty) return true;  // 无难度标识，默认保留
    return allowed.includes(ex.difficulty);
  });
  // 兜底：过滤后动作太少时，放宽至不限制难度（保证计划可生成）
  const safePool = difficultyFiltered.length >= 3
    ? difficultyFiltered
    : strengthExercises;
  if (safePool === strengthExercises) {
    console.warn(`[难度过滤] 等级=${strengthLevel}, 允许难度=[${allowed.join(',')}], 过滤后仅${difficultyFiltered.length}个, 已放宽限制`);
  } else {
    console.log(`[难度过滤] 等级=${strengthLevel}, 允许难度=[${allowed.join(',')}], 过滤后${safePool.length}个动作`);
  }

  // ===== 动作分类池（基于安全难度池）=====
  strengthExercises = safePool;
  const pools = {
    // 肩部稳定（网球专项关键）
    shoulder: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('肩') || m.includes('三角') || m.includes('棘下') || m.includes('外旋'))
    ),
    // 上肢推力（胸/三头）
    push: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('胸') || m.includes('三头') || ex.name_zh.includes('俯卧撑'))
    ),
    // 上肢拉力（背/二头）
    pull: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('背') || m.includes('二头') || m.includes('菱形') || m.includes('阔肌'))
    ),
    // 核心
    core: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('腹') || m.includes('竖脊') || m.includes('核心') || ex.name_zh.includes('平板') || ex.name_zh.includes('俄罗斯'))
    ),
    // 下肢主项
    legs: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('股') || m.includes('臀') || m.includes('腓肠') || m.includes('腘绳')) &&
      !ex.name_zh.includes('提踵')
    ),
    // 下肢辅助（小腿）
    calf: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('腓肠') || m.includes('比目鱼')) ||
      ex.name_zh.includes('提踵')
    ),
    // 前臂/手腕（网球专项）
    wrist: strengthExercises.filter(ex =>
      ex.target_muscles.some(m => m.includes('前臂') || m.includes('腕')) ||
      ex.name_zh.includes('腕弯举')
    ),
    // 敏捷/爆发力（网球专项）
    plyo: strengthExercises.filter(ex =>
      ex.category === 'plyometric' || ex.tennis_skills?.some(s => s.includes('爆发') || s.includes('敏捷')) ||
      ex.name_zh.includes('跳绳') || ex.name_zh.includes('侧向')
    ),
  };

  const selected = [];
  const usedNames = new Set();

  // 辅助函数：从池中选一个未用过的动作
  function pickFrom(pool) {
    if (!pool || pool.length === 0) return null;
    const avail = pool.filter(ex => !usedNames.has(ex.name_zh));
    if (avail.length === 0) return null;
    const ex = pickExercise(avail, strengthLevel);
    usedNames.add(ex.name);
    return ex;
  }

  if (isFullBody) {
    // ========== 全身训练日：覆盖所有主要肌群，保证4-6个动作 ==========
    // 1. 肩部稳定（网球必练）
    const shoulderEx = pickFrom(pools.shoulder);
    if (shoulderEx) selected.push(shoulderEx);

    // 2. 上肢推力
    const pushEx = pickFrom(pools.push);
    if (pushEx) selected.push(pushEx);

    // 3. 上肢拉力
    const pullEx = pickFrom(pools.pull);
    if (pullEx) selected.push(pullEx);

    // 4. 核心
    const coreEx = pickFrom(pools.core);
    if (coreEx) selected.push(coreEx);

    // 5. 下肢主项
    const legEx = pickFrom(pools.legs);
    if (legEx) selected.push(legEx);

    // 6. 网球专项（前臂或敏捷）— 根据focus决定
    if (focus.includes('发球') || focus.includes('爆发')) {
      const plyoEx = pickFrom(pools.plyo);
      if (plyoEx) selected.push(plyoEx);
    } else {
      const wristEx = pickFrom(pools.wrist);
      if (wristEx) selected.push(wristEx);
    }

  } else {
    // ========== 分化训练日：根据focus选择重点 + 保证至少4个动作 ==========

    // 根据focus确定优先肌群
    let primaryPool, secondaryPool;

    if (focus.includes('正手') || focus.includes('力量')) {
      primaryPool = [...(pools.push || []), ...(pools.core || [])];
      secondaryPool = [...(pools.shoulder || []), ...(pools.legs || [])];
    } else if (focus.includes('反手') || focus.includes('稳定') || focus.includes('控制')) {
      primaryPool = [...(pools.shoulder || []), ...(pools.pull || [])];
      secondaryPool = [...(pools.core || []), ...(pools.wrist || [])];
    } else if (focus.includes('发球') || focus.includes('高压') || focus.includes('爆发')) {
      primaryPool = [...(pools.shoulder || []), ...(pools.push || []), ...(pools.plyo || [])];
      secondaryPool = [...(pools.core || []), ...(pools.legs || [])];
    } else if (focus.includes('截击') || focus.includes('反应') || focus.includes('敏捷')) {
      primaryPool = [...(pools.legs || []), ...(pools.plyo || [])];
      secondaryPool = [...(pools.shoulder || []), ...(pools.core || [])];
    } else if (focus.includes('步伐') || focus.includes('下肢') || focus.includes('移动')) {
      primaryPool = [...(pools.legs || []), ...(pools.calf || []), ...(pools.plyo || [])];
      secondaryPool = [...(pools.core || []), ...(pools.shoulder || [])];
    } else {
      // 默认全身综合
      primaryPool = [...(pools.push || []), ...(pools.legs || [])];
      secondaryPool = [...(pools.pull || []), ...(pools.core || [])];
    }

    // 从主池选2-3个
    for (let i = 0; i < Math.min(3, primaryPool.length); i++) {
      const ex = pickFrom(primaryPool);
      if (ex) selected.push(ex);
    }

    // 从副池选1-2个
    for (let i = 0; i < Math.min(2, secondaryPool.length); i++) {
      const ex = pickFrom(secondaryPool);
      if (ex) selected.push(ex);
    }

    // 每次分化训练都加核心（如还没有的话）
    if (!selected.some(s => (s.targetMuscles || []).some(m => m.includes('腹') || m.includes('竖脊') || m.includes('核心')))) {
      const coreEx = pickFrom(pools.core);
      if (coreEx) selected.push(coreEx);
    }
  }

  // ========== 兜底：如果不足3个动作，从剩余动作中补充 ==========
  if (selected.length < 3) {
    const allRemaining = strengthExercises.filter(ex => !usedNames.has(ex.name_zh));
    // 按类别顺序补充
    const fallbackOrder = [pools.shoulder, pools.push, pools.pull, pools.core, pools.legs, pools.wrist, pools.plyo];
    for (const pool of fallbackOrder) {
      if (selected.length >= 4) break;
      const ex = pickFrom(pool);
      if (ex && !selected.find(s => s.name === ex.name)) selected.push(ex);
    }
    // 最终兜底：从任何剩余动作中随机取
    if (selected.length < 3) {
      const anyLeft = strengthExercises.filter(ex => !usedNames.has(ex.name_zh));
      while (selected.length < 3 && anyLeft.length > 0) {
        const idx = Math.floor(Math.random() * anyLeft.length);
        const ex = pickExercise([anyLeft[idx]], strengthLevel);
        usedNames.add(ex.name);
        selected.push(ex);
        anyLeft.splice(idx, 1);
      }
    }
  }

  return selected;
}

function pickExercise(exercises, level) {
  const ex = exercises[Math.floor(Math.random() * exercises.length)];
  const setsReps = ex.sets_reps?.[level] || ex.sets_reps?.beginner || { sets: 2, reps: 12, rest_sec: 60 };
  return {
    name: ex.name_zh,
    nameEn: ex.name_en,
    sets: setsReps.sets,
    reps: typeof setsReps.reps === 'string' ? setsReps.reps : setsReps.reps,
    weight: getWeightSuggestion(ex, level),
    restSec: setsReps.rest_sec,
    tips: (ex.execution_tips || []).slice(0, 3),
    commonMistakes: ex.common_mistakes || [],
    alternatives: ex.alternatives || [],
    targetMuscles: ex.target_muscles || []
  };
}

function getWeightSuggestion(ex, level) {
  if (!ex.equipment) return '无器材';
  const eq = ex.equipment.join('、');
  if (eq.includes('无器材')) return '无器材（自重训练）';
  if (level === 'beginner') return '轻重量（能完成目标次数）';
  if (level === 'intermediate') return '中等重量（最后2次有挑战）';
  return '较大重量（RPE 7-8）';
}

// ========== AI 生成（可选）=========
async function generatePlanWithAI(config) {
  const { userProfile, tennisLevel, strengthAssessment, strengthLevel, targetSkills } = AppState;
  const prompt = TennisCoachPrompts.generateTrainingPlan({
    userProfile,
    tennisLevel,
    strengthAssessment,
    targetSkills,
    weeklyFrequency: getWeeklyFrequency(strengthLevel, tennisLevel),
    acsmStandards: config.acsmStandards,
    knowledgeBase: {
      muscleGroups: JSON.stringify(TennisCoachKB.muscleGroups, null, 2),
      exerciseList: TennisCoachKB.exercises.map(ex => `${ex.name_zh}（${ex.target_muscles.join('、')}）`).join('、')
    }
  });

  const response = await fetch(config.model.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.model.apiKey}`
    },
    body: JSON.stringify({
      model: config.model.modelName,
      messages: [{ role: 'user', content: prompt }],
      temperature: config.model.temperature,
      max_tokens: config.model.maxTokens
    })
  });

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || '';
  const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/(\{[\s\S]*\})/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1] || jsonMatch[0]);
  }
  throw new Error('AI 返回格式无法解析');
}

// ========== 渲染训练计划 ==========
function renderPlan(plan) {
  // Profile 信息
  renderProfile(plan.userProfile);
  // 计划概览（支持30天）
  renderOverview(plan.planOverview, plan.days.length);
  // 每日计划（按周分组）
  renderDays(plan.days);
}

function renderProfile(profile) {
  const container = document.getElementById('plan-profile');
  container.innerHTML = `
    <div class="plan-profile__item">
      <span class="plan-profile__label">年龄 / 性别</span>
      <span class="plan-profile__value">${profile.age} 岁 / ${profile.gender === 'male' ? '男' : '女'}</span>
    </div>
    <div class="plan-profile__item">
      <span class="plan-profile__label">身高 / 体重</span>
      <span class="plan-profile__value">${profile.height} cm / ${profile.weight} kg</span>
    </div>
    <div class="plan-profile__item">
      <span class="plan-profile__label">网球水平（NTRP）</span>
      <span class="plan-profile__value">
        ${profile.tennisLevel}
        <span class="tag tag--level">${getNtrpDesc(profile.tennisLevel)}</span>
      </span>
    </div>
    <div class="plan-profile__item">
      <span class="plan-profile__label">训练水平</span>
      <span class="plan-profile__value">
        <span class="tag tag--strength">${profile.strengthLevel === 'beginner' ? '初学者' : profile.strengthLevel === 'intermediate' ? '中级' : '高级'}</span>
      </span>
    </div>
    <div class="plan-profile__item">
      <span class="plan-profile__label">目标技能</span>
      <span class="plan-profile__tags">
        ${(profile.targetSkills || []).map(s => `<span class="tag tag--skill">${s}</span>`).join('')}
      </span>
    </div>
    ${profile.injuryHistory ? `
    <div class="plan-profile__item">
      <span class="plan-profile__label">伤病史 / 注意</span>
      <span class="plan-profile__value" style="color:#e65100;font-size:0.85rem;">⚠️ ${profile.injuryHistory}</span>
    </div>` : ''}
  `;
}

function renderOverview(overview, totalDays) {
  const title = totalDays >= 28 ? `📋 ${totalDays}天训练计划概览` : '📋 本周训练概览';
  document.getElementById('plan-overview').innerHTML = `
    <strong>${title}</strong><br>
    ${overview}
  `;
}

function renderDays(days) {
  const container = document.getElementById('plan-days');
  const isThirtyDay = days.length > 7;

  if (!isThirtyDay) {
    // 7天计划：原样渲染
    container.innerHTML = days.map(day => renderDayCard(day)).join('');
    return;
  }

  // 30天计划：按周分组，可折叠
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  container.innerHTML = weeks.map((weekDays, weekIdx) => {
    const weekNum = weekIdx + 1;
    const weekLabel = `第${weekNum}周（第${weekDays[0].dayIndex + 1}-${weekDays[weekDays.length - 1].dayIndex + 1}天）`;
    const weekId = `week-${weekIdx}`;
    const isFirstWeek = weekIdx === 0;

    return `
      <div class="week-group">
        <div class="week-header" onclick="toggleWeek('${weekId}')">
          <span class="week-title">📅 ${weekLabel}</span>
          <span class="week-toggle" id="${weekId}-toggle">${isFirstWeek ? '收起' : '展开'}</span>
        </div>
        <div class="week-content" id="${weekId}" style="display: ${isFirstWeek ? 'block' : 'none'};">
          ${weekDays.map(day => renderDayCard(day)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// 渲染单天训练卡片（供 renderDays 调用）
function renderDayCard(day) {
  if (day.isRestDay) {
    return `
      <div class="plan-day plan-day--rest">
        <div class="plan-day__header">
          <div>
            <span class="plan-day__name">${day.dayOfWeek}</span>
            <span class="plan-day__focus">${day.date}</span>
          </div>
          <span class="plan-day__badge badge--rest">休息日</span>
        </div>
        <div class="rest-day">
          <div class="rest-day__icon">😴</div>
          <div class="rest-day__text">今天好好休息，让肌肉恢复和生长</div>
          <div style="margin-top:12px;font-size:0.82rem;color:#5f6368;">
            建议放松活动：${(day.coolDown || []).join(' · ')}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="plan-day">
      <div class="plan-day__header">
        <div>
          <span class="plan-day__name">${day.dayOfWeek}</span>
          <span class="plan-day__focus">${day.date} · ${day.focus}</span>
        </div>
        <span class="plan-day__badge badge--train">训练 ${day.durationMin} 分钟</span>
      </div>
      <div class="plan-day__content">
        <!-- 热身 -->
        <div class="plan-section">
          <div class="plan-section__title">🔥 热身（5-10分钟）</div>
          <ul class="plan-section__list">
            ${(day.warmUp || []).map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
        <!-- 主训练 -->
        <div class="plan-section">
          <div class="plan-section__title">💪 主训练</div>
          <div class="exercise-grid">
          ${(day.exercises || []).map(ex => `
            <div class="exercise-item">
              <div class="exercise-item__header">
                <div class="exercise-item__info">
                  <div class="exercise-item__name">${ex.name}</div>
                  <div class="exercise-item__meta">${ex.nameEn || ''}</div>
                </div>
                <div class="exercise-item__sets">${ex.sets} 组 × ${ex.reps} 次</div>
              </div>
              <div class="exercise-item__muscles">
                ${(ex.targetMuscles || []).map(m => `<span class="muscle-tag">${m}</span>`).join('')}
              </div>
              ${ex.tips && ex.tips.length > 0 ? `
                <div class="exercise-item__tips">💡 ${ex.tips.join('；')}</div>
              ` : ''}
              ${ex.commonMistakes && ex.commonMistakes.length > 0 ? `
                <div class="exercise-item__mistakes">⚠️ 常见错误：${ex.commonMistakes.join('；')}</div>
              ` : ''}
              ${ex.alternatives && ex.alternatives.length > 0 ? `
                <div class="exercise-item__alternatives">🔄 替代动作：${ex.alternatives.join(' / ')}</div>
              ` : ''}
            </div>
          `).join('')}
          </div>
        </div>
        <!-- 放松 -->
        <div class="plan-section">
          <div class="plan-section__title">🧘 拉伸放松（5-10分钟）</div>
          <ul class="plan-section__list">
            ${(day.coolDown || []).map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

// ========== 周折叠/展开 ==========
function toggleWeek(weekId) {
  const content = document.getElementById(weekId);
  const toggle = document.getElementById(`${weekId}-toggle`);
  if (!content || !toggle) return;
  if (content.style.display === 'none') {
    content.style.display = 'block';
    toggle.textContent = '收起';
  } else {
    content.style.display = 'none';
    toggle.textContent = '展开';
  }
}

// ========== 导出功能 ==========

// 导出为独立 HTML 文件（可分享）
function exportPlanHTML() {
  const plan = AppState.generatedPlan;
  if (!plan) return;
  const html = generateStandaloneHTML(plan);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `TennisCoach-AI-训练计划-${formatDate(new Date())}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

// 导出为 PDF（使用浏览器打印）
function exportPlanPDF() {
  // 打印前展开所有周，确保 PDF 内容完整可见
  document.querySelectorAll('.week-content').forEach(el => {
    el.style.display = 'block';
  });
  document.querySelectorAll('.week-toggle').forEach(el => {
    el.textContent = '收起';
  });
  // 打印（用户可选择"另存为 PDF"）
  window.print();
  // 打印对话框关闭后恢复展开状态（保持展开，用户可手动折叠）
}

// 重置所有
function resetAll() {
  if (!confirm('确定要重新填写信息并生成新计划吗？')) return;
  AppState.currentStep = 1;
  AppState.userProfile = { age: null, gender: '', height: null, weight: null, injuryHistory: '' };
  AppState.tennisLevel = null;
  AppState.strengthAssessment = { pushups: null, squats: null, plank: null };
  AppState.strengthLevel = null;
  AppState.targetSkills = [];
  AppState.generatedPlan = null;

  // 重置表单
  ['age', 'height', 'weight', 'injury-history', 'pushups', 'squats', 'plank'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('gender').value = '';
  document.querySelectorAll('input[name="ntrp"]').forEach(el => el.checked = false);
  document.querySelectorAll('input[name="skill"]').forEach(el => el.checked = false);
  document.getElementById('ntrp-hint').textContent = '请选择一个水平等级';
  document.getElementById('ntrp-hint').style.color = '';

  updateStepUI();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== 生成独立 HTML（用于分享）==========
function generateStandaloneHTML(plan) {
  // 复用当前页面的样式和内联关键 CSS
  const profileHTML = document.getElementById('plan-profile').innerHTML;
  const overviewHTML = document.getElementById('plan-overview').innerHTML;
  const acsmHTML = document.getElementById('acsm-badge')?.outerHTML || '';

  // 生成所有周全部展开的 HTML（导出用）
  const daysHTMLExpanded = generateExpandedDaysHTML(plan.days);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TennisCoach AI - 个性化网球训练计划</title>
  <style>
    ${getInlineCSS()}
  </style>
</head>
<body>
  <div class="navbar">
    <div class="navbar__brand"><span class="navbar__icon">🎾</span> TennisCoach AI<span class="navbar__subtitle"> - 智能网球体能训练助手</span></div>
  </div>
  <div class="container">
    <div class="card" style="overflow:visible;">
      <div class="plan-header">
        <div class="plan-header__title">🎾 个性化网球训练计划</div>
        <div class="plan-header__subtitle">基于 ACSM 标准 · 科学定制化</div>
        <div class="plan-header__contact">📮 可小红书 私信 @Peppa🎾🥕 更新/交流</div>
      </div>
      <div class="plan-profile">${profileHTML}</div>
      <div class="plan-overview">${overviewHTML}</div>
      ${acsmHTML}
      <div class="plan-days">${daysHTMLExpanded}</div>
      <div style="text-align:center;padding:20px;color:#9aa0a6;font-size:0.8rem;border-top:1px solid #dadce0;margin:0 -2rem;">
        由 TennisCoach AI 生成 · ${formatDate(new Date())}
      </div>
    </div>
  </div>
  <script>
    function toggleWeek(weekId) {
      const content = document.getElementById(weekId);
      const toggle = document.getElementById(weekId + '-toggle');
      if (!content || !toggle) return;
      if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '收起';
      } else {
        content.style.display = 'none';
        toggle.textContent = '展开';
      }
    }
  </script>
</body>
</html>`;
}

// 生成所有周全部展开的 days HTML（用于导出/打印）
function generateExpandedDaysHTML(days) {
  const isMultiWeek = days.length > 7;
  if (!isMultiWeek) {
    return days.map(day => renderDayCard(day)).join('');
  }
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks.map((weekDays, weekIdx) => {
    const weekNum = weekIdx + 1;
    const weekLabel = `第${weekNum}周（第${weekDays[0].dayIndex + 1}-${weekDays[weekDays.length - 1].dayIndex + 1}天）`;
    const weekId = `week-export-${weekIdx}`;
    return `
      <div class="week-group">
        <div class="week-header" onclick="toggleWeek('${weekId}')">
          <span class="week-title">📅 ${weekLabel}</span>
          <span class="week-toggle" id="${weekId}-toggle">收起</span>
        </div>
        <div class="week-content" id="${weekId}" style="display: block;">
          ${weekDays.map(day => renderDayCard(day)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function getInlineCSS() {
  // 返回关键内联 CSS（与 style.css 一致的核心样式）
  return `
    :root { --primary:#1a73e8; --primary-dark:#0d47a1; --bg:#f8f9fa; --bg-card:#fff; --text:#202124; --text-secondary:#5f6368; --border:#dadce0; --shadow-sm:0 1px 3px rgba(0,0,0,0.08); }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; margin:0; }
    .navbar { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; padding: 0 2rem; height: 60px; display: flex; align-items: center; }
    .navbar__brand { display: flex; align-items: center; gap: 10px; font-size: 1.25rem; font-weight: 700; }
    .navbar__icon { font-size: 1.8rem; }
    .navbar__subtitle { font-size: 0.8rem; opacity: 0.85; font-weight: 400; margin-left: 8px; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
    .card { background: var(--bg-card); border-radius: 16px; box-shadow: var(--shadow-sm); padding: 0; margin-bottom: 1.5rem; border: 1px solid var(--border); overflow: hidden; }
    .plan-header { background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%); color: white; padding: 2rem; margin: 0; }
    .plan-header__title { font-size: 1.5rem; font-weight: 800; margin-bottom: 4px; }
    .plan-header__subtitle { font-size: 0.9rem; opacity: 0.85; }
    .plan-header__contact { margin-top: 8px; font-size: 0.82rem; background: rgba(255,255,255,0.18); display: inline-flex; padding: 5px 14px; border-radius: 999px; letter-spacing: 0.3px; }
    .plan-profile { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; padding: 1.25rem 2rem; background: #f0f6ff; margin: 0; border-bottom: 1px solid var(--border); }
    .plan-profile__label { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }
    .plan-profile__value { font-size: 0.95rem; font-weight: 600; color: var(--text); }
    .plan-profile__tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 2px; }
    .tag { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .tag--skill { background: #e8f0fe; color: var(--primary); }
    .tag--level { background: #e6f4ea; color: #137333; }
    .tag--strength { background: #fef7e0; color: #b06000; }
    .plan-overview { padding: 1.25rem 2rem; background: #f8f9fa; margin: 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; color: var(--text-secondary); }
    .acsm-badge { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #e6f4ea; color: #137333; border-radius: 6px; font-size: 0.82rem; font-weight: 500; margin: 1rem 2rem 0; }
    .plan-days { padding: 1.5rem 2rem 2rem; }
    .plan-day { border: 1.5px solid var(--border); border-radius: 10px; margin-bottom: 1rem; overflow: hidden; }
    .plan-day--rest { opacity: 0.65; }
    .plan-day__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f8f9fa; border-bottom: 1px solid var(--border); }
    .plan-day__name { font-weight: 700; font-size: 0.95rem; color: var(--primary-dark); }
    .plan-day__focus { font-size: 0.8rem; color: var(--text-secondary); font-weight: 500; }
    .plan-day__badge { padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .badge--train { background: #e8f0fe; color: var(--primary); }
    .badge--rest { background: #e6f4ea; color: #137333; }
    .plan-day__content { padding: 14px 16px; }
    .plan-section { margin-bottom: 12px; }
    .plan-section__title { font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .plan-section__list { list-style: none; padding: 0; }
    .plan-section__list li { padding: 4px 0; font-size: 0.88rem; color: var(--text); display: flex; align-items: center; gap: 8px; }
    .plan-section__list li::before { content: "•"; color: #4a9af5; font-weight: 700; }
    .exercise-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .exercise-item { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border: 1px solid #e8f0fe; border-radius: 6px; background: #fafbfc; }
    .exercise-item__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; }
    .exercise-item__info { flex: 1; min-width: 0; }
    .exercise-item__name { font-weight: 700; font-size: 0.95rem; color: var(--text); }
    .exercise-item__meta { font-size: 0.82rem; color: var(--text-secondary); }
    .exercise-item__sets { display: inline-block; background: #e8f0fe; color: var(--primary); padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 600; white-space: nowrap; }
    .exercise-item__tips { margin-top: 6px; padding: 8px 12px; background: #fffde7; border-radius: 6px; font-size: 0.82rem; color: #827717; border-left: 3px solid #fdd835; }
    .exercise-item__mistakes { margin-top: 4px; padding: 8px 12px; background: #fbe9e7; border-radius: 6px; font-size: 0.82rem; color: #bf360c; border-left: 3px solid #ef5350; }
    .exercise-item__alternatives { margin-top: 4px; font-size: 0.8rem; color: var(--text-secondary); }
    .exercise-item__muscles { margin-top: 4px; display: flex; gap: 6px; flex-wrap: wrap; }
    .muscle-tag { display: inline-block; padding: 2px 8px; background: #e8f0fe; color: #0d47a1; border-radius: 999px; font-size: 0.72rem; font-weight: 500; }
    .rest-day { text-align: center; padding: 2rem; color: var(--text-secondary); }
    .rest-day__icon { font-size: 3rem; margin-bottom: 8px; }
    .rest-day__text { font-size: 1rem; font-weight: 600; }
    /* 周分组样式 */
    .week-group { margin-bottom: 1.5rem; border: 1.5px solid var(--border); border-radius: 10px; overflow: hidden; }
    .week-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: linear-gradient(135deg, #e8f0fe 0%, #f0f6ff 100%); border-bottom: 1px solid var(--border); cursor: pointer; user-select: none; }
    .week-title { font-weight: 700; font-size: 0.95rem; color: var(--primary-dark); }
    .week-toggle { font-size: 0.78rem; color: var(--primary); font-weight: 600; padding: 3px 10px; border: 1px solid var(--primary-light); border-radius: 999px; background: white; }
    .week-content { padding: 0; }
    .week-content .plan-day { margin: 0; border-radius: 0; border-left: none; border-right: none; border-top: none; }
    .week-content .plan-day:last-child { border-bottom: none; }
    @page { margin: 1.5cm 1.5cm; size: A4; }
    @media print { .navbar { display: none; } .week-content { display: block !important; } .plan-day { break-inside: avoid; page-break-inside: avoid; } }
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      .plan-profile { grid-template-columns: 1fr 1fr; padding: 1rem; }
      .plan-days { padding: 1rem; }
    }
  `;
}

function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ========== 更新计划日期范围标题 ==========
function updatePlanDateRange(plan) {
  if (!plan || !plan.days || plan.days.length === 0) return;
  const firstDay = plan.days[0];
  const lastDay = plan.days[plan.days.length - 1];
  const dateRangeEl = document.getElementById('plan-date-range');
  if (dateRangeEl) {
    dateRangeEl.textContent = `${firstDay.date} ~ ${lastDay.date}（共${plan.days.length}天）`;
  }
}
