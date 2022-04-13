import React from 'react';
import { FaBars } from 'react-icons/fa';
import { MobileIcon, Nav, NavbarContainer, NavLogo, NavMenu, NavBtn, NavBtnLink } from './navbar-elements'
const Navbar = ({ toggle }) => {
        return (
            <>
              <Nav>
                    <NavbarContainer>
                        <NavLogo to='/'>DNA Toolbox</NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavBtn>
                                <NavBtnLink to='/gc-percent'>Guanine/Cytosine Percentage</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLink to='/nucleotide-count'>Nucleotide Count</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLink to='/reverse-complement'>DNA Reverse Complement</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLink to='/transcription'>DNA Transcription</NavBtnLink>
                            </NavBtn>
                            <NavBtn>
                                <NavBtnLink to='/translation'>mRNA Translation</NavBtnLink>
                            </NavBtn>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </>
        )
   
}

export default Navbar;