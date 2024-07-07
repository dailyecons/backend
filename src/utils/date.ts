const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function currentDate() {
  const date = new Date();
  return `${date.getDate()} ${monthMap[date.getMonth()]} ${date.getFullYear()}`;
}
