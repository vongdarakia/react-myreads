import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import { getAll } from '../BooksAPI'
import { Link } from 'react-router-dom'

// let readBooks = [
// 	{
// 		title: "To Kill a Mockingbird",
// 		authors: "Harper Lee",
// 		url: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
// 	},
// 	{
// 		title: "Ender's Game",
// 		authors: "Orson Scott Card",
// 		url: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
// 	}
// ]

class ListBook extends Component {
	constructor() {
		super();
		this.state = {
			currentlyReadingBooks: [],
			wantToReadBooks: [],
			readBooks: []
		}

		this.updateProject = this.onMoveBook.bind(this);
		// console.log(this);
	}
	componentDidMount() {

		let self = this;
		getAll().then((res) => {
			console.log(res);
			if (res && !res.error) {
				let readBooks = res.filter((book) => {
					return book.shelf === "read";
				});

				let wantToReadBooks = res.filter((book) => {
					return book.shelf === "wantToRead";
				});

				let currentlyReadingBooks = res.filter((book) => {
					return book.shelf === "currentlyReading";
				});

				self.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
			}
		})
	}

	onMoveBook(book, catFrom, catTo) {
		console.log("updating");
		console.log(book);
		let self = this;
		let { readBooks, wantToReadBooks, currentlyReadingBooks } = this.state;
		console.log(this.state);
		// let booksFrom = [];
		switch (catFrom) {
			case "read":
				readBooks = readBooks.filter((item) => { return item.id !== book.id; });
				console.log(readBooks)
				this.setState({ readBooks });
				break;
			case "wantToRead":
				wantToReadBooks = wantToReadBooks.filter((item) => { return item.id !== book.id; });
				console.log(wantToReadBooks)
				this.setState({ wantToReadBooks });
				break;
			case "currentlyReading":
				currentlyReadingBooks = currentlyReadingBooks.filter((item) => { return item.id !== book.id; });
				console.log(currentlyReadingBooks)
				this.setState({ currentlyReadingBooks });
				break;
			default:
				// booksFrom = null;
				break;
		}



		// catTo
		switch (catTo) {
			case "read":
				readBooks.push(book);
				this.setState({ readBooks });
				break;
			case "wantToRead":
				wantToReadBooks.push(book);
				this.setState({ wantToReadBooks });
				break;
			case "currentlyReading":
				currentlyReadingBooks.push(book);
				this.setState({ currentlyReadingBooks });
				break;
			default:
				break;
		}

		// getAll().then((res) => {
		// 	console.log(res);
		// 	console.log(self);
		// 	if (res && !res.error) {
		// 		let readBooks = res.filter((book) => {
		// 			return book.shelf === "read";
		// 		});
		//
		// 		let wantToReadBooks = res.filter((book) => {
		// 			return book.shelf === "wantToRead";
		// 		});
		//
		// 		let currentlyReadingBooks = res.filter((book) => {
		// 			return book.shelf === "currentlyReading";
		// 		});
		//
		// 		self.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
		// 	}
		// })
	}

	render() {
		let { readBooks, wantToReadBooks, currentlyReadingBooks } = this.state;
		console.log("render");
		console.log(this.state);
		return (
			<div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf updateProject={this.updateProject} books={currentlyReadingBooks} title="Currently reading"/>
				  <Bookshelf updateProject={this.updateProject} books={wantToReadBooks} title="Want to Read"/>
				  <Bookshelf updateProject={this.updateProject} books={readBooks} title="Read"/>
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
