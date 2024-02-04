import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import Alert from '@mui/material/Alert';
import { Button, Container, Row, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import { Toast } from 'primereact/toast';

export default function CheckTest() {
    const history = useHistory();
    const { id } = useParams();
    const [test, setTest] = useState();
    const [name, setName] = useState();
    const [subject, setSubject] = useState();
    const [studentTest, setStudentTest] = useState();
    const [mark, setMark] = useState();
    const [isSend, setIsSend] = useState(false);
    const [arrIsCurrect, setArrIsCurrect] = useState([]);
    const toast = useRef(null);

    async function saveMark() {
        await axios.put('http://localhost:8000/api/studentToTest', { studentId: studentTest.studentId, mark: mark, subjectId: test.subjectId, id: id, isTeacher: true })
            .then(r => r.data)
            .then(res => { setIsSend(true) })
            .catch(err => console.log(err))
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'הציון נשמר - תודה רבה!', life: 6000 });
        setTimeout(() => {
            history.push('/Login');
        }, 3000)
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/studentToTest/test/' + id)
            .then(r => r.data)
            .then(res => {
                setStudentTest(res.test)
                setName(res.name)
                axios.get('http://localhost:8000/api/tests/test/' + res.test.testId)
                    .then(result => result.data)
                    .then(t => { setTest(t.test); setSubject(t.subject); })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <Toast ref={toast} />
            {test && studentTest && !isSend ?
                <Container style={{ border: '1px solid black', textAlign: 'right', width: '60%', textAlignLast: 'right', direction: 'rtl', backgroundColor: '#ffffffbd' }}>
                    <h5>שם: {name}</h5>
                    <h5>מקצוע: {subject}</h5>
                    {test.questions.map((item, index) => (
                        <div>
                            <Row><button style={{ width: '25px', height: '25px', textAlign: 'center', color: 'white', backgroundColor: arrIsCurrect[index] == 'V' ? 'green' : arrIsCurrect[index] == 'X' ? 'red' : 'white' }} onClick={(e) => { arrIsCurrect[index] = arrIsCurrect[index] == 'V' ? 'X' : 'V'; setArrIsCurrect([...arrIsCurrect]) }}>{arrIsCurrect[index]}</button>
                                {index + 1}. {item.question}?</Row>{'  '}
                            <Row>{studentTest.answers[index].answer}</Row>
                            <Row>תשובה רצויה: {test.answers[index].answer}</Row>
                        </div>
                    ))}
                    <Row><TextField onChange={(e) => setMark(e.target.value)} required type="text" label='הכנס ציון'></TextField></Row>
                    <Button onClick={() => saveMark()}>שמור ציון</Button>
                </Container> : isSend ? null
                    : <Alert severity="error">מצטערים המבחן לא קיים במאגר - אנא פני למזכירות!</Alert>}
        </div>
    )
}