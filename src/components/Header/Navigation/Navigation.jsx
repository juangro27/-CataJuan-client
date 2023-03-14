import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavbarLink from "../NavbarLink/NavbarLink"
import { faCode, faCodeBranch, faEdit, faFile, faFileWord, faHome, faMailBulk, faPaperPlane, faPassport, faPlane, } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { faGrinSquint } from "@fortawesome/free-regular-svg-icons";
import { ThemeContext } from "../../../contexts/theme.context";


const Navigation = () => {

    const [selected, setSelected] = useState('home')
    const { themeSelected } = useContext(ThemeContext)

    const handleClick = (e) => setSelected(e.currentTarget.id)

    return (

        <div className={themeSelected.theme === 'dark' ? "header-links header-links-dark" : 'header-links header-links-light'}>
            <NavbarLink handleClick={handleClick} selected={selected} to='./' id='home' icon={<FontAwesomeIcon size="lg" icon={faHome} />} label='Home' />

            <NavbarLink handleClick={handleClick} selected={selected} to='./countries' id='countries' icon={<FontAwesomeIcon size="lg" icon={faPlane} />} label='Countries' />

            <NavbarLink handleClick={handleClick} selected={selected} to='./posts' id='posts' icon={<FontAwesomeIcon size="lg" icon={faEdit} />} label='Posts' />

            <NavbarLink handleClick={handleClick} selected={selected} to='./aboutus' id='aboutus' icon={<FontAwesomeIcon size="lg" icon={faGrinSquint} />} label='About Us' />

            <NavbarLink handleClick={handleClick} selected={selected} to='./contact' id='contact' icon={<FontAwesomeIcon size="lg" icon={faMailBulk} />} label='Contact' />
        </div >
    )
}
export default Navigation