import React, { createContext, useEffect, useState } from 'react';

const Test8=()=>{
    const [num, setNum] = useState(0);
    const [num1, setNum1] = useState(0);
   
    return(
        <React.Fragment>
            <button onClick={()=>setNum(num+1)}>click here {num}</button>
            <button onClick={()=>setNum1(num1-1)}>click here {num1}</button>
        </React.Fragment>
    )


}

export default Test8;
