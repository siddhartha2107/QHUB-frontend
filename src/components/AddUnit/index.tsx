import React, { useEffect } from 'react'
import axios from 'axios'


import { DropDown } from '../DropDown';
import { Table } from '../Table/index'
import { MyModal } from '../MyModal';
import './styles.css';


export interface IaddUnit{
    Subjects:any[]
    SubjectHandler:(arg0:any)=>void;
}

export const AddUnit:React.FC<IaddUnit>=(props:IaddUnit)=>{

    const [selectedSubjectId,setSelectedSubjectId] = React.useState('')
    const [fetchData,setFetchData] = React.useState(0); //Controls Get call
    const [subjectDefVal,setSubjectDefVal] = React.useState('Choose Subject');
    //Table
    const [unitHeader,setUnitHeader] = React.useState([]);
    const [column,setColumn] = React.useState([]);
    const [units,setUnits] = React.useState([]);
    const [selectedSubjectCode,setSelectedSubjectCode] = React.useState('')
    const [nameOfPage,setNameOfPage] = React.useState('unit');
    const [tableHeight,setTableHeight] = React.useState('40vh');
    //DropDown
    const [dropdown,setDropDown] = React.useState('');
    const [dropdownList,setDropDownList] = React.useState([]);
    //ModalStates
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [unitName,setUnitName] = React.useState('')
    const [unitNo,setUnitNo] = React.useState('')
    const [outcomeId,setOutcomeId] = React.useState('')
    const [postItem,setPostItem] = React.useState(0);
    const [modalBody,setModalBody] =React.useState(
        <>
            <span>Add the Unit details here</span>
                <div id="myModal-input">
                <span>Unit Name</span>
                <input type="text" id="add-subject-name" onChange={(e)=>setUnitName(e.target.value)}></input>
                <span>Unit No</span>
                <input type="text" id="add-subject-code" onChange={(e)=>setUnitNo(e.target.value)}></input>
                <span>Outcome Id</span>
                <input type="text" id="add-outcome-id" onChange={(e)=>setOutcomeId(e.target.value)}></input>
                </div>
                <div id="modal-submit"><button id="add-subject-btn" onClick={()=>{postItemHandler()}}>Add Subject</button></div>
        </>
    );

    //Handler Functions
    const dropdownHandler=(arg0:string)=>{
        setDropDown(arg0)
    }
    const unitHandler=(arg0:any)=>{
        setUnits(units=>units.concat(arg0))
    }
    const postItemHandler=()=>{
        setPostItem(postItem+1);
    }
    const modalHandler=(arg0:boolean)=>{
        setIsOpen(arg0)
    }

    //Set Unit Header, Table Columns, Dropdown List
    useEffect(()=>{
        ["Unit No","Unit Name","Cognitive Level"].forEach((x:any)=>{
            setUnitHeader(unitHeader=>unitHeader.concat(x));
        });
        ["id","name","outcome_id"].forEach((x:any)=>{
            setColumn(column=>column.concat(x));
        });
        
        props.Subjects.forEach((x:any)=>{
            setDropDownList(dropdownList=>dropdownList.concat(x.name))
        })
    },[])
    //Select Subject
    useEffect(()=>{
        unitHandler([]);
        props.Subjects.forEach((x:any)=>{
            if(x.name==dropdown){
                setSelectedSubjectCode(x.subject_code);
                setSelectedSubjectId(x.id)
            }
        })
    },[dropdown])
    //Post Request to add unit.
    React.useEffect(() => {
        if(postItem>0){
          console.log("postItem was true")
          
          axios .post("http://localhost:8089/api/unit",
          {
              "name":unitName,
              "subject_id":selectedSubjectId,
              "outcome_id":outcomeId,
              "unit_no":unitNo
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
    //Get unit items
    useEffect(()=>{
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
			// console.log(res.data);
            unitHandler(res.data);
		});
    },[selectedSubjectCode,fetchData])
    return(
        <div id="unit-list">
            <span id="unit-list-title">Add Unit</span>
            <span id="unit-list-detail">Find the list of subjects to start with adding unit.</span>
            <div id="unit-list-box">
                <DropDown   DropDownItems={dropdownList}
                            Dropdown={dropdown}
                            DropdownHandler={dropdownHandler}
                            DefValue={subjectDefVal}
                            />     
                {dropdown!='' && 
                <>
                    <Table  Header={unitHeader}
                            Data={units}
                            Columns={column}
                            TableHeight={tableHeight}
                            NameOfPage={nameOfPage}/>
                    <div id="unit-btm">
                        <button id="add-subject-btn" onClick={()=>setIsOpen(true)}>Add Subject</button>
                        {dropdown!='' && <MyModal  ModalIsOpen={modalIsOpen}                                
                                ModalHandler={modalHandler}
                                ModalBody={modalBody}
                        />}
                    </div>
                </>}
            </div>
            
        </div>
    )
}