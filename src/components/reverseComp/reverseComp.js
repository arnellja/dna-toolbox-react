import '../../styles/home.css';
import revComp from '../../assets/revComp.png'
import { Input } from "../custom-components";
import { useState } from "react";
import Footer from '../footer/footer';

const ReverseComplement = () => {
    const [ext, setExt] = useState('');
    const [text, setText] = useState('');
    const [fileData, setFileData] = useState('');
    const [complete, setComplete] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [empty, setEmpty] = useState(false);

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
        let revComp = prepareText(value);
        const element = document.createElement("a");
        const file = new Blob([revComp], {
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
        return getRevComp(values);
    }

    const getRevComp = (values) => {
        let result = '';
        for (let i = 0; i < values.length; ++i) {
            result = result + '\nSequence ' + (i+1) +'\n';
            let temp = values[i];
            temp = temp.replace('A', 'U');
            temp = temp.replace('C', 'J');
            temp = temp.replace('T', 'A');
            temp = temp.replace('U', 'T');
            temp = temp.replace('G', 'C');
            temp = temp.replace('J', 'G');
            result += temp.reverse();
        }
        return result;
    }

    return (
        <div className="fullBackground">
        <div className="container">
            <div className='row'>
                <img alt="DNA" className="leftColumn" src={revComp} />
                <div style={{ textAlign: 'center' }}>
                    <p className="rightColumn" style={{ marginTop: 50, width: '100%' }}>Often we need to study the strand that would be complementary to the DNA strands in a study. This computer program allows for uploaded/entered DNA strands to be converted to the DNA reverse-complements.</p>
                </div>
            </div>
            <br></br><br></br>
            <strong>Input your own DNA strands to find the DNA Reverse Complement?</strong><br></br>
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

export default ReverseComplement;