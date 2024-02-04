import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react';
import { Alert } from 'react-bootstrap';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
export default function StudentPermit() {
    const [sum, setSum] = useState(0);
    const { id } = useParams();
    const [name, setName] = useState("");
    const toast = useRef(null);

    const getStudent = async () => {
        const arrstudentDetails = await axios.get(`https://certificate-easily.onrender.com/api/students/${id}`)

        if (arrstudentDetails)
            return arrstudentDetails.data.firstName + "      " + arrstudentDetails.data.lastName
    }

    async function student() {
        let data2 = await getStudent();
        if (data2)
            setName(data2);
    }
    student();

    const getPdfFromNodejs = (status) => {
        return axios.get(`https://certificate-easily.onrender.com/api/students/pdf/${id}/${status}`, {
            responseType: "blob"
            //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob([response.data], {
                    type: "application/pdf"
                });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);


            }).then(console.log("pdf created"),
                toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'האישור לימודים נשלח למייל', life: 6000 })
            )
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="hello">
            <Toast ref={toast} />
            <h4> אישור לימודים עבור התלמידה  {name}
                <br /> מספר זהות: {id}</h4>
            <div className="printOffice">
                <Button label="תחבורה ציבורית" style={{ backgroundColor: 'black', color: 'white', width: '150px', height: '60px', marginBottom: '10px' }} icon="pi pi-print" className="p-button-text" onClick={() => getPdfFromNodejs(3)} />
                <Button label="ביטוח לאומי" style={{ backgroundColor: 'rgb(51 90 33)', color: 'white', width: '150px', height: '60px', marginBottom: '10px' }} icon="pi pi-print" className="p-button-text" onClick={() => getPdfFromNodejs(2)} />
                <Button label="לכל המעוניין" style={{ backgroundColor: 'rgb(145 141 131)', color: 'white', width: '150px', height: '60px', marginBottom: '10px' }} icon="pi pi-print" className="p-button-text" onClick={() => getPdfFromNodejs(1)} />
            </div>
        </div>
    );
}


