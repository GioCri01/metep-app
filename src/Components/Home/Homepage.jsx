import axios from "axios";
import React,{useState,useEffect} from "react";
import "../../Components/Home/Homepage.css"
import TopComp from "../TopComp/TopComp";
import LoaderComp from "../LoaderComp/LoaderComp";
import BottomComp from "../BottomComp/BottomComp";
import ErrorComp from "../ErrorComp/ErrorComp";
import{today} from '../../Utility/DataFormatter'




export default function Homepage() {
  
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [dataMeteo, setDataMeteo] = useState(null);
  const [error,setError] = useState("");
  const [status,setStatus]= useState("ok");
  const [meteoList,setMetoList]= useState(null);
  const [selectData,setSelectData]= useState([]);
  const [selectedData,setSelectedData]= useState(today())
  const [cityValue,setCityValue] = useState("")
 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          
      });
    }, []);

    useEffect(() => {
      if(location.latitude !== null && location.longitude!== null){
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=1267df0122390bd1ab083edba34b3ec1`)
        .then(function (response) {
          setDataMeteo(response.data) 
          setError(false)
        }).catch(function(error){
          console.log("errore",error);
          setError(true)
        })

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=1267df0122390bd1ab083edba34b3ec1`)
        .then(function(response){
          console.log(response.data.list);
          response.data.list.forEach(item => {
            if (!selectData.includes(item.dt_txt.split(" ")[0])) {
              selectData.push(item.dt_txt.split(" ")[0]);
              
            }
          });
          
          setMetoList(response.data.list.filter(item =>item.dt_txt.split(" ")[0] === selectedData)) 
        })
      }
      
  }, [location]);

  console.log("data",selectData);
  
  const FilterCity = (city)=>{
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1267df0122390bd1ab083edba34b3ec1`)
        .then(function (response) {
          setDataMeteo(response.data) 
          setStatus("ok") 
        }).catch(function(error){
          console.log(error.response.status);
          setStatus(error)
           
        })

        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=1267df0122390bd1ab083edba34b3ec1`)
        .then(function (response) {
          
          setMetoList(response.data.list.filter(item =>item.dt_txt.split(" ")[0] === today())) 
          setStatus("ok") 
        }).catch(function(error){
          console.log(error.response.status);
          setStatus(error)
           
        })
       
       
  }

  const resetLocation =()=>{
    setCityValue("")
    if(location.latitude !== null && location.longitude!== null){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=1267df0122390bd1ab083edba34b3ec1`)
    .then(function (response) {
      setDataMeteo(response.data)  
    }).catch(function(error){
      setError(true)
    })
    
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=1267df0122390bd1ab083edba34b3ec1`)
    .then(function(response){
      console.log(response.data.list[0].dt_txt.split(" ")[0]);
      setMetoList(response.data.list.filter(item =>item.dt_txt.split(" ")[0] === today())) 
    })
  
    }
  }

  const filtredByData = ()=>{
    
    if (cityValue !== "") {
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=1267df0122390bd1ab083edba34b3ec1`)
        .then(function (response) {
          
          setMetoList(response.data.list.filter(item =>item.dt_txt.split(" ")[0] === selectedData)) 
          setStatus("ok") 
        }).catch(function(error){
          console.log(error.response.status);
          setStatus(true)
           
        })
    }else{
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=1267df0122390bd1ab083edba34b3ec1`)
    .then(function(response){
      console.log(response.data.list[0].dt_txt.split(" ")[0]);
      setMetoList(response.data.list.filter(item =>item.dt_txt.split(" ")[0] === selectedData)) 
    }).catch(function(error){
      console.log(error.response.status);
      setStatus(true)
       
    })
    }
    
  }

  if(error === true){
    return(
      <>
      <ErrorComp/>
      </>
    )
  }
  
  return(
        <div className="Homepage">
          {dataMeteo?<TopComp data={dataMeteo} status={status}  city={FilterCity} setCity={setCityValue} resetLocation={resetLocation} />:<LoaderComp/>}
          {dataMeteo?
             <div className="select-data">
             <select onChange={(e)=>setSelectedData(e.target.value)} >
               {
                 selectData && selectData.map(item=>(
                   <option  value={item}>{item}</option>
                 ))
               }
               
             </select>
             <button onClick={()=>filtredByData()}>filtra per data</button>
           </div>
           :""
          }
         
          
          {dataMeteo?<BottomComp  data={dataMeteo} dataList={meteoList}/>:""}
          
        </div>
    )
    
}