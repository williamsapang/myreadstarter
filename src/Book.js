import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BrowserRouter, Link} from 'react-router-dom'
export default class Book extends React.Component {
  state = {
    value: "select"
  }
  change(event) {
    this.setState({value: event.target.value});
    BooksAPI.update(this.props.book, event.target.value).then((res) => {
      this.props.context.componentDidMount()
    }); 
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.imagelink }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.change.bind(this)} value={this.props.book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    )
  }
}