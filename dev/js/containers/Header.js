import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/index.js';

@connect(
	state => ({
		search: state.search,
		user: state.user
	})
)

class Header extends Component {
	constructor(props) {
		super(props);
		this.searchHandler = this.searchHandler.bind(this);
		var to;
		var search = this.props.search;
		if(this.props.search)
			actionCreators.searchBar(this.props.search, this.props.dispatch);
	}

	searchHandler(e) {
		this.search = e.target.value;
		this.props.dispatch({type: 'SEARCH_CHANGE', payload: this.search});
		clearTimeout(this.to);
		this.to = setTimeout(e => {actionCreators.searchBar(this.search, this.props.dispatch);}, 500);
	}

	render() {
		const user = this.props.user;
		var loginLink = '/login?search=' + this.props.search;
		var signoutLink = '/signout?search=' + this.props.search;
		const Button = user ?
			<a href={signoutLink}>Sign out</a>:
			<a href={loginLink}>Login</a>;
		return (
	    <section id="header">
	    	<input value={this.props.search} type="text" placeholder="Search some place."
	    	onChange={this.searchHandler}/>
	    	{Button}
	    </section>
    )
  }
};

export default Header;