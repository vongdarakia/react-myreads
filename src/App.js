import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBook from './Components/ListBook'
import SearchBook from './Components/SearchBook'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  moveTo(book, shelf) {
	  console.log(shelf);
	  BooksAPI.update(book, shelf);
  }

  render() {
    return (
		<BrowserRouter>
	    	<div className="app">
				<Switch>
					<Route exact path="/" component={ListBook} />
					<Route path="/search" moveTo={this.moveTo.bind(this)} render={(props) => {
						return (<SearchBook {...props} moveTo={this.moveTo.bind(this)} />)
						// return React.createElement(SearchBook, {moveTo: });
					}}/>
					<Redirect to="/" />
				</Switch>
	     	</div>
		</BrowserRouter>
    )
  }
}

export default BooksApp
