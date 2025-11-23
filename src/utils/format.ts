export const translateStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "на модерации";
    case "approved":
      return "одобрено";
    case "rejected":
      return "отклонено";
    case "draft":
      return "черновик";
    default:
      return status;
  }
};

export const translatePriority = (priority: string) => {
  switch (priority) {
    case "normal":
      return "обычный";
    case "urgent":
      return "срочный";
    default:
      return priority;
  }
};

export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
};