import React from 'react'
import {Nav} from '../Nav/index'
import {Login} from '../Login/index'
import { AddSubject } from '../AddSubject'
import { AddUnit } from '../AddUnit'
import { Table } from '../Table/index'
import './styles.css';
import { AddQuestion } from '../AddQuestion'
import { Assignment } from "../Assignments"
import { CreateAssignment } from "../CreateAssignment"

export interface IBody{
  Page:number;
  PageHandler:(arg0:number)=>void;
}

export const Body:React.FC<IBody>=(props:IBody)=>{
	
	const [unitId,setUnitId] = React.useState('')
	//Common State
	const [fetchData,setFetchData] = React.useState(0);
	//Table State
	const [column,setColumn] = React.useState([]);
	const [header,setHeader] = React.useState([]);
	const [nameOfPage,setNameOfPage] = React.useState('');
	const [tableHeight,setTableHeight] = React.useState('34vh');
	//Modal State
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [postItem,setPostItem] = React.useState(0);

	//Subject States
	const [subjects,setSubjects]= React.useState([]);
	
	const subjectHandler=(arg0:any)=>{
		setSubjects(subjects=>subjects.concat(arg0))
  	}
	const modalHandler=(arg0:boolean)=>{
		setIsOpen(arg0);
	}
	const UnitHandler=(arg0:string)=>{
		setUnitId(arg0);
	}

	const project = () => {
		if(!localStorage.getItem("token")){
			props.PageHandler(1);
		}
		switch(props.Page) {
			case 1: if(localStorage.getItem("token")){
						props.PageHandler(2);
					} else
					return <Login 		
										Page={props.Page}
										PageHandler={props.PageHandler}
										/>;
			case 2: return <AddSubject	
										Subjects={subjects}
										FetchData={fetchData}
										Column={column}
										Header={header}
										NameOfPage={nameOfPage}
										TableHeight={tableHeight}
										ModalIsOpen={modalIsOpen}
										PostItem={postItem}
										SetPostItem={setPostItem}
										SetIsOpen={setIsOpen}
										SetSubjects={setSubjects}
										SubjectHandler={subjectHandler} 
										ModalHandler={modalHandler} 
										SetFetchData={setFetchData}
										SetColumn={setColumn}
										SetHeader={setHeader}
										SetNameOfPage={setNameOfPage}
										SetTableHeight={setTableHeight}
										/>;
			case 3: return <AddUnit 	
										Subjects={subjects}
										SubjectHandler={subjectHandler}
										/>;
			case 4: return <AddQuestion 	
										Subjects={subjects}
										SubjectHandler={subjectHandler}
										/>;
			case 5: return <Assignment 
										Subjects={subjects}
										SubjectHandler={subjectHandler}
										PageHandler={props.PageHandler}
										UnitID={unitId}
										UnitHandler={UnitHandler}
										/>
			case 6: return <></>
			case 7:return <CreateAssignment
										Subjects={subjects}
										SubjectHandler={subjectHandler}
										PageHandler={props.PageHandler}
										UnitID={unitId}
										/>
		default:      return <h1></h1>
		}
	}
    return(
        <div id="main">
            <Nav  Page={props.Page}
                  PageHandler={props.PageHandler}/>
            <div>{ project() }</div>
        </div>
    )
}