import React from 'react';
import { Logo } from '../logo/logo';
import { Searchbar } from '../searchbar/searchbar';
import { Home } from '../Home';
export class Navbar extends React.Component {
    render(){
        return (
            <div className='navbar'>
                <Logo className="nav-logo" />
                <Searchbar className="nav-search" />
            </div>
        );
    }
} 