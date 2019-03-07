import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BrowserRouter, Link} from 'react-router-dom'
import Book from './Book'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    searching: false,
    books: [],
    searchResult: [],
  }
  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({books:[]})
      for(let i=0; i<data.length; i++){
          var newArray = this.state.books.slice();
          newArray.push(data[i])
          this.setState({books:newArray})
      }
    }); 
  }
  onChange(event){
    if(event.target.value === ""){
      this.setState({searchResult:[]})
    }
    else
    {
      BooksAPI.search(event.target.value).then((data) => {
        this.setState({searchResult:[]})
        if(data!==null)
        {
          for(let i=0; i<data.length; i++){
            var searchBookArray = this.state.searchResult.slice();
            searchBookArray.push(data[i])
            this.setState({searchResult:searchBookArray})
          }
        }
      });
    }
  }
  render() {
    const currentlyReading_ = []
    const wantToRead_ = []
    const Read_ = []
    const searchResult_ = []
    var imgLink = ""
    var newBook
    for(let i=0; i<this.state.searchResult.length; i++){
      if(this.state.searchResult[i].imageLinks)
      {
        imgLink = 'url("'+ this.state.searchResult[i].imageLinks.thumbnail+'")'
      }
      newBook = this.state.searchResult[i];
      for(let j=0; j<this.state.books.length; j++){
        if(this.state.searchResult[i].id === this.state.books[j].id){
          newBook = this.state.books[j];
        }
      }
      searchResult_.push(
        <li key={i}>
          <Book 
            context={this}
            book={newBook}
            title={this.state.searchResult[i].title}
            authors={this.state.searchResult[i].authors}
            imagelink={imgLink}
          /> 
        </li>
      )
    }
    for(let i=0; i<this.state.books.length; i++){
      if(this.state.books[i].shelf === "currentlyReading"){
        currentlyReading_.push(
          <li key={i}>
            <Book 
              context={this}
              book={this.state.books[i]}
              title={this.state.books[i].title}
              authors={this.state.books[i].authors}
              imagelink={'url("'+ this.state.books[i].imageLinks.thumbnail+'")'}
            /> 
          </li>
        )
      }
      else if(this.state.books[i].shelf === "wantToRead"){
        wantToRead_.push(
          <li key={i}>
            <Book 
              context={this}
              book={this.state.books[i]}
              title={this.state.books[i].title}
              authors={this.state.books[i].authors}
              imagelink={'url("'+ this.state.books[i].imageLinks.thumbnail+'")'}
            /> 
          </li>
        )
      }
      else if(this.state.books[i].shelf === "read"){
        Read_.push(
          <li key={i}>
            <Book 
              context={this}
              book={this.state.books[i]}
              title={this.state.books[i].title}
              authors={this.state.books[i].authors}
              imagelink={'url("'+ this.state.books[i].imageLinks.thumbnail+'")'}
            /> 
          </li>
        )
      }
    }
    
    return (
      <div className="app">
        {this.state.searching ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ searching: false, searchResult:[] })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.onChange.bind(this)} placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {searchResult_}
              </ol>
            </div>
            <BrowserRouter>
                  <Link to="/" onClick={() => this.setState({ searching: false })}>Home</Link>
            </BrowserRouter>
          </div>
        ) : (
          
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            
            <div className="list-books-content">
              <div>
              <div className="bookshelf">
              
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {currentlyReading_}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {wantToRead_}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {Read_}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ searching: true })}>Add a book</button>
            </div>
            <BrowserRouter>
                <Link to="/search" onClick={() => this.setState({ searching: true })}>Search</Link>
            </BrowserRouter>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
