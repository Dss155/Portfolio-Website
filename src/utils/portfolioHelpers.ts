
export const getPortfolioValue = (data: any[], section: string, field: string, defaultValue: string = '') => {
  const item = data?.find(item => item.section === section && item.field === field);
  return item?.value || defaultValue;
};

export const groupSkillsByCategory = (skills: any[]) => {
  return skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>) || {};
};

export const getContactByType = (contacts: any[], type: string) => {
  return contacts?.find(contact => contact.type === type);
};
