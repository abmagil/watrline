import entries from 'lodash/entries';

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

/**
 * @returns {
 *  'entertainment.games': 10,
 *  'entertainment.sports': 20,
 *  'entertainment.other': 100,
 *  'investing.other': 200
 * }
 */
export default function() {
  let built = {};
  entries(categoryRelationships).map(([category, subcats], j) => {
    subcats.map((subcat, i) => {
      built[`${category}.${subcat}`] = Math.floor((j+1) * ((i+1) * Math.random() * 10) * 20);
    });
  });
  return built;
}
