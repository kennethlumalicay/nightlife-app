import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/index.js'

@connect(
	state => ({user: state.user})
)

class Header extends Component {
	constructor(props) {
		super(props);
		this.searchHandler = this.searchHandler.bind(this);
		var to;
		var search = '';
	}

	searchHandler(e) {
		this.search = e.target.value;
		clearTimeout(this.to);
		this.to = setTimeout(e => {actionCreators.searchBar(this.search, this.props.dispatch);}, 500);
	}

	render() {
		const user = this.props.user;
		const Button = user ?
			<a href='/signout'>Sign out</a>:
			<a href='/login'>Login</a>;
		return (
	    <section id="header">
	    	<input type="text" placeholder="Search here" onChange={this.searchHandler}/>
	    	{Button}
	    </section>
    )
  }
};
/*
function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchBar: searchBar}, dispatch);
}*/

//export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;