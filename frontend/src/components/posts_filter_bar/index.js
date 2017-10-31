import React from 'react';
import { Dropdown } from 'semantic-ui-react';


function PostsOrderBar({activeFilter = 'votes_desc', onChange}) {
  const availableFilters = [
    {text: 'Highest votes on top', key: 'votes_desc', value: 'votes_desc'},
    {text: 'Lowest votes on top', key: 'votes_asc', value: 'votes_asc'}
  ];

  return (
    <div>
      Order by {' '}
      <Dropdown
        inline
        options={availableFilters}
        defaultValue='o'
        onChange={()=>{
          console.log('k');
        }} />
    </div>
  );
}

export default PostsOrderBar;