import React from "react";
import axios from "axios";
import { Button, Container, Row, Col, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState, useRef } from "react";
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import { Button as ButtonPrime } from 'primereact/button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Toast } from 'primereact/toast';

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

export default function TestFunc(props) {
    const history = useHistory()
    const classes = useStyles();
    const [arrQustions, setArrQustions] = useState([])
    const [arrAnswers, setArrAnswers] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const toast = useRef(null);

    if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789' || props.location.state.data == undefined)
        history.push('/')

    function addTest() {
        let test = {}
        test.teacherName = props.location.state.data.teacherName
        test.teacherEmail = props.location.state.data.teacherEmail
        test.teacherPhone = props.location.state.data.teacherPhone
        test.subjectId = props.location.state.data.subjectId
        test.type = props.location.state.data.type
        test.questions = arrQustions
        test.answers = arrAnswers
        axios.post('https://certificates-easily-back.onrender.com/api/tests', test)
            .then(r => r.data)
            .then(s => {
                setIsAdd(true)
                // history.push('/AllStudent' )
            })
            .catch(err => console.log(err))
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המבחן נשמר', life: 3000 });
        setTimeout(() => {
            console.log("tick");
            history.push({ pathname: '/AddTest', state: { id: props.location.state.id } });
        }, 3000);
    }

    function addQuestion(e) {
        e.preventDefault();
        setArrQustions([...arrQustions, { question: e.target.question.value }]);
        setArrAnswers([...arrAnswers, { answer: e.target.answer.value }])
        e.target.question.value = ''
        e.target.answer.value = ''
    }
    // useEffect(()=>{
    // alert(JSON.stringify(props.location.state.data))
    // },[])

    const hideAddTestDialog = () => {
        history.push({ pathname: '/AddTest', state: { id: props.location.state.id } });
    }
    return (
        <React.Fragment>
            <Toast ref={toast} />
            {!isAdd ?
                <div>
                    {/* <CloseIcon onClick={() => history.push({ pathname: '/Secretary', state: { id: props.location.state.id } })} /> */}
                    <Form onSubmit={(e) => addQuestion(e)} className={classes.form}>
                        <ArrowForwardIcon style={{ marginBottom: '15px' }} onClick={hideAddTestDialog} />
                        <Form.Group className="mb-3">
                            <FormControl as="textarea" id='question' placeholder='הכנס שאלה' aria-label="With textarea" required className={classes.formControl} />
                            <FormControl as="textarea" id='answer' placeholder='הכנס תשובה' aria-label="With textarea" required className={classes.formControl} />
                            {props.location.state.data.type ?
                                <Form.Text id="passwordHelpBlock" muted>
                                    הכניסי מילות מפתח שחייבות להיות כלולות בתשובה, בין מילה למילה הכניסי פסיק
                                    הכניסי ; לאחר קבוצה של מילים נרדפות
                                </Form.Text> :
                                <Form.Text id="passwordHelpBlock" muted>
                                    הכניסי מספר תשובות לבחירה בין תשובה לתשובה לחצי על מקש Enter
                                    ,הכניסי תחילה את התשובה הנכונה.
                                </Form.Text>}
                        </Form.Group>
                        <div style={{ textAlign: 'center' }}>
                            <ButtonPrime type="submit" label="הוסף שאלה" style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} icon="pi pi-plus" className="p-button-text" />
                        </div>
                    </Form>
                    {arrQustions.length > 0 && arrAnswers.length > 0 ?
                        <Container style={{ border: '1px solid black', textAlign: 'right', width: '70%', backgroundColor: '#ffffffbd' }}>
                            <Col><h2>מבחן ב{props.location.state.data.subject}</h2></Col>
                            {/* <h3>שאלות</h3>
       {arrQustions.map((item,key)=>(
          <Row>{key+1}. {item.question}</Row>
      ))} */}
                            {arrQustions.map((item, key) => (
                                <Col><h4>שאלה מספר {key + 1}</h4>
                                    <Row><h5>שאלה</h5></Row><Row>{item.question}</Row>
                                    {!props.location.state.data.type ?
                                        <div><Row><h5>תשובה</h5></Row>
                                            {arrAnswers[key].answer.split('\n').map((i, k) => (
                                                <Row key={key}>{' '}
                                                    <input type='checkbox' id="check"></input>{' ' + i}
                                                </Row>
                                            ))}</div> :
                                        <div><Row><h5>תשובה</h5></Row><Row>{arrAnswers[key].answer}</Row></div>}</Col>
                            ))}

                            {/* <h3>תשובות</h3>
   {arrAnswers.map((item,key)=>(
       !props.location.state.data.type?
       <div>{key+1}.
       {item.answer.split('\n').map((i,k)=>(
           <Row key={key}>{' '}
            <input type='checkbox'></input>{' '+i}
           </Row>
        ))}</div>:
         <Row>{key+1}. {item.answer}</Row>
      ))} */}
                            <ButtonPrime label="שמור מבחן" style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} icon="pi pi-save" className="p-button-text" onClick={addTest} />
                            {/* <Button variant="outline-primary" type="button" onClick={() => addTest()}><SaveAsIcon />שמור מבחן</Button> */}
                        </Container> : null}
                    {/* <div>
                <Alert variant="success" ><CloseIcon onClick={() => history.push({ pathname: '/Secretary', state: { id: props.location.state.id } })} />
                    <Alert.Heading style={{ textAlign: 'right', direction: 'rtl' }}><DoneIcon />סיימנו!!! תודה רבה</Alert.Heading>
                    <p style={{ textAlign: 'right', direction: 'rtl' }}>
                        המבחן נוסף בהצלחה
                    </p>
                    <hr />
                </Alert>
            </div> */}
                </div> : null}
        </React.Fragment>
    )
}