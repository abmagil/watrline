import { reduce } from 'lodash';

// tslint:disable-next-line:no-any
function isNumeric(n: any): n is number {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// tslint:disable-next-line:no-any
function isArray(arg: any): arg is Array<any> {
  return Object.prototype.toString.call( arg ) === '[object Array]';
}

export default function cdf(arr: Array<number>): Array<number> {
  if (!isArray(arr)) { return []; }

  const builder = (acc: Array<number>, n: number): Array<number> => {
    if (!isNumeric(n)) { throw new Error('cdf requires an array of numbers'); }

    const lastNum = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(Number(lastNum) + Number(n));
    return acc;
  };
  return reduce(arr, builder, []);
}
