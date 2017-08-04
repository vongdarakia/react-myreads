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
		let self = this;
		let { book } = this.state;
		let catFrom = book.shelf;
		let catTo = e.target.value;
		book.shelf = catTo;

		this.setState({ book }, () => {
			if (self.props.updateProject) {
				self.props.updateProject(book, catFrom, catTo);
			}
			update(book, self.state.book.shelf);
		});
	}

	render() {
		let { book } = this.state;
		let img = book.imageLinks ? book.imageLinks.smallThumbnail : "";

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
