import React,{useEffect,useState} from "react";
import '../MeteoBoxStatComp/MeteoBoxStat.css';

export default function MeteoBoxStat(props) {
    const{data}=props;
    const [dataMeteo, setDataMeteo] = useState(data);

    useEffect(() => {

        setDataMeteo(data);
      }, [data]);

    return(
        <div className="bottom-section">
            
       
            <div className="stat">
                <h3>Umidità</h3>
                <p>{dataMeteo.main.humidity} %</p>
            </div>
            <div className="stat">
                <h3>Vento</h3>
                <p>{dataMeteo.wind.speed} Km/h</p>
            </div>
            <div className="stat">
                <h3>Pressione</h3>
                <p>{dataMeteo.main.pressure}</p>
            </div>
            <div className="stat">
                <h3>Visibilità</h3>
                <p>{dataMeteo.visibility}</p>
            </div>
            
        </div>
        
    )
}