export const cutAddress = (str: string) => {
  const startIndex = 5;
  const endIndex = 38;

  // 使用字符串拼接和 slice 方法截取字符串，并在中间加上 "..."
  const result = str.slice(0, startIndex) + "..." + str.slice(endIndex);
  return result;
};
export const cutHash = (str: string) => {
  const startIndex = 5;
  const endIndex = 62;

  // 使用字符串拼接和 slice 方法截取字符串，并在中间加上 "..."
  const result = str.slice(0, startIndex) + "..." + str.slice(endIndex);
  return result;
};

export function formatTimestamp(timestamp: any) {
  const date = new Date(timestamp * 1000); // 将秒数转换为毫秒

  // 将时间转换为东八区时间
  const options = { timeZone: "Asia/Shanghai" };
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}
