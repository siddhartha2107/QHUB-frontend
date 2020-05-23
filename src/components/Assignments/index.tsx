import React, { useEffect } from 'react'
import axios from 'axios'


import { DropDown } from '../DropDown';
import { Table } from '../Table/index'
import { MyModal } from '../MyModal';
import './styles.css';
import { CreateAssignment } from '../CreateAssignment';

export interface IaddAssignment{
    Subjects:any[]
    SubjectHandler:(arg0:any)=>void;
    PageHandler:(arg0:number)=>void;
    UnitID:string
    UnitHandler:(arg0:string)=>void;
}

export const Assignment:React.FC<IaddAssignment>=(props:IaddAssignment)=>{
    const tableItems:any=[];
    //States
    const [assignmentHeader,setAssignmentHeader] = React.useState([]);
    const [column,setColumn] = React.useState([]);
    const [assignmentList,setAssignmentList] = React.useState([])
    const [assignment,setAssignment] = React.useState('');
    const [knowledgeLevel, setKnowledgeLevel] = React.useState('');
    const [image,setImage] = React.useState('');
    const [maxMarks, setMaxMarks] = React.useState('');
    const [minMarks, setMinMarks] = React.useState('');
    const [fetchData,setFetchData] = React.useState(0); //Controls Get call
    const [noOfRow,setNoOfRow] = React.useState(4);
    const [subjectDefVal,setSubjectDefVal] = React.useState('Choose Subject');
    const [unitDefVal,setUnitDefVal] = React.useState('Choose Unit');
    //DropDown
    const [units,setUnits] = React.useState([]);
    const [subjectDropDown,setSubjectDropDown] = React.useState('');
    const [unitDropDown,setUnitDropDown] = React.useState('');
    const [subjectDropDownList,setSubjectDropDownList] = React.useState([]);
    const [unitDropDownList,setUnitDropDownList] = React.useState([]);
    const [selectedSubjectId,setSelectedSubjectId] = React.useState('')
    const [selectedSubjectCode,setSelectedSubjectCode] = React.useState('')
    const [selectedUnitId,setSelectedUnitId] = React.useState('')
    //ModalStates
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [postItem,setPostItem] = React.useState(0);
    const [tableHeight,setTableHeight] = React.useState('34vh');
    const [modalBody,setModalBody] =React.useState(
        <>
            <span>Add the Unit details here</span>
                <div id="myModal-input">
                <span>Assignment No.</span>
                <input type="text" id="add-assignment-name" onChange={(e)=>setAssignment(e.target.value)}></input>
                <span>Branch</span>
                <input type="text" id="add-branch" onChange={(e)=>setKnowledgeLevel(e.target.value)}></input>
                <span>Year</span>
                <input type="text" id="add-year" onChange={(e)=>setMaxMarks(e.target.value)}></input>
                <span>Section</span>
                <input type="text" id="add-section-id" onChange={(e)=>setMinMarks(e.target.value)}></input>
                <span>Question Count</span>
                <input type="text" id="add-outcome-id" onChange={(e)=>setImage(e.target.value)}></input>
                <span>Last Date of Submission</span>
                <input type="text" id="add-outcome-id" onChange={(e)=>setImage(e.target.value)}></input>
                
                </div>
                <div id="modal-submit"><button id="add-subject-btn" onClick={()=>{postItemHandler()}}>Add Subject</button></div>
        </>
    );
    //StateHandlers
    const subjectDropDownHandler=(arg0:string)=>{
        setSubjectDropDown(arg0)
    }
    const unitDropDownHandler=(arg0:string)=>{
        setUnitDropDown(arg0)
    }
    const postItemHandler=()=>{
        setPostItem(postItem+1);
    }
    const modalHandler=(arg0:boolean)=>{
        setIsOpen(arg0)
    }
    const assignmentHandler=(arg0:any)=>{
        setAssignmentList(assignmentList=>assignmentList.concat(arg0))
    }
    const unitHandler=(arg0:any)=>{
        setUnits(units=>units.concat(arg0))
    }


    useEffect(()=>{
        if(postItem>0){
            axios .post("http://localhost:8089/api/assignment",{
                "assignment":assignment,
                "unit_id":selectedUnitId,
                "knowledge_level":knowledgeLevel,
                "image":image,
                "min_marks":minMarks,
                "max_marks":maxMarks
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "token":localStorage.getItem('token')
                },
            })
            setFetchData(fetchData+1);
        }    
    },[postItem])

    useEffect(()=>{
        if(selectedUnitId!=''){
            setAssignmentList([]);
            axios .get(
                "http://localhost:8089/api/assignment",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "token":localStorage.getItem('token')
                    },
                    params: {
                        "unit_id":selectedUnitId
                    }

                }
            )
            .then(function(res:any) {
                assignmentHandler(res.data);
            });
        }
    },[selectedUnitId,fetchData])

    useEffect(()=>{
        ["ID","Assignment","Download","On Infoconnect"].forEach((x:any)=>{
            setAssignmentHeader(assignmentHeader=>assignmentHeader.concat(x))
        });
        ["id","assignment_no","min_marks","max_marks","image"].forEach((x:any)=>{
            setColumn(column=>column.concat(x));
        });
        props.Subjects.forEach((x:any)=>{
            setSubjectDropDownList(subjectDropDownList=>subjectDropDownList.concat(x.name))
        });
    },[]);
    
    useEffect(()=>{
        props.Subjects.forEach((x:any)=>{
            // console.log("X:",x)
            if(x.name==subjectDropDown){
                setSelectedSubjectCode(x.subject_code);
                setSelectedSubjectId(x.id)
            }
        })
    },[subjectDropDown])

    useEffect(()=>{
        units.forEach((x:any)=>{
            if(x.name==unitDropDown){
                console.log("x.unit_id",x.id)
                setSelectedUnitId(x.id);
                props.UnitHandler(x.id);
            }
        })        
    },[unitDropDown])

    useEffect(()=>{
        units.forEach((x:any)=>{
            setUnitDropDownList(unitDropDownList=>unitDropDownList.concat(x.name))
        });
    },[units])

    useEffect(()=>{
        if(selectedSubjectCode!=''){
            axios .get(
                "http://localhost:8089/api/unit",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "token":localStorage.getItem('token')
                    },
                    params: {
                        "subject_code":selectedSubjectCode
                    }
                }
            )
            .then(function(res:any) {
                console.log(res.data);
                unitHandler(res.data);
            });
        }
    },[selectedSubjectCode,fetchData])

    console.log("Selected Subject is ",selectedSubjectId);
    console.log("Selected Unit is",selectedUnitId);

    return(
        <div id="assignment-list">
            <span id="unit-list-title">Add Assignment</span>
            <span id="unit-list-detail">Find the list of subjects and units to start with adding assignments.</span>
            <div id="unit-list-box">
                <DropDown   DropDownItems={subjectDropDownList}
                            Dropdown={subjectDropDown}
                            DropdownHandler={subjectDropDownHandler}
                            DefValue={subjectDefVal}
                            />
                {subjectDropDown!='' && 
                <DropDown   DropDownItems={unitDropDownList}
                            Dropdown={unitDropDown}
                            DropdownHandler={unitDropDownHandler}
                            DefValue={unitDefVal}
                            />}
                {unitDropDown!='' && 
                <>
                    <Table  Header={assignmentHeader}
                            Data={assignmentList}
                            Columns={column}
                            TableHeight={tableHeight}
                            NoOfRow={noOfRow}/>
                    <div id="assignment-btm">
                        <button id="add-subject-btn" onClick={()=>props.PageHandler(7)}>Add Subject</button>
                        
                    </div>
                </>}
            </div>
            
        </div>
    )
}