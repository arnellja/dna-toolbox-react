import '../../styles/home.css';
import TranslationPic from '../../assets/Translation.jpg'
import { Input } from "../custom-components";
import { useState } from "react";
import  codons from '../../assets/codons.txt';
import Footer from '../footer/footer';

const Translation = () => {
    const [ext, setExt] = useState('');
    const [text, setText] = useState('');
    const [fileData, setFileData] = useState('');
    const [complete, setComplete] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [codonValues, setCodons] = useState([]);

    fetch(codons)
    .then((r) => r.text())
    .then(text => {
        setCodons(text);
    });

    const setFilesText = (e) => {
        e.preventDefault()
        setExt(e.target.files[0].name.substring(e.target.files[0].name.indexOf('.')))
        var file = e.target.files[0];
        if (file) {
            new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    resolve(evt.target.result);
                };
                reader.readAsText(file);
                reader.onerror = reject;
            })
            .then(setFile)
            .catch(function(err) {
                console.log(err);
            });
        }
    }

    const setFile = (data) => {
        if (data) {
            setFileData(data)
        }
    }

    const RetrieveData = (e) => {
        e.preventDefault()
        if (fileData === '' && text === '') {
            setEmpty(true);
            return;
        }
        setEmpty(false);
        if (ext !== '') {
            if (ext !== '.txt' && ext !== '.fasta') {
                setInvalid(true);
                return;
            }
        }
        setInvalid(false);
        if (fileData) {
            exportFile(fileData);
        } else {
            exportFile(text)
        }
    }

    const exportFile = (value) => {
        setComplete(true)
        let translation = prepareText(value);
        const element = document.createElement("a");
        const file = new Blob([translation], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "result.txt";
        document.body.appendChild(element);
        element.click();
    }

    const prepareText = (value) => {
        let newValue = value.toUpperCase();
        let tempValues = newValue.split('\n');
        let values = [];
        for (let i = 0; i < tempValues.length; ++i) {
            if (String(tempValues[i]).replace(/[^ATGC]/g, '').length > 3) {
                // 3 is the length of a Codon.
                values.push(tempValues[i].replace(/[^ATGC]/g, ''));
            } 
        }
        return getTranslation(values);
    }

    const transcribe = (values) => {
        let tempValues = values;
        for (let i = 0; i < tempValues.length; ++i) {
            tempValues[i] = tempValues[i].replace(/[T]/g, 'U');
        }
        return tempValues;
    }

    const getTranslation = (values) => {
        let tempCodons = [];
        let temp = codonValues.split('\n');
        for (let i = 0; i < temp.length; ++i) {
            tempCodons.push({nucs: temp[i].split('\t')[0], codon: temp[i].split('\t')[1]});
        }
        let result = '';
        let newValues = transcribe(values);


        for (let i = 0; i < newValues.length; ++i) {
            newValues[i] = newValues[i].substring(0, newValues[i].length - (newValues[i].length % 3))
            result = result + '\nSequence ' + (i+1) +'\n';
            let end = false;
            for (let j = 0; j < newValues[i].length; j += 3) {
                for (let k = 0; k < tempCodons.length; ++k) {
                    if (j + 3 <= newValues[i].length) {
                        if (newValues[i].substring(j,j+3) === tempCodons[k].nucs && tempCodons[k].codon === '*') {
                            end = true;
                            break;
                        }
                        if (newValues[i].substring(j,j+3) === tempCodons[k].nucs && tempCodons[k].nucs !== '') {
                            result += tempCodons[k].codon;
                            break;
                        }
                    }
                    
                }
                if (end === true) {
                    break;
                }
            }
        }
        return result;
    }

    return (
        <div className="fullBackground">
            <div className="container">
                <div className='row'>
                    <img alt="DNA" className="leftColumn; transImage" src={TranslationPic} />
                    <div style={{ textAlign: 'center' }}>
                        <p className="rightColumn" style={{ marginTop: 50, width: '100%' }}>After the process of transcription creates an mRNA strand, proteins are synthesized using the mRNA strand as a template. Therefore, this program will take entered/uploaded DNA/mRNA strands, transcribe the DNA strands, translate the mRNA strands and return a sequence of Codons equivalent to what is synthesized by each strand.</p>
                    </div>
                </div>
                <br></br><br></br>
                <strong>Input your own mRNA strands to find the translated Codon string?</strong><br></br>
                <form onSubmit={RetrieveData}>
                    <div className="row">
                        <button style={{ marginRight: 50, maxHeight: 50 }}><input onChange={setFilesText} type="file" /></button>
                        <textarea placeholder="Enter DNA Contents, Line by Line" value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div className='row'>
                        <Input className='submitBtn' type="submit" />
                    </div>
                    <br></br><br></br>
                </form>
                {complete && <strong>Submission Successful.</strong>}
                {invalid && <strong>Only files with .txt and .fasta extensions will be accepted.</strong>}
                {empty && <strong>Please provide a file or text to test.</strong>}
            </div>
            <Footer />
        </div>
    )
}

export default Translation;