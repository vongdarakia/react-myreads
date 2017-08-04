import React, { Component } from 'react'
import { search, getAll } from '../BooksAPI'
import Book from './Book';
import { Link } from 'react-router-dom'

class SearchBook extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			books: [],
			myBooks: {}
		};
	}

	componentDidMount() {
		// Keep note of all books in the collection so that the shelf
		// state of the book can be displayed accurately.
		getAll().then((res) => {
			let myBooks = {};

			if (res && !res.error) {
				res.forEach((book) => {
					myBooks[book.id] = book;
				});
				this.setState({ myBooks });
			}
		})
	}

	onChange(e) {
		let self = this;

		this.setState({query: e.target.value}, () => {
			search(self.state.query, 20).then((res) => {
				if (res && !res.error) {
					this.setState({books: res});
				} else {
					this.setState({books: []});
				}
			});
		});
	}

	render() {
		let { books, myBooks } = this.state;
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/">
						<span className="close-search">Close</span>
					</Link>
					<div className="search-books-input-wrapper">
						<input type="text"
							placeholder="Search by title or author"
							value={this.state.query}
							onChange={this.onChange.bind(this)} />
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book, idx) => {
							// Use the book from the collection if it exists
							// because this has the actual shelf state.
							if (myBooks[book.id]) {
								return (
									<li key={book.id}><Book book={myBooks[book.id]} /></li>
								);
							}
							return (<li key={book.id}><Book book={book} /></li>);
						})}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBook
