

import React, { useContext } from 'react';
import rainbowLogo from '../../assets/images/rainbow-logo.svg'
import SearchForm from '../SearchForm/SearchForm'
import Navigation from './Navigation/Navigation';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav/AccountNav';
import NavbarLinkMobile from './NavbarLinkMobile/NavbarLinkMobile';
import { ThemeContext } from '../../contexts/theme.context';

const Header = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <header className={themeSelected.theme === 'dark' ? "header header-dark" : 'header header-light'}>

            <nav className='navbar'>
                <Link to='/'>
                    <img
                        src={rainbowLogo}
                        alt="logo"
                        className="header-logo"
                    />
                </Link>

                <Navigation />

            </nav>
            <NavbarLinkMobile />
            <AccountNav />

        </header>
    )
}

export default Header
