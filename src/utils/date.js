export const date = new Date();

export const convertDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date
    .getHours()
    .toString()
    .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date
    .getSeconds()
    .toString()
    .padStart(2, 0)}`;
};
