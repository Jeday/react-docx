module.exports = function filterResumeData(resume) {
  return {
    ...resume,
    hobbies: resume.hobbies?.filter((item) => item.hobby) ?? [],
    languages: resume.languages?.filter((item) => item.language) ?? [],
    skills: resume.skills?.filter((item) => item.skill) ?? [],
    socialProfiles: resume.socialProfiles?.filter((item) => item.label) ?? [],
  };
};
