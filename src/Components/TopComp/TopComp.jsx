import React,{useState,useEffect} from "react";
import '../TopComp/TopComp.css'
import{dataFormatter, tempFormatter,today} from '../../Utility/DataFormatter'
import {BsSunrise,BsSunset } from 'react-icons/bs'
import {FaTemperatureHigh } from 'react-icons/fa'
import {GrPowerReset } from 'react-icons/gr'
import {findBG} from "../../Asset/BgImg";


export default function TopComp(props){
   
    const{data,city,resetLocation,status,setCity} = props;
    const [dataMeteo, setDataMeteo] = useState(data);
    const [cityInput,setCityInput]= useState("");

    useEffect(() => {
      setDataMeteo(data)
   
  }, [data]);

  console.log("ciao",dataMeteo);
  console.log("status",status);
  console.log("oggi",today());

    return(
        <div 
        className="top-section"
         style={{ backgroundImage: `url(${findBG(dataMeteo.weather[0].main)})`}}
        >
            <div className="data-section">
              <div className="input-box">
                  <input 
                    type="text" 
                    placeholder="City..." 
                    style={status !== "ok" ? { backgroundColor: 'rgba(244, 90, 90, 0.458)'}:{}}
                    onChange={(e)=>setCityInput(e.target.value)}
                    />
                <button className="btn" type="submit" onClick={()=>{city(cityInput);setCity(cityInput)}} >Cerca</button>
                <span onClick={()=>resetLocation()}><GrPowerReset/></span>
              </div>
              
              <h2>{dataMeteo.name}</h2>
              
              <div>
              <h3>{dataMeteo.weather[0].description}</h3>
                <div className="sunset-sunrise" >
                  <p><BsSunrise/></p>
                  <p>{dataFormatter(data.sys.sunrise)}</p>
                </div>
                <div className="sunset-sunrise">
                  <p><BsSunset/></p>
                  <p>{dataFormatter(data.sys.sunset)}</p>
                </div> 
              </div>
            </div>
            <h1>{tempFormatter(data.main.temp)} <FaTemperatureHigh/></h1> 
            <div className="svg"></div>
        </div>
    )
}