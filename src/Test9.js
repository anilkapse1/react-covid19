import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Test9 = () => {

  const [country, setCountry] = useState("");
  const findCountry=(e)=>{
    const {value} = e.target;
    setCountry(value);
  }

  console.log(country.toLowerCase());
  const [latest, setLatest] = useState([]);
  const [data, setData] = useState([]);

  const colorSet = ['Light','Danger','Success'];
  const covidData = ['cases','deaths','recover'];
  const {TotalConfirmed, TotalDeaths,TotalRecovered} = latest;
  const globdata = [TotalConfirmed,TotalDeaths,TotalRecovered];

  const searchResult = data.filter((val,index)=>{
    return country!==""?val.Country.includes(country):val;
  }) 
  console.log(searchResult);


  //useeffect start
  useEffect(()=>{
    axios.get('https://api.covid19api.com/summary')
    .then(res=>{
      setLatest(res.data.Global);
      setData(res.data.Countries);

    })
    .catch(err=>{
      console.log(err);
    }
    )
  },[]);



  return (
    <React.Fragment>
      <TextField className="mt-5" id="standard-basic" label="Search Country" variant="standard" onChange={findCountry}/>
     <Typography className="m-2" variant="overline" display="block" gutterBottom>
         
      </Typography>
    <div className="d-flex flex-row flex-wrap">
      {colorSet.map((variant, idx) => {
        return (
          <Card
            bg={variant.toLowerCase()}
            key={idx}
            text={variant.toLowerCase() === "light" ? "dark" : "white"}
            style={{ width: "18rem" }}
            className="m-2"
          >
            <Card.Header>{covidData[idx]}</Card.Header>
            <Card.Body>
              <Card.Text>
                {globdata[idx]}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      </div>


      <div className="d-flex flex-row flex-wrap">
      {searchResult.map((variant, idx) => {
        return (
          <Card
            bg="Success"
            key={idx}
            style={{ width: "18rem" }}
            className="m-2"
          >
            <Card.Header>{variant.Country}</Card.Header>
            <Card.Body>
            <Card.Text>
                {variant.TotalConfirmed}
              </Card.Text>
              <Card.Text>
                {variant.TotalDeaths}
              </Card.Text>
              <Card.Text>
                {variant.TotalRecovered}
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
      </div>


    </React.Fragment>
  );
}
export default Test9;
