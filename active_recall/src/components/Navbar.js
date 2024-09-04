import React from 'react';

import '../styles/Navbar.css'

export const Navbar = () => {
    return (
        <div>
            <nav className='navbar'>
                <div className='nav_items'>
                    Home
                </div>
                <div className='nav_items'>
                    Account
                </div>
            </nav>
        </div>
    )
}