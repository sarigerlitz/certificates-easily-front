import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '5px'
  },
  form: {
    backgroundColor: '#ffffffbd',
    marginTop: '15vh',
    paddingLeft: '25px',
    paddingRight: '25px',
    paddingTop: '15px',
    paddingBottom: '50px'
  }
}));
export default function Students(props) {
  const classes = useStyles();
  const history = useHistory();
  const toast = useRef(null);

  function AddStudent(form) {
    form.preventDefault()
    let s = {}
    s.id = form.target.id.value
    s.firstName = form.target.firstName.value
    s.lastName = form.target.lastName.value
    s.password = form.target.password.value
    s.phone = form.target.phone.value
    s.email = form.target.email.value
    s.schoolYear = form.target.schoolYear.value
    s.BalanceOfPayment = form.target.BalanceOfPayment.value
    axios.post('https://certificates-easily-back.onrender.com/api/students', s)
      .then(r => r.data)
      .then(s => {
        //  setTimeout(() =>history.push({pathname:'/AllStudent',state:{id:props.location.state.id}}),2500)
      })
      .catch(err => console.log(err))
    //ריקון השדות של הטופס
    form.target.reset();
    toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'התלמידה נוספה', life: 3000 });
  }
  function onlyNumberKey(event) {
    if (event.key == 0)
      return;
    var keyNumber = Number(event.key)
    if (!keyNumber) {
      event.preventDefault();
    }
  }

  if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789')
    history.push('/');

  const hideAddStudentDialog = () => {
    history.push({ pathname: '/Secretary', state: { id: props.location.state.id } });
  }

  return (
    <div>
      <Toast ref={toast} />
      <Form onSubmit={(e) => AddStudent(e)} className={classes.form}>
        <ArrowForwardIcon style={{ marginBottom: '15px' }} onClick={hideAddStudentDialog} />
        <Form.Group size="lg">
          <Form.Label><b>הכניסי פרטי תלמידה</b></Form.Label>
          <Form.Control
            id="id"
            autoFocus
            placeholder="הכנס מספר זהות"
            type="tel"
            maxLength="9"
            required
            onKeyPress={(e) => onlyNumberKey(e)}
            className={classes.formControl}
          //   onChange={(e) => setId(Number(e.target.value))}
          />
          <Form.Control
            id="firstName"
            placeholder="הכנס שם פרטי"
            type="tel"
            required
            className={classes.formControl}
          />
          <Form.Control
            id="lastName"
            placeholder="הכנס שם משפחה"
            type="tel"
            required
            className={classes.formControl}
          />
          <Form.Control
            id="password"
            placeholder="הכנס סיסמא "
            type="text"
            required
            className={classes.formControl}
          />
          <Form.Control
            id="phone"
            placeholder="הכנס טלפון"
            type="tel"
            maxLength="10"
            required
            className={classes.formControl}
          />
          <Form.Control
            id="email"
            placeholder="הכנס מייל"
            type="email"
            required
            className={classes.formControl}
          />

          <Form.Control
            id="schoolYear"
            list="browsers"
            className={classes.formControl}
            placeholder="הכנס שנת לימודים"
            //   type="text"
            required />
          <datalist id="browsers">
            <option value={new Date().getFullYear() - 5} />
            <option value={new Date().getFullYear() - 4} />
            <option value={new Date().getFullYear() - 3} />
            <option value={new Date().getFullYear() - 2} />
            <option value={new Date().getFullYear() - 1} />
            <option value={new Date().getFullYear()} />
          </datalist>
          <Form.Control
            id="BalanceOfPayment"
            placeholder="הכנס חוב"
            type="text"
            className={classes.formControl}
          />
        </Form.Group>
        <div style={{ textAlign: 'left' }}>
          <ButtonPrime style={{ backgroundColor: 'black', color: 'white', marginLeft: '10px' }} label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideAddStudentDialog} />
          <ButtonPrime style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} type="submit" label="שמור" icon="pi pi-check" className="p-button-text" />
        </div>
      </Form>
    </div >
  );
}
