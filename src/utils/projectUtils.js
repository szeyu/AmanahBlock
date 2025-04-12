// Get status color based on project status
export const getStatusColor = (status) => {
  switch(status) {
    case "Completed": return "green";
    case "In Progress": return "blue";
    case "Delayed": return "yellow";
    case "Failed": return "red";
    default: return "gray";
  }
};

// Calculate milestone progress percentage
export const calculateMilestoneProgress = (milestones) => {
  const completed = milestones.filter(m => m.status === "Completed").length;
  return Math.round((completed / milestones.length) * 100);
};

// Filter and sort projects based on filters
export const filterAndSortProjects = (projects, filters) => {
  return projects.filter(project => {
    if (filters.category && project.category !== filters.category) {
      return false;
    }
    if (filters.status && project.status !== filters.status) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'progress') {
      return b.progress - a.progress;
    } else if (filters.sortBy === 'deadline') {
      return new Date(a.endDate) - new Date(b.endDate);
    } else if (filters.sortBy === 'amount') {
      return b.raisedAmount - a.raisedAmount;
    }
    return 0;
  });
}; 