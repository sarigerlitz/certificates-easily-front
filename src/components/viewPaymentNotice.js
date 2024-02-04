import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';
import ReactDOM from 'react-dom';
import "./login.scss";
import { useParams } from 'react-router-dom'
import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import logo from '../images/logo.jpg';

export default function ViewPaymentNotice() {
    const history = useHistory();
    const { id,password } = useParams();


    const footer = (
        <span>
            <Button style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }} label="ביטול" icon="pi pi-times" className="p-button-text" onClick={() => history.push({ pathname: `/Login` })} />
            <Button style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} label="לתשלום" icon="pi pi-check" className="p-button-text" onClick={() => history.push({ pathname: `/studentPayment/${id}/${password}` })} />
        </span>
    );

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-6'>
                    <Card className="mt-5 mb-3" title={<div><img src={logo} width="110px" /><br /><h4 style={{ marginTop: '10px', marginBottom: '-10px' }}>שלום וברכה</h4></div>} style={{ width: '35em', textAlign: 'center', backgroundColor: '#ffffffbd' }} footer={footer} >
                        <p className="p-m-0" style={{ lineHeight: '1.5' }}>
                            נמצאת חייבת למכון הלימודים חוב של שכר לימוד וע"כ לא תוכלי לקבל את אישור הלימודים עד להשלמת הסדר התשלום.<br /> באפשרותך לשלם כעת את החוב בלחיצה על כפתור
                            <b> לתשלום </b></p>
                    </Card>
                </div></div>
        </div>
    )
}
