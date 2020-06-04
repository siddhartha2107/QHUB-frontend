import React from 'react'
import axios from 'axios'
import downloadicon from "../../../assets/download.svg"
import {Itable} from '../../Table'

export const AssignmentTable:React.FC<Itable>=(props:Itable)=>{
    const tableItems:any= [];
    const tableHeaders:any= [];

    const downloadHandler=(arg0:any)=>{
        axios .get("http://localhost:8089/api/assignment/generateAssignment",{
            headers: {
                "token":localStorage.getItem('token')
            },
            params:{
                "id":arg0
            },
            responseType:"blob"
        })
        .then(function(res:any){
            console.log("RES.DATA",res.data);
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'response.docx'); //or any other extension
            link.click();
        })
    }
    const infoconnectHandler=(arg0:any)=>{
        axios .get("http://localhost:808/api/assignment/postToInfoconnect",{
            headers: {
                "token":localStorage.getItem('token')
            },
            params:{
                "id":arg0
            }
        })
    }

    props.Data.forEach((x:any)=>{
        var arr:any=[]
        var row=[]

        for(var key in x){
            for(var colID in props.Columns){
                if(props.Columns[colID]=='image'){
                    if(x[props.Columns[colID]]){
                        arr.push(x[props.Columns[colID]]);
                    }
                    else{
                        arr.push("-");
                    }
                }
                else if(props.Columns[colID]=='outcomes_added'){

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
            <td>Assignment {arr[1]}</td>
            <td><button id="fourButton1" onClick={()=>{downloadHandler(arr[0])}}><img src={downloadicon}></img>Download</button></td>
            <td><button id="fourButton2" onClick={()=>{infoconnectHandler(arr[0])}}>Post to Infoconnect</button></td>
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