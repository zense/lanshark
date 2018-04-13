import React from 'react';
import "../../assets/index.css";
import { Button } from '../button/button'; 

export class Searchbar extends React.Component {
    render() {
    return (
            <div className = {this.props.className}>
            <div className="search">
            <form className="aaa">
                <input className="searchbar" />
	           	<Button />
            </form>
            </div>
            </div>
        );
    }
}
