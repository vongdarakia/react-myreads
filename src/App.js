import React from 'react'
// import * as BooksAPI from './BooksAPI'
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

  render() {
    return (
		<BrowserRouter>
	    	<div className="app">
				<Switch>
					<Route exact path="/" component={ListBook} />
					<Route path="/search" something="hello" component={SearchBook}/>
					<Redirect to="/" />
				</Switch>
	     	</div>
		</BrowserRouter>
    )
  }
}

export default BooksApp
