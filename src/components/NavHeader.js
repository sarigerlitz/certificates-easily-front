import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles, createStyles } from '@mui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CompleteTest from '../components/comleteTest';
import StudentPermit from '../components/studentPermit';
import StudentPayment from '../components/StudentPayment/StudentPayment';
import FileUploadDemo from '../components/FileUploadDemo';
import ViewPaymentNotice from '../components/viewPaymentNotice';
import ViewTestPost from '../components/viewTestPost';
import homePage from '../components/homePage';
import Secretary from '../components/secretary/secretary';
import Student from '../components/secretary/insertStudent';
import Test from '../components/secretary/insertTest';
import TestFunc from '../components/secretary/test'
import UserTest from '../components/tests/test'
import CheckTest from '../components/tests/teacherCheck'
import AllStudents from '../components/secretary/allStudents';

const useStylesNav = makeStyles((theme) =>
    createStyles({
        dropdown: {
            textAlign: 'start',
            textDecoration: 'none',
            color: 'black !important'
        },
        navHeader: {
            backgroundColor: '#ffffff99 !important'
        }
    }),
);

export default function NavHeader() {
    const classes = useStylesNav();
    return (
        <div>
            <Navbar className={classes.navHeader} collapseOnSelect expand="lg" bg="light" variant="light" fixed="top" style={{ zIndex: 1000 }}>
                <Navbar.Brand href="/Secretary"><b>Certificates easily</b></Navbar.Brand>
                <Nav className="me-auto">
                    <NavDropdown title="אזור אישי" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/Login" className={classes.dropdown}>התחברות</NavDropdown.Item>
                        <NavDropdown.Divider />
                        {/* onClick={toSignOut} */}
                        <NavDropdown.Item href="/Login"  className={classes.dropdown}>התנתקות</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <Switch>
                <Route component={Secretary} path="/Secretary" />
                <Route component={Student} path="/AddStudent" />
                <Route component={Test} path="/AddTest" />
                <Route component={AllStudents} path="/AllStudent" />
                <Route component={TestFunc} path="/Test" />{/* יצירת מבחן חדש*/}
                <Route component={StudentPayment} path="/studentPayment/:id/:password" />
                <Route component={UserTest} path="/TestComplete" />
                <Route component={CompleteTest} path="/completetest/:id" />
                <Route component={CheckTest} path="/CheckTest/:id" />{/*בדיקת מבחן */}
                <Route component={StudentPermit} path="/studentpermit/:id" />
                <Route component={FileUploadDemo} path="/FileUploadDemo" />
                <Route component={ViewPaymentNotice} path="/viewPaymentNotice/:id/:password" />{/*הסדר תשלום */}
                <Route component={ViewTestPost} path="/viewTestPost/:id" />
                <Route component={homePage} path="" />
            </Switch>
        </div>
    );
}