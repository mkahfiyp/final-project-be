export const timeRange = (
  range: "7d" | "month" | "year" | "all" | undefined,
  callback?: (value: {
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => any
) => {
  const now = new Date();
  let startDate: Date | undefined;
  let endDate: Date | undefined = now;

  switch (range) {
    case "7d":
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "all":
    default:
      startDate = undefined;
      endDate = undefined;
  }

  const value = { startDate, endDate };

  // panggil callback jika ada biar kayak state react
  if (callback) callback(value);

  return value; // tetap return value untuk destructuring
};

export const filterTimeRange = (
  range: "7d" | "month" | "year" | "all" | undefined,
  createdAtDate: Date
) => {
  const now = new Date();
  let startDate: Date | undefined;
  let endDate: Date | undefined = now;

  switch (range) {
    case "7d":
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
      break;
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    case "all":
    default:
      startDate = undefined;
      endDate = undefined;
  }
  // filter date
  const createdAt = new Date(createdAtDate);
  if (startDate && createdAt < startDate) return false;
  if (endDate && createdAt > endDate) return false;
};
