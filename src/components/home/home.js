import DNA from "../../assets/DNA.jpg";
import Bioinformatic from "../../assets/Bioinformatics.jpg";
import Medicine from "../../assets/Medicine.jpg"
import '../../styles/home.css';
import Footer from "../footer/footer";

const Home = () => {
    return (
        <div className="fullBackgroundHome">
            <div className="container">
                <div className='row'>
                    <img alt="DNA" className="leftColumn" src={DNA} />
                    <div style={{ textAlign: 'center' }}>
                        <p className="rightColumn" style={{ marginTop: 40, width: '100%' }}>DNA, or deoxyribonucleic acid, is the tissue strand in all living organisms that carry genetic instruction. This genetic instruction helps an organism to develop, survive and reproduce.</p>
                    </div>
                </div>
                <div className='row'>
                    <div style={{ textAlign: 'center' }}>
                        <p className="leftColumn" style={{ marginTop: 40, width: '100%' }}>Bioinformatics is an essential field that develops methods and software programs for interpreting biological data, in particular when the data sets are large and complex. As a subfield field of science, bioinformatics combines biology, chemistry, physics, computer science, mathematics and statistics to analyze and interpret the biological data.</p>
                    </div>
                    <img alt="DNA" className="rightColumn" src={Bioinformatic} />
                </div>
                <div className='row' style={{ paddingBottom: 75 }}>
                    <img alt="DNA" className='leftColumn' src={Medicine} />
                    <div style={{ textAlign: 'center' }}>
                        <p className='rightColumn' style={{ marginTop: 40, width: '100%' }}>There are many beneficial applications of the Bioinformatics, including the identification of genetic traits that would make an individual more susceptible to certain diseases. This in turn allows for the synthesis of more effective medications to prevent those diseases.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;