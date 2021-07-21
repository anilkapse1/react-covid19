import React, { createContext, useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Test9 = () => {
  const [data, setData] = useState([]);

  const getCovidData = async () => {
    const res = await fetch("https://api.covid19india.org/data.json");
    const actualData = await res.json();
    console.log(actualData.statewise);
    setData(actualData.statewise);
  };

  useEffect(() => {
    getCovidData();
  }, []);

  const ctmStyle={
    textTransform: "uppercase"
  }

  const ctmSmall={
    fontSize: ".7rem"
  }

  return (
    <React.Fragment>
      <h1 className="mb-5 mt-5 text-center">india covid 19 tracker</h1>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr style={ctmStyle}>
              <th scope="col">state</th>
              <th scope="col">confirmed</th>
              <th scope="col">recovered</th>
              <th scope="col">deaths</th>
              <th scope="col">active</th>
              <th scope="col">update</th>
            </tr>
          </thead>
          <tbody>
            {
                data.map((val,ind)=>{
                    return (
                        <tr key={ind} style={ctmSmall}>
                            <td>{val.state}</td>
                            <td>{val.confirmed}</td>
                            <td>{val.recovered}</td>
                            <td>{val.deaths}</td>
                            <td>{val.active}</td>
                            <td>{val.lastupdatedtime}</td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default Test9;
