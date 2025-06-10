export const formatSkillData = (skills) => {
  return skills.map(skill => ({
    skill: skill.skill || 'Unknown Skill',
    course: skill.course || '#',
    level: skill.level || 'Beginner',
    importance: skill.importance || 'This skill is important for your career development.'
  }));
};

export const sortSkillsByLevel = (skills) => {
  const levelOrder = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
  return [...skills].sort((a, b) => (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0));
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};