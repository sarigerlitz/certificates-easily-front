import React from "react";
import axios from "axios";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button as ButtonPrime } from 'primereact/button';

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

export default function Test(props) {
  const classes = useStyles();
  const history = useHistory();
  const [subject, setSubject] = useState([])
  const [sub, setSub] = useState('')

  if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789')
    history.push('/');

  useEffect(() => {
    axios.get('https://certificates-easily-back.onrender.com/api/subject')
      .then(r => r.data)
      .then(s => setSubject(s))
      .catch(err => console.log(err))
  }, [])


  async function sendForm(e) {
    e.preventDefault();
    let obj = {};
    obj.teacherName = e.target.teacherName.value
    obj.teacherEmail = e.target.teacherEmail.value
    obj.teacherPhone = e.target.teacherPhone.value
    if (e.target.type.value == 'מבחן רגיל')
      obj.type = 1
    else
      obj.type = 0
    if (sub == 'אחר') {
      await axios.post('https://certificates-easily-back.onrender.com/api/subject', { subject: e.target.newSub.value })
        .then(r => r.data)
        .then(s => {
          obj.subject = s.subject
          obj.subjectId = s._id
        })
        .catch(err => console.log(err))
    } else {
      obj.subject = e.target.subjectId.value
      obj.subjectId = subject.find(x => x.subject == e.target.subjectId.value)._id
    }
    history.push({ pathname: '/Test', state: { id: props.location.state.id, data: obj } })
  }

  const hideAddStudentDialog = () => {
    history.push({ pathname: '/Secretary', state: { id: props.location.state.id } });
  }

  return (
    <div>
      <Form onSubmit={(e) => sendForm(e)} className={classes.form}>
        <ArrowForwardIcon style={{ marginBottom: '15px' }} onClick={hideAddStudentDialog} />
        <h4>הוספת מבחן</h4>
        {/* <CloseIcon onClick={() => history.push({ pathname: '/Secretary', state: { id: props.location.state.id } })} /> */}
        <Form.Group className="mb-3">
          <Form.Control id='teacherName' type="text" placeholder='הכניסי שם מורה' required className={classes.formControl} />
          <Form.Control id='teacherEmail' type="email" placeholder='הכניסי מייל מורה' required className={classes.formControl} />
          <Form.Control id='teacherPhone' type="tel" placeholder='הכנסי טלפון מורה' required className={classes.formControl} />
          <Form.Control id='subjectId' list='subject' onChange={e => setSub(e.target.value)} placeholder='בחרי מקצוע' required className={classes.formControl} />
          <datalist id="subject">
            {subject.map(item => (
              <option value={item.subject} />
            ))}
            <option value='אחר' />
          </datalist>
          {sub == 'אחר' ? <Form.Control id='newSub' type="text" placeholder='הכנס נושא חדש' required /> : null}
          <Form.Control id='type' list='test' placeholder='בחרי סוג מבחן' required />
          <datalist id="test">
            <option value='מבחן רגיל' />
            <option value='מבחן אמריקאי' />
          </datalist>
        </Form.Group>
        <div style={{ textAlign: 'left' }}>
          <ButtonPrime type="submit" style={{ backgroundColor: 'rgb(51 90 33)', color: 'white', width: '80px' }} icon="pi pi-angle-left" className="p-button-text">הבא</ButtonPrime>
        </div>
      </Form>
    </div>

  )
}
