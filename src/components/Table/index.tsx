import React, { useEffect } from 'react'
import './styles.css'

import {SubjectTable} from '../TableComponents/SubjectTable'
import {UnitTable} from '../TableComponents/UnitTable'
import {QuestionTable} from '../TableComponents/QuestionTable'
import {AssignmentTable} from '../TableComponents/AssignmentTable'

export interface Itable{
    NameOfPage: string
    Header: any[]
    Data: any[]
    Columns: any[]
    TableHeight:string
}

export const Table:React.FC<Itable>=(props:Itable)=>{

    const table=()=>{
        switch(props.NameOfPage) {
            case 'subject': {
                return <SubjectTable    Header={props.Header}
                                        Data={props.Data}
                                        Columns={props.Columns}
                                        TableHeight={props.TableHeight}
                                        NameOfPage={props.NameOfPage}
                        />
            }
            case 'unit': {
                return <UnitTable       Header={props.Header}
                                        Data={props.Data}
                                        Columns={props.Columns}
                                        TableHeight={props.TableHeight}
                                        NameOfPage={props.NameOfPage}
                        />
            }
            case 'question': {
                return <QuestionTable   Header={props.Header}
                                        Data={props.Data}
                                        Columns={props.Columns}
                                        TableHeight={props.TableHeight}
                                        NameOfPage={props.NameOfPage}
                />
            }
            case 'assignment': {
                return <AssignmentTable Header={props.Header}
                                        Data={props.Data}
                                        Columns={props.Columns}
                                        TableHeight={props.TableHeight}
                                        NameOfPage={props.NameOfPage}
                />
            }
        }
    }
    return(
    <>
        { table() }
    </>)    
}