import React, { useState } from "react";
import axios from 'axios';
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
    BrowserRouter as Router,
    Switch,
    useRouteMatch,
    Route,
    Link
} from "react-router-dom";
export default function Secretary(props) {
    // const {id} = props.location.state;
    const history = useHistory();
    const green = 'rgb(51 90 33)';
    const black = 'black';
    const gray = 'rgb(145 141 131)';
    const whiteLight = '#ffffff8a';
    const [cssAllStudents, setCssAllStudents] = useState(black);
    const [cssInsertStudent, setCssInsertStudent] = useState(green);
    const [cssInsertTest, setCssInsertTest] = useState(gray);
    const [cssNavIcons0, setCssNavIcons0] = useState(whiteLight);
    const [cssNavIcons1, setCssNavIcons1] = useState(whiteLight);
    const [cssNavIcons2, setCssNavIcons2] = useState(whiteLight);

    if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789')
        history.push('/');

    const onClickNav = (e, index) => {
        if (index == 0) {
            setCssAllStudents('white');
            setCssNavIcons0(black);
        }
        else if (index == 1) {
            setCssInsertStudent('white');
            setCssNavIcons1(green);
        }
        else if (index == 2) {
            setCssInsertTest('white');
            setCssNavIcons2(gray);
        }
    }

    const onMouseLeaveNav = (e, index) => {
        if (index == 0) {
            setCssAllStudents(black);
            setCssNavIcons0(whiteLight);
        }
        else if (index == 1) {
            setCssInsertStudent(green);
            setCssNavIcons1(whiteLight);
        }
        else if (index == 2) {
            setCssInsertTest(gray);
            setCssNavIcons2(whiteLight);
        }
    }

    return (
        <div>
            <div className="nav">
                <a className="navIcons" style={{ backgroundColor: cssNavIcons0, color: cssAllStudents }}
                    onMouseEnter={(e) => onClickNav(e, 0)} onMouseLeave={(e) => onMouseLeaveNav(e, 0)} onClick={() => history.push({ pathname: '/AllStudent', state: { id: props.location.state.id } })}>
                    <PeopleAltIcon sx={{ fontSize: 100, marginRight: 5, color: cssAllStudents }} />
                    <h4>כל התלמידות</h4>
                </a>
                <a className="navIcons" style={{ backgroundColor: cssNavIcons1, color: cssInsertStudent }} onClick={() => history.push({ pathname: '/AddStudent', state: { id: props.location.state.id } })}
                    onMouseEnter={(e) => onClickNav(e, 1)} onMouseLeave={(e) => onMouseLeaveNav(e, 1)}>
                    <PersonAddAlt1Icon sx={{ fontSize: 100, marginRight: 5, color: cssInsertStudent }} />
                    <h4>הוספת תלמידה</h4>
                </a>
                <a className="navIcons" style={{ backgroundColor: cssNavIcons2, color: cssInsertTest }} onClick={() => history.push({ pathname: '/AddTest', state: { id: props.location.state.id } })}
                    onMouseEnter={(e) => onClickNav(e, 2)} onMouseLeave={(e) => onMouseLeaveNav(e, 2)}>
                    <PostAddIcon sx={{ fontSize: 100, marginRight: 5, color: cssInsertTest }} />
                    <h4>הוספת מבחן</h4>
                </a>
            </div>
        </div>

    )
}