import React, { Component } from 'react';
import Header from './../containers/Header';
import Bars from './../containers/Bars';

class App extends Component {
	render() {
		return (
	    <section id="app">
    		<Header />
    		<Bars />
	    </section>
    );
  }
};

export default App;