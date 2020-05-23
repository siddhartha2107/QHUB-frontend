import React, { useEffect, useMemo } from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom'
import {MyModal} from '../MyModal/index'
import { Table } from '../Table/index'
import './styles.css';

export interface IaddSubject{
  Subjects:any[]
  SetSubjects:any
  SubjectHandler:(arg0:any)=>void;
  ModalIsOpen:boolean;
  ModalHandler:(arg0:boolean)=>void;
}

export const AddSubject:React.FC<IaddSubject>=(props:IaddSubject)=>{

  const tableItems:any=[]
  //States
  const [fetchData,setFetchData] = React.useState(0); //Controls Get call
  const [column,setColumn] = React.useState([]);
  const [header,setHeader] = React.useState([]);
  const [noOfRow,setNoOfRow] = React.useState(3);
  const [tableHeight,setTableHeight] = React.useState('');
  //ModalStates
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [postItem,setPostItem] = React.useState(0);
  const [newSubjectName,setNewSubjectName] = React.useState('');  
  const [newSubjectCode,setNewSubjectCode] = React.useState('');

  const [modalBody,setModalBody] =React.useState(
	  <>
	  	<span>Add the Subject by the subject id or subject code</span>
            <div id="myModal-input">
            <span>Subject Name</span>
            <input type="text" id="add-subject-name" onChange={(e)=>newSubjectNameHandler(e.target.value)}></input>
            <span>Subject Code</span>
            <input type="text" id="add-subject-code" onChange={(e)=>newSubjectCodeHandler(e.target.value)}></input>
            </div>
            <div id="modal-submit"><button id="add-subject-btn" onClick={()=>{postItemHandler()}}>Add Subject</button></div>
	  </>
  );

  //StatesHandlers
  const newSubjectNameHandler=(arg0:string)=>{
    setNewSubjectName(arg0);
  }
  const newSubjectCodeHandler=(arg0:string)=>{
    setNewSubjectCode(arg0);
  }

  //Modal Handler
  const postItemHandler=()=>{
	  setPostItem(postItem+1);
  }
  const modalHandler=(arg0:boolean)=>{
	  setIsOpen(arg0)
  }

  //Call Post request to add new subject
  React.useEffect(() => {
	  if(postItem>0){
		console.log("postItem was true")
		
		axios .post("http://localhost:8089/api/subject",
		{
			"name":newSubjectName,
			"subject_code":newSubjectCode
		},
		{
			headers: {
				"Content-Type": "application/json",
				"token":localStorage.getItem('token')
			},
		})
		setFetchData(fetchData+1);
	  }
  }, [postItem]);
  
  // Load data using Get request
	useEffect(() => {
		props.SetSubjects([]);
		["ID","Name","Code"].forEach((x:any)=>{
			setHeader(header=>header.concat(x));
		});
		["id","name","subject_code"].forEach((x:any)=>{
            setColumn(column=>column.concat(x));
        });

		axios .get(
			"http://localhost:8089/api/subject",
			// "http://dummy.restapiexample.com/api/v1/employees",
			{
				headers: {
					"Content-Type": "application/json",
					"token":localStorage.getItem('token')
				}
			}
		)
		.then(function(res:any) {
			console.log(res.data);
			//props.SubjectHandler(res.data.data);
			//***{TEMP 
			const x:any={
				"id":res.data.id,
				"name":res.data.name,
				"subject_code":res.data.subject_code
			}
			props.SubjectHandler(x);
			//**TEMP}
		});
	},[]);

//   console.log("Subjects:- ",props.Subjects)
  return(
      <div id="subject-list">
        {/* {console.log("rendered")} */}
        <span id="subject-list-title">Subject List</span>
        <span id="subject-list-detail">Find the list of subjects with their codes and Ids here.</span>
        {/* { newSubjectId }
        { newSubjectName }
        { newSubjectCode } */}
        <div id="subject-list-box">
			<Table 	Header={header}
					Data={props.Subjects}
					Columns={column}
					TableHeight={tableHeight}
					NoOfRow={noOfRow}/>  

			<div id="subject-btm">
				<button id="add-subject-btn" onClick={()=>setIsOpen(true)}>Add Subject</button>
				<MyModal  ModalIsOpen={modalIsOpen}
							PostItem={postItem}
							ModalHandler={modalHandler}
							ModalBody={modalBody}
				/>
			</div>
        </div>
      
	  </div>
  )
}