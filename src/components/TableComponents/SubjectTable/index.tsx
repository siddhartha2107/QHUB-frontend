import React, {useEffect} from 'react'
// import {Itable} from '../../Table'
import {MyModal} from '../../MyModal/index'

export interface Itable{
    NameOfPage: string
    Header: any[]
    Data: any[]
    Columns: any[]
    TableHeight:string
}

export const SubjectTable:React.FC<Itable>=(props:Itable)=>{
    const [modalInputs,setModalInputs] = React.useState([<></>])

    const tableItems:any= [];
    const tableHeaders:any= [];
    const [modalIsOpen,setIsOpen] = React.useState(false);
    const [noOfField,setNoOfField] = React.useState(1);
    const [modalBody,setModalBody] = React.useState(
        <>
        </>
    );

	const modalHandler=(arg0:boolean)=>{
		setIsOpen(arg0);
    }
    const addFields=()=>{
        console.log("Running");
        setNoOfField(noOfField+1);
        setModalInputs(modalInputs=>modalInputs.concat(<>
            <input type="text" className="add-subject-name"></input>
            <button id="add-outcome" onClick={addFields}>+</button>
        </>))
        console.log("INPUTS:-",modalInputs)
    }
    const viewOutcome=(x:any)=>{
        setIsOpen(true);
        console.log("X-",x);
    }
    
    useEffect(()=>{
        setModalBody(
            <>
            NoofField:- {noOfField}
            <span>Add the Subject by the subject id or subject code</span>
				<div id="myModal-input">
                    <span>Subject Name</span>
                    <div className="subject-modal-input">
                        <input type="text"></input>
                        <button id="add-outcome" onClick={addFields}>+</button>
                        {modalInputs}
                    </div>

				</div>
				<div id="modal-submit"><button id="add-subject-btn">Add Subject</button></div>
        </>
        );
    },[noOfField]);

    props.Data.forEach((x:any)=>{
        var arr:any=[]
        var row=[]

        for(var key in x){
            for(var colID in props.Columns){
                if(props.Columns[colID]=='outcomes_added'){
                    
                    if(x[props.Columns[colID]]==true){
                        arr.push("True");
                    }else
                    {
                        arr.push("False");
                    }
                    
                }
                else {
                        arr.push(x[props.Columns[colID]]);
                }
            }
        }
        tableItems.push(<tr>
            <td>{arr[0]}</td>
            <td>{arr[1]}</td>
            <td>{arr[2]}</td>
            <td><button id="viewOutcome" onClick={()=>{viewOutcome(arr[3])}}>View Outcome</button></td>
        </tr>)
    })
    props.Header.forEach((x:string)=>{
        tableHeaders.push(<th>{x}</th>);
    });
    var tableStyle={
        height:props.TableHeight
    }

    return(
        <>
            <MyModal    ModalIsOpen={modalIsOpen}
                        ModalHandler={modalHandler}
                        ModalBody={modalBody}
            />
            <table id="list-table" style={tableStyle}>
                <tbody>
                    <tr>
                        {tableHeaders}
                    </tr>
                    {tableItems}
                </tbody>
            </table>
        </>
    )
}