import {
  flatToNested,
  nestedToFlat
} from './categories';

describe('flatToNested', () => {
  describe('for the simple case', () => {
    it('return a simple nested object', () => {
      const flatStructure = {
        'a': 10,
        'b': 20,
      };

      expect(flatToNested(flatStructure)).toEqual({ a: 10, b: 10 });
    });
  });
  describe('for the complex case', () => {
    const nestedStructure = {
      'a.b': 20,
      'a.c': 30,
      'd.e': 40,
      'f': 50,
    };

    expect(flatToNested(nestedStructure)).toEqual({
      a: {
        b: 20,
        c: 30,
      },
      d: {
        e: 40,
      },
      f: 50,
    });
  });
});

describe('nestedToFlat', () => {
  describe('in the simple case', () => {
    it('should flatten an object', () => {
      const simpleObject = { a: 10, b: 10 };

      expect(nestedToFlat(simpleObject)).toEqual({
        a: 10,
        b: 10,
      });
    });
  });
  describe('in the complex case', () => {
    it('should flatten the object', () => {
      const complexObject = {
        a: {
          b: 20,
          c: 30,
        },
        d: {
          e: 40,
        },
        f: 50,
      };

      expect(nestedToFlat(complexObject)).toEqual({
        'a.b': 20,
        'a.c': 30,
        'd.e': 40,
        'f': 50,
      });
    });
  });
});
