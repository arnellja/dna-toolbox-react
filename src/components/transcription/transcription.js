import '../../styles/home.css'
import TranscriptionPic from '../../assets/Transcription.png'
import { Input } from "../custom-components";
import { useState } from "react";
import Footer from '../footer/footer';

const Transcription = () => {
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
        let transcription = prepareText(value);
        const element = document.createElement("a");
        const file = new Blob([transcription], {
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
        return getTranscription(values);
    }

    const getTranscription = (values) => {
        let result = '';
        for (let i = 0; i < values.length; ++i) {
            result = result + '\nSequence ' + (i+1) +'\n';
            result += values[i].replace('T', 'U');
        }
        return result;
    }

    return (
        <div className="fullBackground">
            <div className="container">
                <div className='row'>
                    <img alt="DNA" className="leftColumn" src={TranscriptionPic} />
                    <div style={{ textAlign: 'center' }}>
                        <p className="rightColumn" style={{ marginTop: 40, width: '100%' }}>Transcription is the procss by which DNA is copied into a new molecule of messenger RNA (mRNA). Therefore, this program will convert entered/uploaded DNA into strands of mRNA.</p>
                    </div>
                </div>
                <br></br><br></br>
                <strong>Input your own DNA strands to find the transcribed RNA string?</strong><br></br>
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

export default Transcription;