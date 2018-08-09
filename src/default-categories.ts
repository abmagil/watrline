import { entries } from 'lodash';

const categoryRelationships = {
  entertainment: [
    'games',
    'movies',
    'sports',
    'other entertainment',
  ],
  investing: [
    'retirement',
    'betterment',
    'other investments',
  ],
  debts: [
    'car loan',
    'student loans',
    'credit card payment',
  ],
};

export type Categories = ObjectOf<number>;

/**
 * @returns {
 *  'entertainment.games': 10,
 *  'entertainment.sports': 20,
 *  'entertainment.other': 100,
 *  'investing.other': 200
 * }
 */
const categoryBuilder = (): Categories => {
  // tslint:disable-next-line:prefer-const
  let built: ObjectOf<number> = {};
  entries(categoryRelationships).map(([category, subcats], j) => {
    subcats.map((subcat, i) => {
      built[`${category}.${subcat}`] = Math.floor((j+1) * ((i+1) * Math.random() * 10) * 20);
    });
  });
  return built;
}

export default categoryBuilder;
