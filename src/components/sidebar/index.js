import React from 'react';
import { CloseIcon, Icon, SidebarContainer, SidebarLink, SidebarMenu, SidebarWrapper } from './SidebarElements';


const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle} >
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <SidebarLink to='/gc-percent'>Guanine/Cytosine Percentage</SidebarLink>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <SidebarLink to='/nucleotide-count'>Nucleotide Count</SidebarLink>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <SidebarLink to='/reverse-complement'>DNA Reverse Complement</SidebarLink>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <SidebarLink to='/transcription'>DNA Transcription</SidebarLink>
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <SidebarLink to='/translation'>mRNA Translation</SidebarLink>
                    </div>
                </SidebarMenu>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar;