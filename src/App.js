import React, {Component} from 'react';
import axios from 'axios';

class App extends Component{

  state = {
    query: '',
    results: []
  }

  handleChange = (event) => {
    event.preventDefault();
    console.log('query entry is:', event.target.value)
    this.setState({
      query: event.target.value
    })
  }

  handleClick = () => {
    console.log('query when search button clicked is:', this.state.query)
    this.getBooks(this.state.query);
  }

  getBooks = (query) => {
    console.log('searching with query:', query)
    axios.get(`http://openlibrary.org/search.json?q=${query}`).then((response)=>{
      console.log('back from GET:', response.data.docs);
      this.setState({
        results: response.data.docs
      })
    }).catch((err)=>{
      console.log('error with GET', err);
    })  }

  render(){
    return (
      <>
      <input onChange={this.handleChange} placeholder="search"></input>
      <button onClick={this.handleClick}>Search</button>
      {this.state.results ? this.state.results.map((item, index)=>{
          return <div key={index}>
            <p>{item.title_suggest}, {item.author_name}, {item.publish_year ? item.publish_year.shift() : 'N/A'}, Published by: {item.publisher ? item.publisher.shift() : 'N/A'}</p>
            </div>
        }) : '' }
      </>
      );
  }
}

export default App;
