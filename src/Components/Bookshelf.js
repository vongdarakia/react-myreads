import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
	render() {
		let { books, title, moveTo } = this.props;
		return (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
			  	{books.map((book, idx) => (
					<li key={`book-${book.id}`}><Book book={book} updateProject={this.props.updateProject}/></li>
				))}
              </ol>
            </div>
          </div>
		);
	}
}

export default Bookshelf
