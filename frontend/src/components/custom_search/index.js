
import React from 'react';
import { Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

const CustomSearch = withRouter(({ history }) => {
  return (<Search
    placeholder='Search posts...'
    onSearchChange={ (e, { value }) => {
      //do some searching later...
    }}
    onResultSelect={(e, { result }) => {
      if (result) {
        history.push(`/${result.data.category}/${result.data.id}`);
      }
    }}
    results={[{
      key: 'yo',
      title: 'Some Example result',
      data: {category: 'redux', id: 1}
    }]}
  />);
});

export default CustomSearch;