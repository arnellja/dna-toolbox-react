import React from 'react';
import '../../styles/home.css';

const Footer = () => {
    if (window.location.href.includes('gc') || window.location.href.includes('nuc') || window.location.href.includes('trans') || window.location.href.includes('rev')){
        return (
            <footer>
                    <div>
                        <strong>Jeffrey Arnell</strong><br></br><br></br>
                        <strong>arnelljeffrey@gmail.com</strong>
                    </div>
                    <div>
                        <strong>Operation Code Found At:</strong><br></br><br></br>
                        <strong><a style={{ color: 'inherit'}} href="https://github.com/arnellja/PythonDNATools">https://github.com/arnellja/PythonDNATools</a></strong>
                    </div>
                </footer>
        )
    } else {
        return (
            <div className='homeFooter'>
                    <div>
                        <strong>Jeffrey Arnell</strong><br></br><br></br>
                        <strong>arnelljeffrey@gmail.com</strong>
                    </div>
                    <div>
                        <strong>Operation Code Found At:</strong><br></br><br></br>
                        <strong><a style={{ color: 'inherit'}} href="https://github.com/arnellja/PythonDNATools">https://github.com/arnellja/PythonDNATools</a></strong>
                    </div>
                </div>
        )
    }
   
}

export default Footer;