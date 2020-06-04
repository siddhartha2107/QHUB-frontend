import React, { useEffect, useMemo } from 'react'
import axios from 'axios';
import ReactDOM from 'react-dom'
import {MyModal} from '../MyModal/index'
import { Table } from '../Table/index'
import './styles.css';

export interface IaddSubject{
	NameOfPage:string;
	Subjects:any[];
	Column:any[];
	Header:any[];
	TableHeight:string;
	SetSubjects:any;
	SetColumn:any;
	SetHeader:any;
	SetNameOfPage:any;
	SetTableHeight:any;
	SetIsOpen:any;
	ModalIsOpen:boolean;
	FetchData:number;
	PostItem:number;
	SetPostItem:(arg0:number)=>void;
	SubjectHandler:(arg0:any)=>void;
	SetFetchData:(arg0:any)=>void;
	ModalHandler:(arg0:boolean)=>void;
}

export const AddSubject:React.FC<IaddSubject>=(props:IaddSubject)=>{
	
	//Table States
	const [column,setColumn] = React.useState([]);
	const [header,setHeader] = React.useState([]);
	props.SetNameOfPage('subject');
	props.SetTableHeight('48vh');

	//ModalStates
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
			<div id="modal-submit"><button id="add-subject-btn" onClick={()=>{props.SetPostItem(props.PostItem+1)}}>Add Subject</button></div>
		</>
	);

	//Modal Handler

	//Call Post request to add new subject
  	React.useEffect(() => {
		if(props.PostItem>0){
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
			props.SetIsOpen(false);
		}
  	}, [props.PostItem]);
  
  // Load data using Get request
	useEffect(() => {
		props.SetSubjects([]);
		["ID","Name","Code","Outcomes"].forEach((x:any)=>{
			setHeader(header=>header.concat(x));
		});
		["id","name","subject_code","outcomes_added"].forEach((x:any)=>{
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
			console.log(res.data);
			if(res.status==200){
				console.log("GET request on Subject API successfull.")
			}
			props.SubjectHandler(res.data);
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
					TableHeight={props.TableHeight}
					NameOfPage={props.NameOfPage}/>  

			<div id="subject-btm">
				<button id="add-subject-btn" onClick={()=>props.SetIsOpen(true)}>Add Subject</button>
				<MyModal  	ModalIsOpen={props.ModalIsOpen}
							ModalHandler={props.SetIsOpen}
							ModalBody={modalBody}
				/>
			</div>
        </div>
      
	  </div>
  )
}