import React, { useEffect } from 'react'
import axios from 'axios'


import { DropDown } from '../DropDown';
import { Table } from '../Table/index'
import { MyModal } from '../MyModal';
import './styles.css';

export interface IaddQuestion{
    Subjects:any[]
    SubjectHandler:(arg0:any)=>void;
}

export const AddQuestion:React.FC<IaddQuestion>=(props:IaddQuestion)=>{
    const tableItems:any=[];
    //States
    const [questionHeader,setQuestionHeader] = React.useState([]);
    const [column,setColumn] = React.useState([]);
    const [questionList,setQuestionList] = React.useState([])
    const [question,setQuestion] = React.useState('');
    const [knowledgeLevel, setKnowledgeLevel] = React.useState('');
    const [image,setImage] = React.useState('');
    const [maxMarks, setMaxMarks] = React.useState('');
    const [minMarks, setMinMarks] = React.useState('');
    const [fetchData,setFetchData] = React.useState(0); //Controls Get call
    const [nameOfPage,setNameOfPage] = React.useState('question');
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
        </>
    );
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
    const questionHandler=(arg0:any)=>{
        setQuestionList(questionList=>questionList.concat(arg0))
    }
    const unitHandler=(arg0:any)=>{
        setUnits(units=>units.concat(arg0))
    }
    const handleQuestionChange=(arg0:string)=>{
        
        setQuestion(arg0);
        axios .post("http://localhost:8079/predict",{
            "question":arg0
        },{
            headers: {
                "content-type": "application/json",
            }
        }).then(function(res:any) {
            switch(res.data.prediction){
                case "Remembering": setKnowledgeLevel('1');
                                    break;
                case "Understanding": setKnowledgeLevel('2');
                                    break;
                case "Analyzing": setKnowledgeLevel('3');
                                    break;
                case "Applying": setKnowledgeLevel('4');
                                    break;
                case "Evaluation": setKnowledgeLevel('5');
                                    break;
                case "Creating": setKnowledgeLevel('6');
                                    break;
            }
            // setKnowledgeLevel();
        });
        
    }
    useEffect(()=>{
        setModalBody(<>
            <span>Add the Unit details here</span>
                <div id="myModal-input">
                <span>Question</span>
                <input type="text" id="add-question" onChange={(e)=>handleQuestionChange(e.target.value)}></input>
                <span>Knowledge Level</span>
                <input type="text" value={knowledgeLevel} id="add-knowledge-level" onChange={(e)=>setKnowledgeLevel(e.target.value)}></input>
                <span>Max Marks</span>
                <input type="text" id="add-max-marks" onChange={(e)=>setMaxMarks(e.target.value)}></input>
                <span>Min Marks</span>
                <input type="text" id="add-min-marks" onChange={(e)=>setMinMarks(e.target.value)}></input>
                <span>Image URL</span>
                <input type="text" id="add-image-url" onChange={(e)=>setImage(e.target.value)}></input>
                </div>
                <div id="modal-submit"><button id="submit-btn" onClick={()=>{postItemHandler()}}>Add Subject</button></div>
        </>);
    },[knowledgeLevel])

    useEffect(()=>{
        if(postItem>0){
            axios .post("http://localhost:8089/api/question",{
                "question":question,
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
        setIsOpen(false);
    },[postItem])

    useEffect(()=>{
        setQuestionList([]);
        axios .get(
            "http://localhost:8089/api/question",
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
			// console.log(res.data);
            questionHandler(res.data);
		});
    },[selectedUnitId,fetchData])

    useEffect(()=>{
        ["Q.ID","Question","Min. Marks","Max. Marks","Image"].forEach((x:any)=>{
            setQuestionHeader(questionHeader=>questionHeader.concat(x))
        });
        ["id","question","min_marks","max_marks","image"].forEach((x:any)=>{
            setColumn(column=>column.concat(x));
        });
        props.Subjects.forEach((x:any)=>{
            setSubjectDropDownList(subjectDropDownList=>subjectDropDownList.concat(x.name))
        });
    },[]);
    
    useEffect(()=>{
        props.Subjects.forEach((x:any)=>{

            if(x.name==subjectDropDown){
                setSelectedSubjectCode(x.subject_code);
                setSelectedSubjectId(x.id)
            }
        })
    },[subjectDropDown])

    useEffect(()=>{
        units.forEach((x:any)=>{
            if(x.name==unitDropDown){
                setSelectedUnitId(x.id);
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
    console.log("subjectDropDown:", subjectDropDown);
    console.log("unitDropDown:", unitDropDown);
    console.log("Selected Subject is ",selectedSubjectId);
    console.log("Selected Unit is",selectedUnitId);
    
    return(
        <div id="question-list">
            <span id="unit-list-title">Add Question</span>
            <span id="unit-list-detail">Find the list of subjects and units to start with adding questions.</span>
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
                    <Table  Header={questionHeader}
                            Data={questionList}
                            Columns={column}
                            TableHeight={tableHeight}
                            NameOfPage={nameOfPage}/>
                    <div id="question-btm">
                        <button id="add-subject-btn" onClick={()=>setIsOpen(true)}>Add Subject</button>
                        <MyModal  ModalIsOpen={modalIsOpen}
                                PostItem={postItem}
                                ModalHandler={modalHandler}
                                ModalBody={modalBody}
                        />
                    </div>
                </>}
            </div>
            
        </div>
    )
}