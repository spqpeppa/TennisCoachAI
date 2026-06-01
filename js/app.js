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
  targetSkills: ['正手', '步伐'],
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
             ${v === 3.0 ? 'checked' : ''}
             onchange="onNtrpChange(${v})">
      <label class="ntrp-label" for="ntrp-${v}">
        <span class="ntrp-label__value">${v}</span>
        <span class="ntrp-label__desc">${getNtrpDesc(v)}</span>
      </label>
    </div>
  `).join('');
  // 默认选中3.0
  AppState.tennisLevel = 3.0;
  const hint = document.getElementById('ntrp-hint');
  hint.textContent = `已选择：3.0（中级）`;
  hint.style.color = '#1a73e8';
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
             ${(s.id === '正手' || s.id === '步伐') ? 'checked' : ''}
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
    const focusInfo = getDayFocus(targetSkills, i, trainDaysPattern.size, 28);
    const isFullBody = isFullBodyDay(i, trainDaysPattern, 28);
    const { warmUp, exercises, coolDown } = generateDayWorkout({
      focus: focusInfo,
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
      focus: focusInfo.focusText,   // 保持focus为字符串用于显示
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
  // 按训练日轮换重点（28天内会多次循环）
  const sorted = [...targetSkills].sort();
  const idx = dayIndex % Math.max(sorted.length, 1);
  const skill = sorted[idx] || null;
  return {
    skill: skill,                    // 原始技能名，用于肌肉映射查询
    focusText: skill ? skillMap[skill] : '全身综合力量 + 心肺耐力'
  };
}

function isFullBodyDay(dayIndex, trainDaysPattern, totalDays) {
  // 训练日≤2时全身训练；≥3次/周时走分化训练（按技能匹配动作）
  return trainDaysPattern.size <= 2;
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

function selectExercisesForDay(recommended, focusInfo, isFullBody, strengthLevel, kb, dayIndex, totalDays) {
  // 排除拉伸类动作（它们属于coolDown，不是主训练）
  let strengthExercises = recommended.filter(ex => ex.category !== 'flexibility');

  // ===== 按用户力量水平过滤动作难度（避免受伤）=====
  const difficultyAllow = {
    beginner: ['beginner'],
    intermediate: ['beginner', 'intermediate'],
    advanced: ['beginner', 'intermediate', 'advanced']
  };
  const allowed = difficultyAllow[strengthLevel] || ['beginner', 'intermediate'];
  const difficultyFiltered = strengthExercises.filter(ex => {
    if (!ex.difficulty) return true;
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
  // ⚠️ 注意：保留原始池引用(rawPool)供agility等技能专项动作使用
  //     技能专项动作（如侧滑步、小碎步）不依赖力量水平，不应被难度过滤剔除
  const rawPool = strengthExercises;  // 保存原始池（覆盖前的最后引用）
  strengthExercises = safePool;
  const pools = {
    shoulder: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('肩') || m.includes('三角') || m.includes('棘下') || m.includes('外旋') || m.includes('冈下') || m.includes('小圆') || m.includes('肩胛'))
    ),
    push: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('胸') || m.includes('三头') || ex.name_zh.includes('俯卧撑'))
    ),
    pull: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('背') || m.includes('二头') || m.includes('菱形') || m.includes('阔肌') || m.includes('斜方'))
    ),
    core: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('腹') || m.includes('竖脊') || m.includes('核心') || ex.name_zh.includes('平板') || ex.name_zh.includes('俄罗斯') || ex.name_zh.includes('卷腹') || ex.name_zh.includes('扭转'))
    ),
    legs: safePool.filter(ex =>
      (ex.target_muscles.some(m => m.includes('股') || m.includes('臀') || m.includes('腓肠') || m.includes('腘绳') || m.includes('内收'))) &&
      !ex.name_zh.includes('提踵')
    ),
    calf: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('腓肠') || m.includes('比目鱼') || m.includes('小腿')) ||
      ex.name_zh.includes('提踵')
    ),
    wrist: safePool.filter(ex =>
      ex.target_muscles.some(m => m.includes('前臂') || m.includes('腕')) ||
      ex.name_zh.includes('腕弯举')
    ),
    plyo: safePool.filter(ex =>
      ex.category === 'plyometric' || ex.tennis_skills?.some(s => s.includes('爆发') || s.includes('敏捷')) ||
      ex.name_zh.includes('跳绳') || ex.name_zh.includes('侧向') || ex.name_zh.includes('跳箱') || ex.name_zh.includes('深蹲跳')
    ),
    // ⚠️ Agility步伐池：从原始池(rawPool)构建，不受难度过滤限制
    // 理由：agility是技能专项动作（侧滑步/小碎步等），不依赖力量水平，
    //       初学者和高级者都需要练习。如果用safePool，beginner级别会丢掉3/5的agility动作。
    agility: rawPool.filter(ex =>
      ex.category === 'agility'
    ),
    rotation: safePool.filter(ex =>
      ex.category === 'power' && (
        ex.target_muscles.some(m => m.includes('腹斜') || m.includes('旋转')) ||
        ex.name_zh.includes('旋转') || ex.name_zh.includes('砍伐') || ex.name_zh.includes('上推') ||
        ex.name_zh.includes('实心球')
      )
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

  // ===== 新增：根据技能名查找目标肌肉群，对练习打分排序 =====
  function scoreByMuscleRelevance(skillName) {
    const requiredMuscles = kb.skillToMuscles[skillName] || [];
    if (requiredMuscles.length === 0) return safePool.map(ex => ({ ex, score: 0 }));

    return safePool.map(ex => {
      // 计算目标肌肉与所需肌肉的重叠数
      let overlapCount = 0;
      const matchedMuscles = [];
      for (const tm of (ex.target_muscles || [])) {
        for (const rm of requiredMuscles) {
          // 双向包含匹配：如 "臀大肌" 包含 "臀"，"股四头肌" 包含 "股"
          if (tm.includes(rm) || rm.includes(tm) || tm === rm) {
            overlapCount++;
            matchedMuscles.push(tm);
            break; // 每个 target muscle 只计一次
          }
        }
      }
      // 额外加分：tennis_skills 中包含该技能关键词
      let bonus = 0;
      if (ex.tennis_skills && ex.tennis_skills.length > 0) {
        const skillKeywords = {
          '正手': ['正手', '击球'],
          '反手': ['反手', '切削'],
          '发球/高压': ['发球', '高压', '过顶', '爆发'],
          '截击': ['截击', '反应', '推挡'],
          '步伐': ['步伐', '移动', '蹬地', '启动', '回位', '方向']
        };
        const keywords = skillKeywords[skillName] || [];
        for (const ts of ex.tennis_skills) {
          if (keywords.some(k => ts.includes(k))) { bonus += 0.5; }
        }
      }
      return { ex, score: overlapCount + bonus, matchedMuscles };
    });
  }

  if (isFullBody) {
    // ========== 全身训练日：覆盖所有主要肌群，但感知技能重点 ==========
    // 基础肌群全覆盖
    const shoulderEx = pickFrom(pools.shoulder);
    if (shoulderEx) selected.push(shoulderEx);

    const pushEx = pickFrom(pools.push);
    if (pushEx) selected.push(pushEx);

    const pullEx = pickFrom(pools.pull);
    if (pullEx) selected.push(pullEx);

    const coreEx = pickFrom(pools.core);
    if (coreEx) selected.push(coreEx);

    const legEx = pickFrom(pools.legs);
    if (legEx) selected.push(legEx);

    // 根据当日技能重点，增加专项动作（不受频率影响）
    const skill = focusInfo.skill;

    if (skill === '步伐') {
      // ---- 步伐日：强制至少2个不同的agility动作 ----
      const rawAgilityPool = pools.agility || [];
      const agilityUsedInDay = [];
      const diffPriority = { [strengthLevel]: 0, beginner: 1, intermediate: 2, advanced: 3 };
      const sortedAgility = [...rawAgilityPool].sort((a, b) => {
        const pa = (diffPriority[a.difficulty] ?? 4);
        const pb = (diffPriority[b.difficulty] ?? 4);
        return pa !== pb ? pa - pb : Math.random() - 0.5;
      });
      for (const ex of sortedAgility) {
        if (!usedNames.has(ex.name_zh) && agilityUsedInDay.length < 2) {
          const picked = pickExercise([ex], strengthLevel);
          usedNames.add(ex.name_zh);
          selected.push(picked);
          agilityUsedInDay.push(ex.name_zh);
        }
      }
      console.log(`[全身-步伐专项] 已选 ${agilityUsedInDay.length} 个敏捷: [${agilityUsedInDay.join(', ')}]`);
    } else if (skill === '发球/高压' || focusInfo.focusText.includes('爆发')) {
      // 发球爆发力日：增加plyo
      const plyoEx = pickFrom(pools.plyo);
      if (plyoEx) selected.push(plyoEx);
    } else {
      // 其他技能日：增加前臂/手腕
      const wristEx = pickFrom(pools.wrist);
      if (wristEx) selected.push(wristEx);
    }

  } else {
    // ========== 分化训练日：基于 skillToMuscles 肌肉映射匹配动作 ==========
    const skill = focusInfo.skill;

    // ---- 步骤1：获取当日技能需要的目标肌肉群 ----
    const requiredMuscles = (kb.skillToMuscles[skill] || []).slice();
    // 扩充：从详细肌肉分组中获取更多关联肌肉
    const detailGroup = kb.muscleGroups[skill] || {};
    const allDetailMuscles = [
      ...(detailGroup.lowerBody || []),
      ...(detailGroup.trunk || []),
      ...(detailGroup.acceleration || []),
      ...(detailGroup.deceleration || []),
      ...(detailGroup.preparation || []),
      ...(detailGroup.primary || []),
      ...(detailGroup.stabilizer || [])
    ];
    // 去重合并到需求列表
    for (const m of allDetailMuscles) {
      if (!requiredMuscles.some(rm => m.includes(rm) || rm.includes(m))) {
        requiredMuscles.push(m);
      }
    }

    console.log(`[分化训练] day=${dayIndex + 1} | skill=${skill} | 需求肌肉=[${requiredMuscles.join(', ')}]`);

    // ---- 步骤2：对所有安全池动作按肌肉关联度打分 ----
    const scored = safePool.map(ex => {
      let overlapCount = 0;
      const matchedMuscles = [];
      for (const tm of (ex.target_muscles || [])) {
        for (const rm of requiredMuscles) {
          if (tm.includes(rm) || rm.includes(tm) || tm === rm) {
            overlapCount++;
            matchedMuscles.push(tm);
            break;
          }
        }
      }
      // tennis_skills 关键词加分
      let bonus = 0;
      if (ex.tennis_skills) {
        const skillKeywords = {
          '正手': ['正手', '击球', '推送'],
          '反手': ['反手', '切削', '控制', '稳定'],
          '发球/高压': ['发球', '高压', '过顶', '爆发', '伸展'],
          '截击': ['截击', '反应', '推挡', '下肢敏'],
          '步伐': ['步伐', '移动', '蹬地', '启动', '回位', '方向', '覆盖', '准备', '侧向']
        };
        const keywords = skillKeywords[skill] || [];
        for (const ts of ex.tennis_skills) {
          if (keywords.some(k => ts.includes(k))) bonus += 0.5;
        }
      }
      // 同 category 加分（如步伐日的agility类别）
      if (skill === '步伐' && ex.category === 'agility') bonus += 2;
      if (skill === '发球/高压' && ex.category === 'power') bonus += 1;
      if ((skill === '正手' || skill === '截击') && ex.category === 'strength' &&
          ex.target_muscles.some(m => m.includes('胸') || m.includes('三头'))) bonus += 1;
      if (skill === '反手' &&
          ex.target_muscles.some(m => m.includes('肩') || m.includes('背') || m.includes('后'))) bonus += 1;

      return { ex, score: overlapCount + bonus, matchedMuscles };
    });

    // 按分数降序排列，同分随机打乱增加多样性
    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return Math.random() - 0.5;
    });

    // 输出TOP10打分供调试
    const topScores = scored.slice(0, 8).map(s => `${s.ex.name_zh}(${s.score.toFixed(1)})`);
    console.log(`[分化训练] TOP动作得分: [${topScores.join(', ')}]`);

    // ---- 步骤3：从高到低选取动作，确保相关性和多样性 ----

    // 步伐专项：强制至少2个不同agility动作（agility池不受难度过滤限制）
    if (skill === '步伐') {
      const rawAgilityPool = pools.agility || [];  // 来自原始池，全部5个agility都在
      const agilityUsedInDay = [];

      // 按难度偏好排序：优先选匹配用户水平的，但不排除其他难度
      const diffPriority = { [strengthLevel]: 0, beginner: 1, intermediate: 2, advanced: 3 };
      const sortedAgility = [...rawAgilityPool].sort((a, b) => {
        const pa = (diffPriority[a.difficulty] ?? 4);
        const pb = (diffPriority[b.difficulty] ?? 4);
        if (pa !== pb) return pa - pb;
        return Math.random() - 0.5; // 同难度随机打乱增加多样性
      });

      console.log(`[步伐专项] day=${dayIndex+1} 原始agility池=${rawAgilityPool.length}个 ` +
        `[${rawAgilityPool.map(e=>e.name_zh+'('+e.difficulty+')').join(', ')}]`);

      // 强制选取至少2个不同的agility动作
      for (const ex of sortedAgility) {
        if (!usedNames.has(ex.name_zh) && agilityUsedInDay.length < 2) {
          const picked = pickExercise([ex], strengthLevel);
          usedNames.add(ex.name_zh);
          selected.push(picked);
          agilityUsedInDay.push(ex.name_zh);
        }
      }
      // 兜底（理论上不会触发，因为原始池有5个）
      if (agilityUsedInDay.length < 2) {
        for (const ex of rawAgilityPool) {
          if (!usedNames.has(ex.name_zh) && agilityUsedInDay.length < 2) {
            const picked = pickExercise([ex], strengthLevel);
            usedNames.add(ex.name_zh);
            selected.push(picked);
            agilityUsedInDay.push(ex.name_zh);
          }
        }
      }
      console.log(`[步伐专项] day=${dayIndex+1} 已选 ${agilityUsedInDay.length} 个敏捷动作: [${agilityUsedInDay.join(', ')}]`);

      // 补充腿部/下肢/核心动作（从高分中选，跳过已用的）
      for (const s of scored) {
        if (selected.length >= 5) break;
        if (usedNames.has(s.ex.name_zh)) continue;
        // 优先选腿部>核心>其他
        const isLeg = s.ex.target_muscles.some(m =>
          m.includes('股') || m.includes('臀') || m.includes('腓肠') || m.includes('腘绳') || m.includes('小腿'));
        const isCore = s.ex.target_muscles.some(m =>
          m.includes('腹') || m.includes('竖脊') || m.includes('核心'));
        if (isLeg || isCore || s.score >= 1) {
          usedNames.add(s.ex.name_zh);
          selected.push(mapRawExercise(s.ex, strengthLevel));
        }
      }
    } else {
      // ---- 其他技能：按分数选动作，保证至少60%是高相关动作(score>=1) ----
      let highRelevanceCount = 0;
      const minTotal = 4;   // 至少4个动作
      const minHighRel = 3;  // 至少3个高相关性

      for (const s of scored) {
        if (selected.length >= minTotal && highRelevanceCount >= minHighRel) {
          // 已满足最低要求，继续补充到5-6个
          if (selected.length >= 6) break;
        }
        if (usedNames.has(s.ex.name_zh)) continue;
        if (selected.some(sel => sel.name === s.ex.name_zh)) continue;

        usedNames.add(s.ex.name_zh);
        selected.push(mapRawExercise(s.ex, strengthLevel));

        if (s.score >= 1) highRelevanceCount++;
      }
    }

    // 每次分化训练都加核心（如果还没有的话）
    if (!selected.some(s => (s.targetMuscles || []).some(m => m.includes('腹') || m.includes('竖脊') || m.includes('核心')))) {
      const coreEx = pickFrom(pools.core);
      if (coreEx) selected.push(coreEx);
    }

    // 肩部稳定性（网球专项基础，如果还没有）
    if (!selected.some(s => (s.targetMuscles || []).some(m =>
      m.includes('肩') || m.includes('三角') || m.includes('棘下') || m.includes('外旋')))) {
      const shoulderEx = pickFrom(pools.shoulder);
      if (shoulderEx) selected.push(shoulderEx);
    }
  }

  // ========== 兜底：如果不足3个动作，从剩余动作中补充 ==========
  if (selected.length < 3) {
    const allRemaining = strengthExercises.filter(ex => !usedNames.has(ex.name_zh));
    // 按类别顺序补充
    const fallbackOrder = [pools.agility, pools.shoulder, pools.push, pools.pull, pools.core, pools.legs, pools.wrist, pools.plyo];
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

  // ========== 按训练水平限制动作数量 ==========
  // 初学者动作少而精（≤4），中级/高级适当增加（≤6）
  const maxExercises = strengthLevel === 'beginner' ? 4 : 6;
  if (selected.length > maxExercises) {
    // 截断策略：保留优先级高的动作
    // 优先级：agility步伐(强制) > 核心/肩部稳定性(基础) > 先选的(高相关性)
    const priorityScore = (sel) => {
      let score = 0;
      // agility 类最高优先（技能专项强制动作）
      if ((sel.targetMuscles || []).length === 0 && sel.nameEn) {
        // mapRawExercise 后的目标肌肉可能为空，通过 name 判断
      }
      // 通过原始名称判断是否为 agility（从 knowledge-base 中 category=agility 的特征）
      const agilityKeywords = ['侧滑步', '交叉步', '小碎步', '防守滑步', 'T型跑', '侧向', 'crossover', 'shuffle', 'quick feet', 'defensive', 'T-drill'];
      if (agilityKeywords.some(k => (sel.name || '').includes(k) || (sel.nameEn || '').toLowerCase().includes(k.toLowerCase()))) {
        score += 100;
      }
      // 核心和肩部稳定性次之
      if ((sel.targetMuscles || []).some(m => m.includes('腹') || m.includes('竖脊') || m.includes('核心'))) score += 50;
      if ((sel.targetMuscles || []).some(m => m.includes('肩') || m.includes('三角') || m.includes('棘下') || m.includes('外旋'))) score += 40;
      // 在 selected 数组中越靠前（越先被选中）分越高
      score += (selected.length - selected.indexOf(sel));
      return score;
    };

    // 按优先级排序后截断
    const sorted = [...selected].sort((a, b) => priorityScore(b) - priorityScore(a));
    const truncated = sorted.slice(0, maxExercises);
    console.log(`[动作数量控制] 等级=${strengthLevel}, 上限=${maxExercises}, 原始=${selected.length}个 → 截断为${truncated.length}个 ` +
      `[${truncated.map(s => s.name).join(', ')}]`);
    selected.length = 0;
    selected.push(...truncated);
  }

  return selected;
}

// 将原始知识库对象映射为渲染格式（name/nameEn等）
function mapRawExercise(ex, strengthLevel) {
  const isAgility = ex.category === 'agility';

  let setsReps;
  const levelSetsReps = ex.sets_reps?.[strengthLevel] || {};
  const baseSetsReps = ex.sets_reps?.beginner || { sets: 2, reps: 12, rest_sec: 60 };
  const advSetsReps = ex.sets_reps?.advanced || {};

  if (isAgility) {
    // ⚠️ 步伐敏捷类动作：区分时间型 vs 次数型
    // 时间型动作（有duration_sec）：reps字段无意义(都是1)，应展示时长
    if (levelSetsReps.duration_sec || advSetsReps.duration_sec) {
      const duration = (levelSetsReps.duration_sec || advSetsReps.duration_sec || baseSetsReps.duration_sec || 20);
      setsReps = { sets: levelSetsReps.sets || baseSetsReps.sets, reps: duration + '秒', rest_sec: levelSetsReps.rest_sec || baseSetsReps.rest_sec };
    } else if (strengthLevel === 'beginner') {
      // 次数型 + 初学者：只减组数(1组)，取高等级次数
      const intSetsReps = ex.sets_reps?.intermediate || advSetsReps;
      setsReps = { sets: 1, reps: (advSetsReps.reps || intSetsReps.reps || levelSetsReps.reps || baseSetsReps.reps), rest_sec: levelSetsReps.rest_sec || baseSetsReps.rest_sec };
    } else {
      setsReps = { ...levelSetsReps, ...baseSetsReps }; // 正常按等级取
    }
  } else {
    setsReps = ex.sets_reps?.[strengthLevel] || baseSetsReps;
  }
  return {
    name: ex.name_zh,
    nameEn: ex.name_en,
    sets: setsReps.sets,
    reps: typeof setsReps.reps === 'string' ? setsReps.reps : setsReps.reps,
    weight: getWeightSuggestion(ex, strengthLevel),
    restSec: setsReps.rest_sec,
    tips: (ex.execution_tips || []).slice(0, 3),
    commonMistakes: ex.common_mistakes || [],
    alternatives: ex.alternatives || [],
    targetMuscles: ex.target_muscles || []
  };
}

function pickExercise(exercises, level) {
  const ex = exercises[Math.floor(Math.random() * exercises.length)];
  const isAgility = ex.category === 'agility';

  let setsReps;
  const levelSetsReps = ex.sets_reps?.[level] || {};
  const baseSetsReps = ex.sets_reps?.beginner || { sets: 2, reps: 12, rest_sec: 60 };
  const advSetsReps = ex.sets_reps?.advanced || {};

  if (isAgility) {
    // 步伐敏捷类：区分时间型 vs 次数型
    if (levelSetsReps.duration_sec || advSetsReps.duration_sec) {
      // 时间型动作：展示时长而不是无意义的 reps=1
      const duration = (levelSetsReps.duration_sec || advSetsReps.duration_sec || baseSetsReps.duration_sec || 20);
      setsReps = { sets: levelSetsReps.sets || baseSetsReps.sets, reps: duration + '秒', rest_sec: levelSetsReps.rest_sec || baseSetsReps.rest_sec };
    } else if (level === 'beginner') {
      // 次数型 + 初学者：1组 × 高等级次数
      const intSetsReps = ex.sets_reps?.intermediate || advSetsReps;
      setsReps = { sets: 1, reps: (advSetsReps.reps || intSetsReps.reps || levelSetsReps.reps || baseSetsReps.reps), rest_sec: levelSetsReps.rest_sec || baseSetsReps.rest_sec };
    } else {
      setsReps = { ...levelSetsReps, ...baseSetsReps }; // 正常按等级取
    }
  } else {
    setsReps = ex.sets_reps?.[level] || baseSetsReps;
  }

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
  const isMultiWeek = days.length > 7;

  if (!isMultiWeek) {
    // 7天计划：原样渲染卡片
    container.innerHTML = days.map(day => renderDayCard(day)).join('');
    return;
  }

  // 28天计划：每周一张横向表格
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  container.innerHTML = weeks.map((weekDays, weekIdx) => {
    return renderWeekTable(weekDays, weekIdx);
  }).join('');
}

// 渲染单周：行式布局（每行=一天，动作卡片横向排列）
function renderWeekTable(weekDays, weekIdx) {
  const weekNum = weekIdx + 1;
  const dayNums = weekDays.map(d => d.dayIndex + 1);
  const DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

  // 每天一行：左侧标签 + 右侧内容（动作卡片横向排列）
  const dayRows = weekDays.map((day, i) => {
    const dayNum = dayNums[i];
    const dayLabel = DAY_LABELS[i];
    const isRest = day.isRestDay;

    if (isRest) {
      return `
        <div class="week-row week-row--rest">
          <div class="week-row__label">
            <div class="week-row__num">第${dayNum}天</div>
            <div class="week-row__weekday">${dayLabel}</div>
          </div>
          <div class="week-row__content week-row__content--rest">
            <span class="rest-badge">😴 休息日</span>
            ${(day.coolDown || []).length > 0 ? `<span class="rest-tips">${(day.coolDown || []).join(' / ')}</span>` : ''}
          </div>
        </div>`;
    }

    // 热身标签（紧凑内联）
    const warmupTags = (day.warmUp || []).map(w =>
      `<span class="inline-tag inline-tag--warmup">${w}</span>`
    ).join('');

    // 动作卡片（横向排列，完整内容）
    const exCards = (day.exercises || []).map(ex => `
      <div class="ex-card">
        <div class="ex-card__head">
          <span class="ex-card__name">${ex.name}</span>
          <span class="ex-card__sets">${ex.sets}×${ex.reps}</span>
        </div>
        ${ex.nameEn ? `<div class="ex-card__en">${ex.nameEn}</div>` : ''}
        ${(ex.targetMuscles || []).length > 0 ? `
        <div class="ex-card__muscles">${(ex.targetMuscles || []).map(m => `<span class="muscle-tag muscle-tag--sm">${m}</span>`).join('')}</div>` : ''}
        ${ex.tips && ex.tips.length > 0 ? `<div class="ex-card__tips">💡 ${ex.tips.join('；')}</div>` : ''}
        ${ex.commonMistakes && ex.commonMistakes.length > 0 ? `<div class="ex-card__mistakes">⚠️ ${ex.commonMistakes.join('；')}</div>` : ''}
        ${ex.alternatives && ex.alternatives.length > 0 ? `<div class="ex-card__alt">🔄 ${ex.alternatives.join('/')}</div>` : ''}
      </div>
    `).join('');

    // 放松标签
    const cooldownTags = (day.coolDown || []).map(w =>
      `<span class="inline-tag inline-tag--cooldown">${w}</span>`
    ).join('');

    return `
      <div class="week-row">
        <div class="week-row__label">
          <div class="week-row__num">第${dayNum}天</div>
          <div class="week-row__weekday">${dayLabel}</div>
          <div class="week-row__focus">${day.focus || ''}</div>
          <div class="week-row__dur">${day.durationMin}分钟</div>
        </div>
        <div class="week-row__content">
          ${warmupTags ? `<div class="week-row__section week-row__section--warmup">${warmupTags}</div>` : ''}
          <div class="week-row__exercises">${exCards}</div>
          ${cooldownTags ? `<div class="week-row__section week-row__section--cooldown">${cooldownTags}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="week-table-wrap" id="week-table-${weekIdx}">
      <div class="week-table-header">
        <span class="week-table-title">📅 第${weekNum}周</span>
        <span class="week-table-range">第${dayNums[0]}-${dayNums[dayNums.length-1]}天</span>
      </div>
      <div class="week-body">
        ${dayRows}
      </div>
    </div>
  `;
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

// 生成所有周全部展开的 days HTML（用于导出/打印）—— 同样使用表格布局
function generateExpandedDaysHTML(days) {
  const isMultiWeek = days.length > 7;
  if (!isMultiWeek) {
    return days.map(day => renderDayCard(day)).join('');
  }
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks.map((weekDays, weekIdx) => renderWeekTable(weekDays, weekIdx)).join('');
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
    /* 周行式布局样式（导出HTML用） */
    .week-table-wrap { margin-bottom: 2rem; border: 1.5px solid var(--border); border-radius: 10px; overflow: hidden; }
    .week-table-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%); color: white; }
    .week-table-title { font-weight: 700; font-size: 0.95rem; }
    .week-table-range { font-size: 0.8rem; font-weight: 400; opacity: 0.85; }
    .week-row { display: flex; align-items: stretch; border-bottom: 1px solid #e8eaed; min-height: 60px; }
    .week-row:last-child { border-bottom: none; }
    .week-row--rest { background: #fafbfc; }
    .week-row__label { width: 90px; min-width: 90px; flex-shrink: 0; padding: 10px 8px; background: linear-gradient(180deg, #f0f6ff 0%, #e8f0fe 100%); border-right: 1.5px solid #d0e2ff; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1px; }
    .week-row--rest .week-row__label { background: linear-gradient(180deg, #f5f5f5 0%, #eeeeee 100%); border-right-color: #ddd; }
    .week-row__num { font-size: 0.78rem; font-weight: 800; color: #0d47a1; line-height: 1.2; }
    .week-row__weekday { font-size: 0.65rem; color: #5f6368; }
    .week-row__focus { font-size: 0.62rem; font-weight: 600; color: white; background: #1a73e8; padding: 1px 7px; border-radius: 999px; margin-top: 3px; }
    .week-row__dur { font-size: 0.58rem; color: #5f6368; }
    .week-row__content { flex: 1; padding: 8px 12px; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
    .week-row__content--rest { flex-direction: row; align-items: center; gap: 10px; justify-content: center; }
    .week-row__section { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
    .inline-tag { display: inline-flex; align-items: center; font-size: 0.62rem; padding: 1px 7px; border-radius: 999px; white-space: nowrap; line-height: 1.7; }
    .inline-tag--warmup { background: #fff3e0; color: #e65100; border: 1px solid #ffe0b2; }
    .inline-tag--cooldown { background: #e8f5e9; color: #2e7d32; border: 1px solid #c8e6c9; }
    .week-row__exercises { display: flex; flex-wrap: wrap; gap: 8px; align-items: stretch; }
    .ex-card { border: 1.5px solid #d0dbec; border-radius: 8px; padding: 7px 10px; background: linear-gradient(135deg, #ffffff 0%, #f8fbff 100%); min-width: 170px; max-width: 260px; flex: 1 1 170px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .ex-card__head { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-bottom: 3px; }
    .ex-card__name { font-size: 0.76rem; font-weight: 700; color: #3c4043; line-height: 1.3; }
    .ex-card__sets { font-size: 0.66rem; font-weight: 700; color: white; background: #1a73e8; padding: 1px 7px; border-radius: 999px; white-space: nowrap; flex-shrink: 0; }
    .ex-card__en { font-size: 0.6rem; color: #5f6368; font-style: italic; margin-bottom: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ex-card__muscles { display: flex; flex-wrap: wrap; gap: 2px; margin-bottom: 3px; }
    .muscle-tag--sm { font-size: 0.55rem !important; padding: 0 5px !important; height: 16px !important; line-height: 16px !important; }
    .ex-card__tips { font-size: 0.63rem; color: #2e7d32; background: #f1f8e9; padding: 2px 6px; border-radius: 4px; margin-bottom: 2px; line-height: 1.45; }
    .ex-card__mistakes { font-size: 0.63rem; color: #e65100; background: #fff3e0; padding: 2px 6px; border-radius: 4px; margin-bottom: 2px; line-height: 1.45; }
    .ex-card__alt { font-size: 0.6rem; color: #5f6368; line-height: 1.4; }
    .rest-badge { font-size: 0.85rem; font-weight: 600; color: #9aa0a6; }
    .rest-tips { font-size: 0.68rem; color: #bdc1c6; }
    @page { margin: 1cm 1cm; size: A4 landscape; }
    @media print {
      .navbar { display: none; }
      .week-table-wrap { page-break-after: always; break-after: page; }
      .week-table-wrap:last-child { page-break-after: avoid; break-after: avoid; }
      .week-table-header { background: #1a73e8 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .week-row { break-inside: avoid; }
      .week-row__label { width: 70px; min-width: 70px; padding: 6px 4px; }
      .ex-card { min-width: 140px; max-width: 200px; flex: 1 1 140px; padding: 5px 7px; }
    }
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
