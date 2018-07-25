import reduce from 'lodash/reduce';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isArray(arg) {
  return Object.prototype.toString.call( arg ) === '[object Array]';
}

export default function cdf(arr) {
  if (!isArray(arr)) { return []; }

  const builder = function(acc, n) {
    if (!isNumeric(n)) { throw new Error('cdf requires an array of numbers'); }

    let lastNum = acc.length > 0 ? acc[acc.length - 1] : 0;
    acc.push(Number(lastNum) + Number(n));
    return acc;
  };
  return reduce(arr, builder, []);
}
