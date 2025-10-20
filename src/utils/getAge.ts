export const getAge = (birthDate: Date) => {
  const today = new Date();
  const dob = new Date(birthDate);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const getAgeAtApply = (birthDate: Date, createdAtApplicant: Date) => {
  let age = createdAtApplicant.getFullYear() - birthDate.getFullYear();
  const m = createdAtApplicant.getMonth() - birthDate.getMonth();
  if (
    m < 0 ||
    (m === 0 && createdAtApplicant.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
