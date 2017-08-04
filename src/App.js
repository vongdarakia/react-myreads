import React from 'react'
import './App.css'
import ListBook from './Components/ListBook'
import SearchBook from './Components/SearchBook'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'

class BooksApp extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Switch>
						<Route exact path="/" component={ListBook} />
						<Route path="/search" render={(props) => {
							return <SearchBook {...props} />
						}} />
						<Redirect to="/" />
					</Switch>
				</div>
			</BrowserRouter>
		)
 	}
}

export default BooksApp
