import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchBar} from './../actions/index'

@connect(
	state => ({
		bars: state.bars,
		user: state.user
	})
)

class Bars extends Component {
	render() {
		if(this.props.bars) {
			var bars = this.props.bars.businesses;
			return (
		    <section id="bars">
		    	{bars.map((e,i)=>
		    		<div key={i}>{e.name}</div>)}
		    </section>
	    )
		} else {
			return null;
		}
  }
};

/*
function mapStateToProps(state) {
    return {
        bars: state.bars,
        user: state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchBar: searchBar}, dispatch);
}
*/

//export default connect(mapStateToProps, mapDispatchToProps)(Bars);
export default Bars;