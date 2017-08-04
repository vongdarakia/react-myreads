import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { getAll } from '../BooksAPI'
import { Link } from 'react-router-dom'

class ListBook extends Component {
	constructor() {
		super();
		this.state = {
			currentlyReadingBooks: [],
			wantToReadBooks: [],
			readBooks: [],
			collection: {
				read: [],
				wantToRead: [],
				currentlyReading: []
			}
		}
		this.updateProject = this.onMoveBook.bind(this);
	}
	componentDidMount() {
		let self = this;
		getAll().then((res) => {
			if (res && !res.error) {
				let read = res.filter((book) => {
					return book.shelf === "read";
				});

				let wantToRead = res.filter((book) => {
					return book.shelf === "wantToRead";
				});

				let currentlyReading = res.filter((book) => {
					return book.shelf === "currentlyReading";
				});

				self.setState({
					collection: {
						read, wantToRead, currentlyReading
					}
				});
			}
		})
	}

	onMoveBook(book, catFrom, catTo) {
		let collection = this.state.collection;

		let deletingFrom = collection[catFrom];
		let addingTo = collection[catTo];

		deletingFrom = deletingFrom.filter((item) => { return item.id !== book.id; });
		addingTo.push(book);

		collection[catFrom] = deletingFrom;
		collection[catTo] = addingTo;

		this.setState({collection});
	}

	render() {
		let { read, wantToRead, currentlyReading } = this.state.collection;

		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf updateProject={this.updateProject} books={currentlyReading} title="Currently reading"/>
						<Bookshelf updateProject={this.updateProject} books={wantToRead} title="Want to Read"/>
						<Bookshelf updateProject={this.updateProject} books={read} title="Read"/>
					</div>
				</div>
				<div className="open-search">
				<Link to="/search">
					<span>Add a book</span>
				</Link>
				</div>
			</div>
		);
	}
}

export default ListBook
