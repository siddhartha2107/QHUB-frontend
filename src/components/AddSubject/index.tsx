import React, { useEffect, useMemo } from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom'
import {MyModal} from '../MyModal/index'
import { Table } from '../Table/index'
import './styles.css';

export interface IaddSubject{
	Subjects:any[];
	SetSubjects:any;
	ModalIsOpen:boolean;
	FetchData:number;
	SubjectHandler:(arg0:any)=>void;
	ModalHandler:(arg0:boolean)=>void;
	SetFetchData:(arg0:any)=>void;
}

export const AddSubject:React.FC<IaddSubject>=(props:IaddSubject)=>{
	
	//Table States
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
				<input type="text" id="add-subject-name" onChange={(e)=>setNewSubjectName(e.target.value)}></input>
				<span>Subject Code</span>
				<input type="text" id="add-subject-code" onChange={(e)=>setNewSubjectCode(e.target.value)}></input>
				</div>
				<div id="modal-submit"><button id="add-subject-btn" onClick={()=>{setPostItem(postItem+1)}}>Add Subject</button></div>
		</>
	);

	//Modal Handler
	const modalHandler=(arg0:boolean)=>{
		setIsOpen(arg0)
	}

  //Call Post request to add new subject
  	React.useEffect(() => {
		if(postItem>0){
			axios .post("http://localhost:8089/api/subject",
			{
				"name":newSubjectName,
				"subject_code":newSubjectCode
			},{
				headers: {
					"Content-Type": "application/json",
					"token":localStorage.getItem('token')
				},
			}).then((res:any)=>{
				if(res.status==200){
					console.log("POST request on Subject API successfull.")
				}
			})
			props.SetFetchData(props.FetchData+1);
			setIsOpen(false);
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
	},[]);

	useEffect(()=>{
		props.SetSubjects([]);

		axios .get(
			"http://localhost:8089/api/subject",
			{
				headers: {
					"Content-Type": "application/json",
					"token":localStorage.getItem('token')
				}
			}
		)
		.then(function(res:any) {
			if(res.status==200){
				console.log("GET request on Subject API successfull.")
			}
			//***{TEMP 
			const x:any={
				"id":res.data.id,
				"name":res.data.name,
				"subject_code":res.data.subject_code
			}
			props.SubjectHandler(x);
			//**TEMP}
		});
	},[props.FetchData]);

  return(
      <div id="subject-list">
        <span id="subject-list-title">Subject List</span>
        <span id="subject-list-detail">Find the list of subjects with their codes and Ids here.</span>
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