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
	}
	componentDidMount() {
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

				this.setState({ currentlyReadingBooks, wantToReadBooks, readBooks });
			}
		})
	}
	render() {
		let { readBooks, wantToReadBooks, currentlyReadingBooks } = this.state;
		return (
			<div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Bookshelf books={currentlyReadingBooks} title="Currently reading"/>
				  <Bookshelf books={wantToReadBooks} title="Want to Read"/>
				  <Bookshelf books={readBooks} title="Read"/>
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
