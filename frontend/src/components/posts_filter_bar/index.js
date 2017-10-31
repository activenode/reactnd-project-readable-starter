import React from 'react';
import { Dropdown } from 'semantic-ui-react';


function PostsFilterBar({activeFilter = 'votes_desc'}) {
  const availableFilters = [
    {label: 'Highest votes on top', name: 'votes_desc'},
    {label: 'Lowest votes on top', name: 'votes_asc'}
  ];

  return (
    <Dropdown text={availableFilters.filter(({name}) => name === activeFilter)[0].label} icon='filter' floating labeled button className='icon' style={{marginBottom: '1rem'}}>
      <Dropdown.Menu>
        <Dropdown.Header content='Filter by' />
        {availableFilters.map(filterItem => (
          <Dropdown.Item key={filterItem.name} style={{fontWeight: filterItem.name === activeFilter ? 'bold' : ''}}>
            {filterItem.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default PostsFilterBar;