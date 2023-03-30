import React,{useState,useEffect} from "react";
import '../BottomComp/BottomComp.css'
import MeteoBoxComp from "../MeteoBoxComp/MeteoBoxComp";
import MeteoBoxStat from "../MeteoBoxStatComp/MeteoBoxStat";

export default function BottomComp(props){
   
    const{data,dataList} = props;
    const [dataMeteo, setDataMeteo] = useState(data);
    const [meteoList,setMetoList]= useState(dataList);
   
   

    useEffect(() => {

      setDataMeteo(data);
      setMetoList(dataList);
        
    }, [data,dataList]);

  console.log(meteoList);

    return(
        <div className="Bottom-comp">
            <MeteoBoxStat data={dataMeteo}/>  
            <MeteoBoxComp meteoList={meteoList}/>
        </div>
    )
}