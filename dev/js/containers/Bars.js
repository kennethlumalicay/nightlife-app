import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from './../actions/index';

@connect(
	state => ({
		bars: state.bars,
		user: state.user,
		barsList: state.barsList,
		search: state.search
	})
)

class Bars extends Component {
	constructor(props) {
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
		var to;
		var values;
	}

	clickHandler(e) {
		if(this.props.user)
			e.preventDefault();
		this.values = e.target.getAttribute('data-value').split('---');
		clearTimeout(this.to);
		this.to = setTimeout(() => {
			actionCreators.toggleGoing(this.props.user, this.values[0], this.values[1]==='true'?'remove':'add', this.props.dispatch);
		}, 250);
	}

	render() {
		if(this.props.bars.isFetching) {
			return <h1 className='bar-filler'><i className="fa fa-map-marker fa-spin" aria-hidden="true"></i> Searching.</h1>
		} else if(this.props.bars.isFetchFail) {
			return <h1 className='bar-filler'><i className="fa fa-beer" aria-hidden="true"> not found!</i></h1>
		} else if(this.props.bars.businesses) {
			var oldBars = this.props.bars.businesses;
			var going = [];
			var goingUsers = [];
			var cUse = 0;
			var bars = oldBars.map((bar,j) => {
				bar.rating = bar.rating > 0 ? new Array(Math.round(bar.rating)).fill()
					.map((e,i) => <i key={i} className="fa fa-star" aria-hidden="true"></i>):bar.rating;
				if(this.props.barsList) {
					this.props.barsList.map((e,i) => {
						if(e.bar.id === bar.id) {
							e.bar.going.map(v=> {
								if(this.props.user) {
									if(v.userID === this.props.user.id) {
										going.push(j);
									}
								}
								goingUsers.push([j,e.bar.going.map(e=>e.username)]);
							});
						}
					});
				}
				return bar;
			});
			// return
			console.log('goingUsers',goingUsers,goingUsers.includes(1));
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
					      <p>{goingUsers.map(e=>e[0]).includes(i)?goingUsers[cUse++][1].join(', ') + ' is going.':'Join the party!'}</p>
					    </div>
					    <a href={'/login?search='+this.props.search} data-value={bar.id +'---'+ going.includes(i)}
					    	className="reservation-btn" onClick={this.clickHandler}>
					    <i className="fa fa-hand-o-right" aria-hidden="true"></i>
					    {going.includes(i)?'Going':'Not going'}
					    <i className="fa fa-hand-o-left" aria-hidden="true"></i>
					    </a>
		    		</div>
		    	)}
		    </section>
	    )
		} else {
			return <h1 className='bar-filler'>Where we goin?</h1>;
		}
  }
};

export default Bars;