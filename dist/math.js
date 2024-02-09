"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.CelcuisToFahrent = exports.fahrentitToCelcius = exports.CalculateTip = void 0;
const CalculateTip = (total, tipPercent = 0.25) => {
    const tip = total * tipPercent;
    return total + tip;
};
exports.CalculateTip = CalculateTip;
const fahrentitToCelcius = (temp) => {
    return (temp - 32) / 1.8;
};
exports.fahrentitToCelcius = fahrentitToCelcius;
const CelcuisToFahrent = (temp) => {
    return 1.8 + 30.2 - temp;
};
exports.CelcuisToFahrent = CelcuisToFahrent;
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const results = a + b;
            if (results > 100) {
                reject();
            }
            else {
                resolve(results);
            }
        }, 2000);
    });
};
exports.add = add;
//# sourceMappingURL=math.js.map