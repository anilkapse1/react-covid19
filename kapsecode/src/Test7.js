import React, { useState } from 'react';
import Keepnote from './Keepnote';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const Test7=()=>{

    const [setData, setFullData] = useState([]);
    const [data, fullData] = useState({
        question:'',
        ans:''
    })

    const setVal=(e)=>{
        const {name, value}=e.target;
        fullData((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }


    const getVal=()=>{
        setFullData((pre)=>{
            return [...pre,data];
        })

        fullData({
            question:'',
            ans:''
        })
    }

    return(
        <React.Fragment>

            <form noValidate autoComplete="off" className="d-flex p-2 bd-highlight">
                <TextField className="m-3" id="standard-basic" label="Question" value={data.question} name="question" onChange={setVal}/>
                <TextField className="m-3" id="standard-basic" label="Ans" value={data.ans} name="ans" onChange={setVal}/>
                <Button className="m-3" variant="contained" color="primary" onClick={getVal}>Add question</Button>
            </form>
      

            {
                setData.map((value, index)=>{
                    const {question,ans}=value;
                    return (
                           <Keepnote
                               key={index}
                               id={index}
                               question={question}
                               ans={ans}
                           /> 
                    )
                })
            }

        </React.Fragment>
    )
}

export default Test7;