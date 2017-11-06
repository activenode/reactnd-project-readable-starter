
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import debounce from 'debounce';


class CustomPostSearch extends Component {
  state = {
    searchResults: [],
    searchValue: ''
  };

  debouncedSearch = debounce(()=>{
    const source = this.props.posts || [];
    const searchTerms = this.state.searchValue ? this.state.searchValue.split(' ') : null;

    this.setState({
      searchResults: source.filter(({ title }) => {
        if (searchTerms) {
          //now we will search every searchTerm
          //this would allow us to search for "hello world" and match "hello foo world"
          title = title.toLowerCase();
          return searchTerms.reduce((bool, searchTerm) => {
            // doing it with bool first it will not evaluate the right side
            // if the last hit was false anyway :) -> +perfomance
            return bool && title.indexOf(searchTerm) >= 0;
          }, true);
        }

        return [];
      }, []).map(({ title, id, category }) => ({
        title: title,
        data: {
          id: id,
          category: category
        }
      }))
    });
  }, 150);

  componentWillMount() {
    this.setState({
      searchResults: []
    });
  }

  componentWillUnmount() {
    this.debouncedSearch.clear();
  }

  search = (e, { value }) => {
    this.setState({
      searchValue: value.toLowerCase()
    });

    this.debouncedSearch();
  }

  render() {
    return <Route render={({ history }) => (
      <Search
        placeholder='Search posts...'
        onSearchChange={this.search}
        onResultSelect={(e, { result }) => {
          this.setState({ searchValue: '' });
          if (result) {
            history.push(`/${result.data.category}/${result.data.id}`);
          }
        }}
        results={this.state.searchResults}
        value={this.state.searchValue}
      />)} />
  }
}

export default CustomPostSearch;