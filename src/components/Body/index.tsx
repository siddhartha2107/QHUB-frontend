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
	const [subjects,setSubjects]= React.useState([]);
	const [modalIsOpen,setIsOpen] = React.useState(false);
	const [unitId,setUnitId] = React.useState('')

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
				return <Login 			Page={props.Page}
										PageHandler={props.PageHandler}/>;
			case 2: return <AddSubject	
										Subjects={subjects}
										SetSubjects={setSubjects}
										SubjectHandler={subjectHandler} 
										ModalIsOpen={modalIsOpen}
										ModalHandler={modalHandler} 
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