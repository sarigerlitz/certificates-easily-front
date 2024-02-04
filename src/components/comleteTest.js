import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as React from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function CompleteTest() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [tests, setTests] = useState([]);
    const { id } = useParams();
    const getTests = async () => {
        const arrTests = await axios.get(`http://localhost:8000/api/students/${id}/uncompletedTests`)
        if (arrTests)
            return arrTests.data
    }
    const getStudent = async () => {
        const arrstudentDetails = await axios.get(`http://localhost:8000/api/students/${id}`)

        if (arrstudentDetails)
            return arrstudentDetails.data.firstName
    }
    useEffect(() => {
        async function tests() {
            let data = await getTests();
            if (data){
            //   setTests(data);
              await  data.forEach((element,i) => {
                axios.put('http://localhost:8000/api/studentToTest/test', { studentId: id, subjectId: element._id })
                .then(r=>r.data)
                .then(res=>{
                    if(res&&res!='no test')
                    element.complete = true
                    setTests([...tests,element])
                })
                .catch(err=>console.log(err))
                });
            }
        }
        async function student() {
            let data2 = await getStudent();
            if (data2)
                setName(data2);
        }
        tests();
        student();
    }, [])
    return (
        <div className="container containerCompleteTest">
        <h4>שלום {name},<br/>  עלייך להשלים את המבחנים הבאים <br/> רק לאחר שתשלימי תוכלי לקבל אשור לימודים </h4>
        <ul>
            {tests.map((item, index) =>
            <div key={index}>
                <li>{item.subject}</li>{item.complete?<h5 style={{color:'green'}}>מבחן בבדיקה</h5>:<Button onClick={()=>history.push({pathname:'/TestComplete',state:{studentId:id,subjectId:item._id,subject:item.subject}})}>להשלמת המבחן</Button>}
            </div>
            )}
        </ul>
    </div>
    );
}