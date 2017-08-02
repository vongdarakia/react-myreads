import React, { Component } from 'react'
import { update } from '../BooksAPI'

class Book extends Component {
	constructor() {
		super();
		this.state = {
			book: {}
		}
		this.onClick = this.onSelect.bind(this);
	}
	componentDidMount() {
		this.setState({book: this.props.book});
	}

	onSelect(e) {
		let { book } = this.state;
		book.shelf = e.target.value;
		this.setState({ book }, () => {
			update(book, this.state.book.shelf);
		});
	}

	render() {
		let { book, moveTo } = this.state;
		// console.log(this.state);
		// console.log(this.props);
		// console.log(book);
		let img = book.imageLinks ? book.imageLinks.smallThumbnail : "";
		// let img = `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`
		return (
			<div className="book">
			  <div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + img + '")' }}></div>
				<div className="book-shelf-changer">
					<select onChange={this.onClick} value={this.state.book.shelf}>
						<option disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			  </div>
			  <div className="book-title">{book.title}</div>
			  <div className="book-authors">{book.authors}</div>
			</div>
		);
	}
}

export default Book
