import React, { useEffect } from 'react'
import icon from "../../assets/browse-image.svg"
import downloadicon from "../../assets/download.svg"
import './styles.css'
import axios from 'axios'
import { Infoconnect } from '../Infoconnect'

export interface Itable{
    NoOfRow: number
    Header: any[]
    Data: any[]
    Columns: any[]
    TableHeight:string
}

export const Table:React.FC<Itable>=(props:Itable)=>{
    const [data,setData] = React.useState([]);
    const tableItems:any= [];
    const tableHeaders:any= [];
    var id:any;
    
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
                }else{
                    arr.push(x[props.Columns[colID]]);
                }
            }
        }
        
        if(props.NoOfRow==3)
        {
            tableItems.push(<tr>
                <td>{arr[0]}</td>
                <td>{arr[1]}</td>
                <td>{arr[2]}</td>
            </tr>)
        }
        else if(props.NoOfRow==5){
            id=arr[0];
            console.log("id:-",id,"arr[0]:-",arr[0]);
            console.log("Arr4:",arr[4],"|")

            if(arr[4]=='-'){
                tableItems.push(<tr>
                    <td>{arr[0]}</td>
                    <td>{arr[1]}</td>
                    <td>{arr[2]}</td>
                    <td>{arr[3]}</td>
                    <td>-</td>
                </tr>)
            }
            else{
                tableItems.push(<tr>
                    <td>{arr[0]}</td>
                    <td>{arr[1]}</td>
                    <td>{arr[2]}</td>
                    <td>{arr[3]}</td>
                    <td><a href={arr[4]} target="_blank" ><img src={icon}></img></a></td>
                </tr>)
            }
        }
        else if(props.NoOfRow==4){
            id=arr[2];
            tableItems.push(<tr>
                <td>{arr[0]}</td>
                <td>Assignment {arr[1]}</td>
                <td><button id="fourButton1" onClick={()=>{downloadHandler(arr[0])}}><img src={downloadicon}></img>Download</button></td>
                <td><button id="fourButton2" onClick={()=>{infoconnectHandler(arr[0])}}>Post to Infoconnect</button></td>
            </tr>)
        }
        
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
    </>)    
}