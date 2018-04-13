import React from 'react';
import ReactDOM from 'react-dom';
import "../../assets/index.css";

export class Logo extends React.Component {
	render(){
		return (
		<div className= {this.props.className}>
		<div className="logo"></div>
		</div>
	);
	}
}