import React from 'react';
import { Dropdown } from 'semantic-ui-react';


function PostsFilterBar({activeFilter = 'votes_desc'}) {
  const availableFilters = [
    {label: 'Votes descending', name: 'votes_desc'},
    {label: 'Votes ascending', name: 'votes_asc'}
  ];

  return (
    <Dropdown text='Filter' icon='filter' floating labeled button className='icon' style={{marginBottom: '1rem'}}>
      <Dropdown.Menu>
        <Dropdown.Header content='Filter by' />
        {availableFilters.map(filterItem => (
          <Dropdown.Item key={filterItem.name} style={{fontWeight: filterItem.name === activeFilter ? 'bold' : ''}}>Votes descending</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PostsFilterBar;