import cdf from './cdf';

describe('CDF function', () => {
  it('accumulates values from an array into a new array of the same length', () => {
    expect(cdf([1,1,1,1])).toEqual([1, 2, 3, 4]);
  });

  it('coerces numeric array elements to numbers', () => {
    expect(cdf(['1.5', 1, 1.5, [1]])).toEqual([1.5, 2.5, 4, 5]);
  });

  it('errors on non-numeric array elements', () => {
    expect(() => cdf([{a: 1}])).toThrow(/cdf requires an array of numbers/, 'handles objects');
    expect(() => cdf(["a"])).toThrow(/cdf requires an array of numbers/, 'handles non-numeric strings');
    expect(() => cdf(["a1"])).toThrow(/cdf requires an array of numbers/, 'handles non-numeric strings');
    expect(() => cdf(["1a"])).toThrow(/cdf requires an array of numbers/, 'handles non-numeric strings');
    expect(() => cdf([true])).toThrow(/cdf requires an array of numbers/, 'handles true');
    expect(() => cdf([false])).toThrow(/cdf requires an array of numbers/, 'handles false');
    expect(() => cdf([["a"]])).toThrow(/cdf requires an array of numbers/, 'handles arrays of arrays');
  });

  it('returns an empty array when passed a non-array argument', () => {
    expect(cdf({})).toEqual([]);
    expect(cdf(true)).toEqual([]);
    expect(cdf(false)).toEqual([]);
    expect(cdf(null)).toEqual([]);
    expect(cdf(undefined)).toEqual([]);
  });

  it('returns an empty array when passed an empty array', () => {
    expect(cdf([])).toEqual([]);
  })
});
