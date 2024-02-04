import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Button, Container, Row, Col, Form, FormControl, InputGroup } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Toast } from 'primereact/toast';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Countdown from 'react-countdown';

export default function UserTest(props) {
    const history = useHistory();
    const [test, setTest] = useState()
    const [isSend, setIsSend] = useState(false)
    const [checkArr, setCheckArr] = useState([])
    // const [questionArr,setquestionArr]=useState([])
    const [answerArr, setAnswerArr] = useState([])
    const [arrA, setArrA] = useState([])
    const [mark, setMark] = useState(null)
    const toast = useRef(null);
    const Completionist = () => <span>Time is up</span>;
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            history.push('/login')
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{hours}:{minutes}:{seconds}</span>;
        }
    };
    if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.studentId == undefined || props.location.state.subjectId == undefined)
        history.push('/');

    function changeAns(value, i) {
        let arr = [...arrA]
        arr[i] = value
        setArrA(arr)
    }
    async function saveTest(e) {

        e.preventDefault();
        let t = {}
        await axios.get('https://certificates-easily-back.onrender.com/api/students/' + props.location.state.studentId)
            .then(r => r.data)
            .then(res => { t.studentId = res._id })
            .catch(err => console.log(err))
        // t.studentId = props.location.state.studentId
        t.testId = test._id
        t.answers = []
        test.questions.map((item, i) => {
            t.answers[i] = {}
            if (test.type)
                t.answers[i].answer = arrA[i]
            else
                t.answers[i].answer = checkArr[i]
        })
        axios.post('https://certificates-easily-back.onrender.com/api/studentToTest', t)
            .then(r => r.data)
            .then(result => {
                if (result.mark != '') {
                    axios.put('https://certificates-easily-back.onrender.com/api/studentToTest', { studentId: t.studentId, mark: result.mark, subjectId: props.location.state.subjectId, id: result.id, isTeacher: false })
                        .then(r => r.data)
                        .then(() => {
                            setIsSend(true)
                            setMark(result.mark)
                            toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: `המבחן נשמר-ציונך:${result.mark}`, life: 6000 });
                        })
                        .catch(err => console.log(err))
                }
                else {
                    setIsSend(true)
                    setMark(result.mark)
                    toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המבחן נשלח למורה לבדיקה', life: 6000 });
                }
                setTimeout(() => {
                    history.push('/login');
                }, 3000)
            })
            .catch(err => console.log(err))
    }

    function checkFunc(item, check, index) {
        let arr = [...checkArr]
        if (check)
            arr[index] = item
        else
            arr[index] = ''
        setCheckArr(arr)
    }

    useEffect(() => {
        axios.put('https://certificates-easily-back.onrender.com/api/studentToTest/test', { studentId: props.location.state.studentId, subjectId: props.location.state.subjectId })
            .then(response => response.data)
            .then(x => {
                if (!x) {
                    axios.get('https://certificates-easily-back.onrender.com/api/tests/' + props.location.state.subjectId)
                        .then(r => r.data)
                        .then(res => {
                            if (res) {
                                setTest(res)
                                let arr = []
                                res.answers.map(item => {
                                    arr.push(item.answer.split('\n').sort(() => Math.random() - 0.5))
                                })
                                setAnswerArr(arr)
                            }
                            else
                                toast.current.show({ severity: 'error', summary: 'הודעת שגיאה', detail: 'מצטערים המבחן לא קיים במאגר - אנא פני למזכירות!', life: 6000 });
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                else {
                    if (x == 'no test')
                        toast.current.show({ severity: 'error', summary: 'הודעת שגיאה', detail: 'מצטערים המבחן לא קיים במאגר - אנא פני למזכירות!', life: 6000 });
                    else
                        toast.current.show({ severity: 'error', summary: 'הודעת שגיאה', detail: 'השלמת כבר מבחן במקצוע זה - מבחנך ממתין לבדיקה אצל המורה', life: 6000 });
                    setTimeout(() => {
                        hideCompletetestDialog();
                    }, 3000)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const hideCompletetestDialog = () => {
        history.push('/completetest/' + props.location.state.studentId);
    }

    return (
        <div>
            <div style={{ backgroundColor: 'gray', marginTop: 150, marginRight: 600, textAlign: 'center', width: 300, borderRadius: 2, fontSize: 40 }}>
                <Countdown date={(Date.now() + (3600000 * 2))} renderer={renderer} ></Countdown>
            </div>
            <Toast ref={toast} />
            {!isSend ? <div>
                {/* <CloseIcon onClick={()=>history.push('/completetest/'+props.location.state.studentId)}/> */}
                <ArrowForwardIcon style={{ marginBottom: '15px' }} onClick={hideCompletetestDialog} />
                {test ? <Form onSubmit={(e) => saveTest(e)} style={{ border: '1px solid black', textAlign: 'right', width: '100%', direction: 'rtl' }}>
                    <Col><h2>מבחן ב{props.location.state.subject}</h2></Col>
                    <Form.Group className="mb-3">
                        {test.questions.map((item, index) => (
                            <div key={index}>
                                <div>{index + 1}. {item.question}?</div>
                                {test.type ?
                                    <FormControl as="textarea" onChange={(e) => changeAns(e.target.value, index)} placeholder='הכנס תשובה' aria-label="With textarea" required />
                                    :
                                    // test.answers[index].answer.split('\n').sort(() => Math.random() - 0.5).map((i,key)=>(
                                    answerArr[index] ? answerArr[index].map((i, key) => (
                                        <div key={key}>{' '}
                                            {/* <input type='checkbox' id={`answer${index}${key}`}></input>{' '}<label>{i}</label> */}
                                            <input disabled={!checkArr[index] == '' && checkArr[index] !== i} id={`answer${index}${key}`} type='checkbox' onChange={(e) => checkFunc(i, e.target.checked, index)}></input>{' ' + i}
                                        </div>)) : null}
                            </div>
                        ))}
                        <Button type="submit"><SendIcon />שלח מבחן</Button>
                    </Form.Group>
                </Form> : null}
            </div> : null}
        </div>
    )
}
