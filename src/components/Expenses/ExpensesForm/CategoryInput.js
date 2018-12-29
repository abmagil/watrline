import React from 'react';

export const CategoryInput = ({ parentPath, subcategory, value, updateFn }) => (<label>
  {`${subcategory}`}
  <input className='spending-input' type='number' value={value} onChange={(e) => updateFn({ path: `${parentPath}.${subcategory}`, e })} />
</label>);
