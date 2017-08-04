import React, { Component } from 'react'
import { search } from '../BooksAPI'
import Book from './Book';
import { Link } from 'react-router-dom'

class SearchBook extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			books: []
		};
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
						{this.state.books.map((book, idx) => (
							<li key={"book-" + book.id}><Book book={book} /></li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

export default SearchBook
