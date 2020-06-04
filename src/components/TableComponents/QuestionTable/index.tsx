import React from 'react'

import icon from "../../../assets/browse-image.svg"
import {Itable} from '../../Table'

export const QuestionTable:React.FC<Itable>=(props:Itable)=>{
    const tableItems:any= [];
    const tableHeaders:any= [];

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