module.exports = function hasAvatar(resume) {
  return resume.avatar && !resume.avatar.blank;
};
