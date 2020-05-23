import React, { useEffect } from 'react'
import axios from 'axios'


import { DropDown } from '../DropDown';
import { Table } from '../Table/index'
import { MyModal } from '../MyModal';
import './styles.css';

export interface IaddAssignment{
    Subjects:any[]
    SubjectHandler:(arg0:any)=>void;
    PageHandler:(arg0:number)=>void;
    UnitID:string
}

export const CreateAssignment:React.FC<IaddAssignment>=(props:IaddAssignment)=>{
    const [branchDropDownList,setBranchDropDownList] = React.useState([
        "CS","IT","EC","ME","CE"
    ]);
    const [yearDropDownList,setYearDropDownList] = React.useState([
        "1","2","3","4"
    ]);
    const [sectionDropDownList,setSectionDropDownList] = React.useState([
        "1","2","3"
    ]);
    const [typeDropDownList,setTypeDropDownList] = React.useState([
        "automatic","manual"
    ]);
    const [branchDropDown, setBranchDropDown] = React.useState('');
    const [yearDropDown, setYearDropDown] = React.useState('');
    const [sectionDropDown, setSectionDropDown] = React.useState('');
    const [branchDefVal,setBranchDefVal] = React.useState('Choose Branch');
    const [yearDefVal,setYearDefVal] = React.useState('Choose Year');
    const [sectionDefVal,setSectionDefVal] = React.useState('Choose Section');
    const [noOfQuestions,setNoOfQuestions] = React.useState('');
    const [assignmentNumber,setAssignmentNumber] = React.useState('')
    const [lastDataOfSubmission,setLastDateOfSubmission] = React.useState('');
    const [type,setType] = React.useState('');
    const [typeDefVal,setTypeDefValue] = React.useState('Generation Type')
    const [postItem, setPostItem] = React.useState(0);
    const [fetchData, setFetchData] = React.useState(0);

    const typeDropDownHandler=(arg0:string)=>{
        setType(arg0);
    }
    const branchDropDownHandler=(arg0:string)=>{
        setBranchDropDown(arg0);
    }
    const yearDropDownHandler=(arg0:string)=>{
        setYearDropDown(arg0);
    }
    const sectionDropDownHandler=(arg0:string)=>{
        setSectionDropDown(arg0);
    }
    const postItemHandler=()=>{
        setPostItem(postItem+1);
    }

    useEffect(()=>{
        if(postItem>0){
            axios .post("http://localhost:8089/api/assignment",{
                "assignment_no":assignmentNumber,
                "unit_id":props.UnitID,
                "type":type,
                "branch":branchDropDown,
                "year":yearDropDown,
                "section":sectionDropDown,
                "question_count":noOfQuestions,
                "last_date_of_submission":lastDataOfSubmission
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "token":localStorage.getItem('token')
                },
            })
            setFetchData(fetchData+1);
            props.PageHandler(5);
        }
    },[postItem])

    return(
        <div id="assignment-list">
            <span id="assignment-list-title">Create Assignment</span>
            <span id="assignment-list-detail">Select Details</span>
            <div id="assignment-list-box">
                <div id="box">
                    <DropDown   DropDownItems={branchDropDownList}
                                Dropdown={branchDropDown}
                                DropdownHandler={branchDropDownHandler}
                                DefValue={branchDefVal}
                                />
                    
                    {branchDropDown!='' && 
                    <DropDown   DropDownItems={yearDropDownList}
                                Dropdown={yearDropDown}
                                DropdownHandler={yearDropDownHandler}
                                DefValue={yearDefVal}
                                />}
                    {yearDropDown!='' && 
                    <DropDown   DropDownItems={sectionDropDownList}
                                Dropdown={sectionDropDown}
                                DropdownHandler={sectionDropDownHandler}
                                DefValue={sectionDefVal}
                                />}
                    
                    
                    {sectionDropDown!='' && 
                    <div id="assignment-inputs">
                        <div id="question-input-div">
                            <span>Number of Questions:-</span>
                            <input type="text" id="question-input" onChange={(e)=>setNoOfQuestions(e.target.value)}></input>
                        </div>
                        <div id="question-input-div">
                        <span>Assignment Number:-</span>
                            <input type="text" id="question-input" onChange={(e)=>setAssignmentNumber(e.target.value)}></input>
                        </div>
                        <div id="question-input-div">
                            <span>Last Date of Submission:-</span>
                            <input type="text" id="question-input" onChange={(e)=>setLastDateOfSubmission(e.target.value)}></input>
                        </div>
                            <DropDown
                                    DropDownItems={typeDropDownList}
                                    Dropdown={type}
                                    DropdownHandler={typeDropDownHandler}
                                    DefValue={typeDefVal}/>
                    </div>}
                </div>
                <div id="btm">
                    <button id="go-back" onClick={()=>props.PageHandler(5)}>Go Back</button>
                    <button id="add-subject-btn" onClick={()=>{postItemHandler()}}>Add Subject</button>
                </div>

            </div>
            
        </div>
    )
}