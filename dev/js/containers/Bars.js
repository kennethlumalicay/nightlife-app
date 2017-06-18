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
		if(this.props.bars.isFetching) {
			return <h1 className='bar-filler'><i className="fa fa-map-marker fa-spin" aria-hidden="true"></i> Searching.</h1>
		} else if(this.props.bars.isFetchFail) {
			return <h1 className='bar-filler'><i className="fa fa-beer" aria-hidden="true"> not found!</i></h1>
		} else if(this.props.bars.businesses) {
			var oldBars = this.props.bars.businesses;
			console.log(oldBars);
			var bars = oldBars.map(bar => {
				bar.rating = new Array(Math.round(bar.rating)).fill()
					.map((e,i) => <i key={i} className="fa fa-star" aria-hidden="true"></i>);
				return bar;
			});
			return (
		    <section id="bars">
		    	{bars.map((bar,i)=> 
		    		<div className='bars-div' key={i} style={{
		    			backgroundImage: 'url(' + bar.image_url + ')',
		    			backgroundSize: 'cover'
		    		}}>
					    <div>
					    	<h2>{bar.name}</h2>
					      <p>{bar.location.address1}, {bar.location.city}</p>
					     	<p>{bar.phone}</p>
					     	<p>{bar.price}</p>
					     	{/*<p>{bar.distance.toFixed(2)}</p>*/}
					      <p>Rating: {bar.rating}</p>
					    </div>
					    <button className="reservation-btn">
					    <i className="fa fa-hand-o-right" aria-hidden="true"></i> 
					    Not going
					     <i className="fa fa-hand-o-left" aria-hidden="true"></i>
					    </button>
		    		</div>
		    	)}
		    </section>
	    )
		} else {
			return <h1 className='bar-filler'>Where we goin?</h1>;
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