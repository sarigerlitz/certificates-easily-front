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

export default function ViewTestPost() {
    const history = useHistory();
    const { id } = useParams();

    const footer = (
        <span>
            <Button style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }} label="ביטול" icon="pi pi-times" className="p-button-text" onClick={() => history.push({ pathname: `/Login` })} />
            <Button style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} label="למבחנים" icon="pi pi-check" className="p-button-text" onClick={() => history.push({ pathname: `/completetest/${id}` })} />
        </span>
    );

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-6'>
                    <Card className="mt-5 mb-3" title={<div><img src={logo} width="110px" /><br /><h4 style={{ marginTop: '10px', marginBottom: '-10px' }}>שלום וברכה</h4></div>} style={{ width: '35em', textAlign: 'center', backgroundColor: '#ffffffbd' }} footer={footer}>
                        <p className="p-m-0" style={{ lineHeight: '1.5', direction: 'rtl' }}>
                            נמצאת כי לא השלמת את כל המטלות הלימודיות וע"כ לא תוכלי לקבל את אישור הלימודים עד להשלמת המטלות .<br /> באפשרותך להשלים כעת את המטלות בלחיצה על כפתור
                            <b> למבחנים </b></p>
                    </Card>
                </div></div>
        </div>
    )
}
