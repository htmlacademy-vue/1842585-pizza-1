export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
export const getSum = (object) => {
  const options = Object.keys(object);
  let sum = 0,
    multiplier = 0,
    itemSum = 0,
    count = null;
  options.forEach((key) => {
    const option = object[key];
    if (option instanceof Array) {
      itemSum = option.reduce((prevSum, item) => {
        return (prevSum += item.count * item.price);
      }, itemSum);
    } else if (option && option.price) {
      sum += option.price;
    } else if (option && option.multiplier) {
      multiplier = option.multiplier;
    } else if (key === "count") {
      count = option;
    }
  });
  sum = itemSum ? (sum + itemSum) * multiplier : 0;
  sum = count === null ? sum : sum * count;
  return sum;
};
