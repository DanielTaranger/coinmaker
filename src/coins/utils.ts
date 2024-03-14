export function calcPercent(number: number, maxValue: number) {
  if (number < 0 || maxValue <= 0) {
    throw new Error("Both number and maxValue must be positive numbers");
  }

  return (number / maxValue) * 100;
}

export function calcLogPercent(number: number, maxValue: number) {
  let base = 10;
  if (number < 0 || maxValue <= 0) {
    throw new Error("Error");
  }
  const logNumber = Math.log(number) / Math.log(base);
  const logMaxValue = Math.log(maxValue) / Math.log(base);

  return (logNumber / logMaxValue) * 100;
}
