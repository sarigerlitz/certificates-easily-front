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
import logo from './logo.jpg';
import { fontSize } from '@mui/system';
import './homepage.css'

export default function homePage() {


    return (
        <div className='container'>
            <div class="smallBody">
                <svg width="100%" height="100%">
                    <text class='text1' x="45%" y="40%" text-anchor="middle"  >
                        Certificates
                    </text>
                    <text class='easily' x="65%" y="79%" text-anchor="middle"  >
                        easily
                    </text>
                </svg>
            </div>
            <div className='row justify-content-center' style={{ fontSize: '26px', marginTop: '5%', color: 'gray', fontFamily: '' }}>המקום להוצאת אישורי לימודים בקלות וביעילות לכל מטרה</div>
            <div className='row justify-content-center' style={{ fontSize: '22px', marginTop: '1%', color: 'gray' }}>שימוש מהנה ומועיל!!</div>
            <div className='row justify-content-center' style={{ fontSize: '18px', marginTop: '0.5%',color: 'gray' }}>במידה וישנם חובות לימודיים או כספים  תוכלו להשלימם כאן ומיד לאחר מכן לקבל אישור לימודים </div>
        </div>
    )
}
