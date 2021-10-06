import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Badge } from "react-bootstrap";
import axios from 'axios';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const Test9 = () => {

  const [country, setCountry] = useState("");
  const findCountry=(e)=>{
    const {value} = e.target;
    const searchText =  value.charAt(0).toUpperCase()+value.slice(1);
    setCountry(searchText);
  }

  console.log(country);
  const [latest, setLatest] = useState([]);
  const [data, setData] = useState([]);

  const colorSet = ['info','Danger','Success'];
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
         {country}
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
                TotalConfirmed:  <Badge bg="info">{variant.TotalConfirmed}</Badge>
              </Card.Text>
              <Card.Text>
                TotalDeaths:  <Badge bg="danger">{variant.TotalDeaths}</Badge>
              </Card.Text>
              <Card.Text>
                TotalRecovered:  <Badge bg="success">{variant.TotalRecovered}</Badge>
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
