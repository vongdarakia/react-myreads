import React, { Component } from 'react'
import { search, getAll } from '../BooksAPI'
import Book from './Book';

class SearchBook extends Component {
	constructor() {
		super();
		this.state = {
			query: "",
			books: []
		};
		console.log(getAll());
	}
	onChange(e) {
		// console.log(e)
		let self = this;
		console.log(self.state);
		this.setState({query: e.target.value}, () => {
			search(self.state.query, 20).then((res) => {
				console.log(res);
				if (res && !res.error) {
					this.setState({books: res});
				} else {
					this.setState({books: []});
				}
				console.log(res);
			});
		});
	}
	render() {
		// console.log(this.props);
		return (
			<div className="search-books">
			  <div className="search-books-bar">
				<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
				<div className="search-books-input-wrapper">
				  {/*
					NOTES: The search from BooksAPI is limited to a particular set of search terms.
					You can find these search terms here:
					https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

					However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
					you don't find a specific author or title. Every search is limited by search terms.
				  */}
				  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onChange.bind(this)}/>

				</div>
			  </div>
			  <div className="search-books-results">
				<ol className="books-grid">
					{this.state.books.map((book, idx) => (
						<li key={"book-" + book.id}><Book book={book}/></li>
					))}
				</ol>
			  </div>
			</div>
		);
	}
}

export default SearchBook
