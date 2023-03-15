import { calculateDuration, calculateEnergy, calculatePower } from "../src/utils/calculations";

describe('calculateDuration', () => {
  it('should calculate the duration correctly when given power and energy', () => {
    expect(calculateDuration(1, 0.5)).toEqual(30);
    expect(calculateDuration(2, 2)).toEqual(60);
    expect(calculateDuration(3, 1.5)).toEqual(30);
  });

});

describe('calculatePower', () => {
  it('should calculate the power correctly when given duration and energy', () => {
    expect(calculatePower(1.2, 2)).toEqual(100);
    expect(calculatePower(0.45, 1.5)).toEqual(200);
    expect(calculatePower(0.9, 0.75)).toEqual(50);
  });
});

describe('calculateEnergy', () => {
  it('should calculate the energy correctly when given duration and power', () => {
    expect(calculateEnergy(3, 1.5, 3)).toEqual(0.075);
    expect(calculateEnergy(3.5, 2, 4)).toEqual(0.1167);
    expect(calculateEnergy(4, 2.7, 2)).toEqual(0.18);
  });
});
