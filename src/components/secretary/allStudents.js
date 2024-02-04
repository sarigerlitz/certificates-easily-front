import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Button, Form, Table } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Dialog } from 'primereact/dialog';
import { Button as ButtonPrime } from 'primereact/button';
import { makeStyles } from '@mui/styles';
import { Toast } from 'primereact/toast';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "& .MuiOutlinedInput-input": {
      color: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "grey"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "grey"
    },
    "& .MuiInputLabel-outlined": {
      color: "rgba(128, 128, 128, 0.493)"
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "grey"
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "grey"
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: 'red !important'
    },
    "& .MuiOutlinedInput-root.Mui-focused.Mui-error .MuiOutlinedInput-notchedOutline": {
      color: 'red !important'
    },
    "& .MuiInputLabel-formControl": {
      right: '0',
      marginRight: '20px',
      left: 'auto !important'
    },
    "& .css-i4bv87-MuiSvgIcon-root": {
      marginRight: '180px'
    }
  },
  formControl: {
    marginBottom: '5px'
  }
}));

export default function AllStudents(props) {
  const history = useHistory();
  const [arrStudents, setArrStudent] = useState()
  const [students, setStudent] = useState()
  const [arrMarks, setArrMarks] = useState([])
  const [arrUpdate, setArrUpdate] = useState([])
  const [arrSubject, setArrSubject] = useState([])
  const [isAddMark, setIsAddMark] = useState(false)
  const [studentAddMark, setStudentAddMark] = useState()
  const [mark, setMark] = useState()
  const [subject, setSubject] = useState()
  const [newSubject, setNewSubject] = useState()
  const [addMarkDialog, setAddMarkDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();
  const [deleteStudentDialog, setDeleteStudentDialog] = useState(false);
  const [studentId, setStudentId] = useState();
  const toast = useRef(null);
  const [addStudentDialog, setAddStudentDialog] = useState(false);
  const [studentNew, setStudentNew] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/students')
      .then(r => r.data)
      .then(s => {
        setArrStudent(s)
        setStudent(s)
      })
    axios.get('http://localhost:8000/api/subject')
      .then(r => r.data)
      .then(s => setArrSubject(s))
      .catch(err => console.log(err))
  }, [])


  async function addTest() {
    setAddMarkDialog(false);
    let arr = [...arrStudents]
    if (subject == 'אחר') {
      await axios.post('http://localhost:8000/api/subject', { subject: newSubject })
        .then(r => r.data)
        .then(s => {
          arr[studentAddMark].tests.push({ subjectId: s._id, mark: mark ? mark : '' })
          setArrSubject([...arrSubject, s])
        }).catch(err => console.log(err))
    }
    else
      arr[studentAddMark].tests.push({ subjectId: arrSubject.find(x => x.subject == subject)._id, mark: mark ? mark : '' })
    setArrStudent(arr)
    updateStudent(studentAddMark)
    setIsAddMark(false)
    setMark('')
    setSubject('')
  }
  function search(e) {
    setArrStudent(students.filter(s => s.firstName.includes(e) || s.lastName.includes(e) || s.email.includes(e) || s.id.includes(e) || s.schoolYear.includes(e)))
  }
  function updateStudent(key) {
    axios.put('http://localhost:8000/api/students', arrStudents[key])
      .then(r => r.data)
      .then(s => {
      }).catch(err => console.log(err))
  }
  function deleteMark(s, m) {
    let arr = [...arrStudents]
    arr[s].tests = arr[s].tests.filter((x, i) => i !== m)
    setArrStudent(arr)
    updateStudent(s)
  }
  function deleteStudent() {
    let id = studentId;
    axios.delete('http://localhost:8000/api/students/' + id)
      .then(r => r.data)
      .then(res => {
        setArrStudent(arrStudents.filter(s => s._id !== id))
      })
      .catch(err => console.log(err))
    setDeleteStudentDialog(false);
    toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'התלמידה נמחקה מהרשימה', life: 3000 });
  }

  function setProp(key, prop, value, i) {
    let arr = [...arrStudents]
    if (i != undefined)
      arr[key][prop][i].mark = value
    else
      arr[key][prop] = value
    setArrStudent(arr)
  }
  if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789')
    history.push('/');

  const changeAddStudent = () => {
    setAddStudentDialog(true);
  }

  const hideAddStudentDialog = () => {
    setSubmitted(false);
    setAddStudentDialog(false);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setAddMarkDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setSubmitted(false);
    setDeleteStudentDialog(false);
  }

  //אישור מחיקת תלמידה
  const confirmDeleteStudent = (id) => {
    setStudentId(id);
    setDeleteStudentDialog(true);
  }

  function AddStudent() {
    let s = {}
    s.id = studentNew.id
    s.firstName = studentNew.firstName
    s.lastName = studentNew.lastName
    s.password = studentNew.password
    s.phone = studentNew.phone
    s.email = studentNew.email
    s.schoolYear = studentNew.schoolYear
    s.BalanceOfPayment = studentNew.BalanceOfPayment
    axios.post('http://localhost:8000/api/students', s)
      .then(r => r.data)
      .then(res => {
        //קריאת שרת של התלמידות מחדש כדי שהנתונים בטבלה יהיו מעודכנים
        axios.get('http://localhost:8000/api/students')
          .then(re => re.data)
          .then(s => {
            setArrStudent(s)
            setStudent(s)
          })
      })
      .catch(err => console.log(err));

    setAddStudentDialog(false);
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
  const onChangeDetailsStudentNew = (e, type) => {
    let _studentNew = { ...studentNew };
    _studentNew[`${type}`] = e.target.value;
    setStudentNew(_studentNew);
  }

  if (props == undefined || props.location == undefined || props.location.state == undefined || props.location.state.id == undefined || props.location.state.id !== '123456789')
    history.push('/');


  const addMarkDialogFooter = (
    <div style={{ textAlign: 'left' }}>
      <ButtonPrime style={{ backgroundColor: 'black', color: 'white' }} label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <ButtonPrime style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} label="שמור" icon="pi pi-check" className="p-button-text" onClick={addTest} />
    </div>
  );

  const deleteStudentDialogFooter = (
    <div style={{ textAlign: 'left' }}>
      <ButtonPrime style={{ backgroundColor: 'black', color: 'white' }} label="לא" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
      <ButtonPrime style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} label="כן" icon="pi pi-check" className="p-button-text" onClick={deleteStudent} />
    </div>
  );

  const addStudentDialogFooter = (
    <div style={{ textAlign: 'left' }}>
      <ButtonPrime style={{ backgroundColor: 'black', color: 'white' }} label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideAddStudentDialog} />
      <ButtonPrime style={{ backgroundColor: 'rgb(51 90 33)', color: 'white' }} type="submit" label="שמור" icon="pi pi-check" className="p-button-text" onClick={AddStudent} />
    </div>
  );
  return (
    <div style={{ marginTop: '15vh', backgroundColor: '#ffffffbd', padding: '20px' }}>
      <Toast ref={toast} />
      <ArrowForwardIcon onClick={() => history.push({ pathname: '/Secretary', state: { id: props.location.state.id } })} />
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
        <h5>פרטי תלמידות</h5>
        <div><input type="text" onChange={(e) => search(e.target.value)} placeholder="חיפוש..."></input><SearchIcon></SearchIcon></div>
        <Button style={{ backgroundColor: 'rgb(51 90 33)', color: 'white', borderColor: 'rgb(51 90 33)' }} variant="outline-dark" onClick={changeAddStudent}><AddCircleOutlineIcon />הוסף תלמידה</Button>
      </header>
      <Table striped bordered hover size="sm" style={{ backgroundColor: 'ffffff8a' }}>
        <thead>
          <tr>
            <th>תעודת זהות</th>
            <th>סיסמא</th>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>טלפון</th>
            <th>מייל</th>
            <th>שנת לימודים</th>
            <th>חוב</th>
            <th>ציונים</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrStudents ? arrStudents.sort(function (a, b) {
            if (a.lastName === b.lastName) {
              return a.firstName > b.firstName ? 1 : -1;
            }
            return a.lastName > b.lastName ? 1 : -1;
          }).map((item, key) => (
            <tr key={key + item.phone}>
              <td>{arrUpdate[key] ? <input maxLength={9} defaultValue={item.id} onKeyPress={(e) => onlyNumberKey(e)} onChange={(e) => setProp(key, 'id', e.target.value)}></input> : item.id}</td>
              <td>{arrUpdate[key] ? <input defaultValue={item.password} onChange={(e) => setProp(key, 'password', e.target.value)}></input> : item.password}</td>
              <td>{arrUpdate[key] ? <input defaultValue={item.firstName} onChange={(e) => setProp(key, 'firstName', e.target.value)}></input> : item.firstName}</td>
              <td>{arrUpdate[key] ? <input defaultValue={item.lastName} onChange={(e) => setProp(key, 'lastName', e.target.value)}></input> : item.lastName}</td>
              <td>{arrUpdate[key] ? <input maxLength={10} defaultValue={item.phone} onKeyPress={(e) => onlyNumberKey(e)} onChange={(e) => setProp(key, 'phone', e.target.value)}></input> : item.phone}</td>
              <td>{arrUpdate[key] ? <input defaultValue={item.email} onChange={(e) => setProp(key, 'email', e.target.value)}></input> : item.email}</td>
              <td>{arrUpdate[key] ? <input style={{ width: '60px' }} defaultValue={item.schoolYear} onChange={(e) => setProp(key, 'schoolYear', e.target.value)}></input> : item.schoolYear}</td>
              <td>{arrUpdate[key] ? <input maxLength={8} style={{ width: '60px' }} defaultValue={item.BalanceOfPayment} onKeyPress={(e) => onlyNumberKey(e)} onChange={(e) => setProp(key, 'BalanceOfPayment', e.target.value)}></input> : item.BalanceOfPayment}</td>
              <td>{arrMarks[key] ?
                <div style={{ textAlign: 'right' }}>
                  {item.tests.map((m, i) => (
                    <h5 key={key}>{arrUpdate[key] ? <DeleteIcon style={{ color: 'rgb(51 90 33)' }} onClick={() => deleteMark(key, i)} /> : null}{arrSubject.find(x => x._id == m.subjectId).subject} - {arrUpdate[key] ? <input style={{ width: '40px' }} onChange={(e) => setProp(key, 'tests', e.target.value, i)} defaultValue={m.mark} /> : m.mark}</h5>
                  ))}
                  <AddIcon onClick={() => { setIsAddMark(true); setAddMarkDialog(true); setStudentAddMark(key) }} /><br />
                  <ExpandLessIcon onClick={() => {
                    let arr = [...arrMarks]
                    arr[key] = false
                    setArrMarks(arr)
                  }}></ExpandLessIcon></div>
                : <ExpandMoreIcon onClick={() => {
                  let arr = [...arrMarks]
                  arr[key] = true
                  setArrMarks(arr)
                }}></ExpandMoreIcon>}</td>
              <td>{arrUpdate[key] ? <SaveAsIcon onClick={() => {
                updateStudent(key);
                let arr = [...arrUpdate]
                arr[key] = false
                setArrUpdate(arr)
              }} /> : <EditIcon onClick={() => {
                let arr = [...arrUpdate]
                arr[key] = true
                setArrUpdate(arr)
              }} />}<DeleteIcon style={{ color: 'rgb(51 90 33)' }} onClick={() => confirmDeleteStudent(item._id)} /></td>
            </tr>
          )) : null}
        </tbody>
      </Table>

      <Dialog visible={addMarkDialog} style={{ width: '450px' }} header="הוספת ציון" modal className="p-fluid" footer={addMarkDialogFooter} onHide={hideDialog}>
        <p>הכניסי פרטי מבחן</p>
        <Autocomplete disablePortal
          className={classes.input}
          onChange={(event, value) => setSubject(value)}
          id="combo-box-demo"
          required
          options={arrSubject.map(x => x.subject).concat('אחר')}
          sx={{ width: 223 }}
          renderInput={(params) => <TextField {...params} label='בחרי מקצוע' className={classes.root} />}
        /><br />
        {subject == 'אחר' ? (<React.Fragment><TextField className={classes.root} required onChange={(e) => setNewSubject(e.target.value)} type="text" label='הכנס מקצוע חדש' /><br></br><br></br></React.Fragment>) : null}
        <TextField className={classes.root} required onChange={(e) => setMark(e.target.value)} type="text" label='הכנס ציון'></TextField>
      </Dialog>

      <Dialog visible={deleteStudentDialog} style={{ width: '450px' }} header="אזהרה" modal footer={deleteStudentDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
          <span>האם את בטוחה שברצונך למחוק את התלמידה מהרשימה ?</span>
        </div>
      </Dialog>
      <Dialog visible={addStudentDialog} style={{ width: '450px' }} header="הוספת תלמידה" modal className="p-fluid" footer={addStudentDialogFooter} onHide={hideAddStudentDialog}>
        <Form>
          {/* <CloseIcon onClick={() => history.push({ pathname: '/Secretary', state: { id: props.location.state.id } })} /> */}
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
              onChange={(e) => onChangeDetailsStudentNew(e, "id")}
              className={classes.formControl}
            //   onChange={(e) => setId(Number(e.target.value))}
            />
            <Form.Control
              id="firstName"
              placeholder="הכנס שם פרטי"
              type="tel"
              required
              onChange={(e) => onChangeDetailsStudentNew(e, "firstName")}
              className={classes.formControl}
            />
            <Form.Control
              id="lastName"
              placeholder="הכנס שם משפחה"
              type="tel"
              required
              onChange={(e) => onChangeDetailsStudentNew(e, "lastName")}
              className={classes.formControl}
            />
            <Form.Control
              id="password"
              placeholder="הכנס סיסמא "
              type="text"
              onChange={(e) => onChangeDetailsStudentNew(e, "password")}
              className={classes.formControl}
            />
            <Form.Control
              id="phone"
              placeholder="הכנס טלפון"
              type="tel"
              maxLength="10"
              required
              onChange={(e) => onChangeDetailsStudentNew(e, "phone")}
              className={classes.formControl}
              onKeyPress={(e) => onlyNumberKey(e)}
            />
            <Form.Control
              id="email"
              placeholder="הכנס מייל"
              type="email"
              required
              onChange={(e) => onChangeDetailsStudentNew(e, "email")}
              className={classes.formControl}
            />

            <Form.Control
              id="schoolYear"
              list="browsers"
              onChange={(e) => onChangeDetailsStudentNew(e, "schoolYear")}
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
              onChange={(e) => onChangeDetailsStudentNew(e, "BalanceOfPayment")}
              className={classes.formControl}
              onKeyPress={(e) => onlyNumberKey(e)}
            />
          </Form.Group>
        </Form>
      </Dialog>
    </div>
  )
}