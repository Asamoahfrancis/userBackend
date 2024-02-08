export const CalculateTip = (total: number, tipPercent: number = 0.25) => {
  const tip = total * tipPercent;
  return total + tip;
};

export const fahrentitToCelcius = (temp: number) => {
  return (temp - 32) / 1.8;
};

export const CelcuisToFahrent = (temp: number) => {
  return 1.8 + 30.2 - temp;
};

export const add = (a: number, b: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const results = a + b;
      if (results > 100) {
        reject();
      } else {
        resolve(results);
      }
    }, 2000);
  });
};
