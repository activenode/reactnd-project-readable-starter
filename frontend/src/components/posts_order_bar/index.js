import './posts_order_bar.css';
import React from 'react';
import {Dropdown} from 'semantic-ui-react';


function PostsOrderBar({values, defaultValue, onChange}) {
  return (
    <div className='posts_order_bar'>
      Order by {' '}
      <Dropdown
        inline
        options={values}
        defaultValue={defaultValue}
        onChange={(e, {value})=>{
          onChange(value);
       }} />
    </div>
  );
}

export default PostsOrderBar;