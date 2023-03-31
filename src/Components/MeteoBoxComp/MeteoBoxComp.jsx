import React,{useState,useEffect} from "react";
import '../MeteoBoxComp/MeteoBoxComp.css'
import{dataFormatter, tempFormatter} from '../../Utility/DataFormatter'
import {findBG} from "../../Asset/BgImg";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

export default function MeteoBoxComp(props) {
    const{meteoList}= props;
    const [data,setData]= useState(meteoList);
    const [start,setStart]= useState(0);
    const Max = 3;
    
   
    useEffect(() => {
        setData(meteoList);
        setStart(0);
    }, [meteoList]);
    
    
   console.log("meteo",meteoList);
   
   
   const right = ()=>{
        const newStart = (start + 1) % (data.length - 2)
        setStart(newStart);
        console.log((start + 1 )," ",(data.length - 2),"=",newStart);       
    }
    const left = ()=>{
        const newStart = (start - 1 + data.length - 2) % (data.length - 2) ;
        setStart(newStart);
        console.log((start - 1 + data.length - 2)," ",(data.length - 2),"=",newStart);
        
    }
    // let px = 0
    
    // const scrollLeft = ()=>{
    //     const div = document.getElementById("div");
    //     const box = document.getElementById("box").clientWidth;
    //         px += box*3;
    //         if (px >= div.scrollWidth) {
    //             px = 0;
    //         }
    //     div.scroll({
    //         left:px,
    //         behavior:"smooth"
    //     }); 
    //     console.log(div.clientWidth);
    //     console.log(px);    
    // }

    // const scrollRIght = ()=>{
    //     const div = document.getElementById("div");
    //     const box = document.getElementById("box").clientWidth;
      
    //     if (px <= 0) {
    //         px = div.scrollWidth;
    //     }else{
    //         px -= box*3;
    //     }
      
    //     div.scroll({
    //         left:px,
    //         behavior:"smooth"
    //     }); 

    //    console.log(div.scrollWidth);
    //    console.log(px);
    // }

    return(
        <div className="MeteoBox">
            <div id="div" className="meteo-hour">
                    {/* {
                        meteoList && meteoList.map(item =>(
                            <div 
                            id="box"
                            className="box"
                            style={{ backgroundImage: `url(${findBG(item.weather[0].main)})`}}
                            >
                                <span>{dataFormatter(item.dt)}</span>
                                <p>{item.weather[0].description}</p>
                                <p>{tempFormatter(item.main.temp)}°</p>
                            </div>
                        ))
                    }  */}

                    {
                        data && data.slice(start,start+Max).map(item =>(
                            <div 
                            id="box"
                            className="box"
                            style={{ backgroundImage: `url(${findBG(item.weather[0].main)})`}}
                            >
                                <span>{dataFormatter(item.dt)}</span>
                                <p>{item.weather[0].description}</p>
                                <p>{tempFormatter(item.main.temp)}°</p>
                            </div>
                        ))
                    } 
                </div>
                <div className="scroll">
                     <button onClick={()=>left()} ><BsFillArrowLeftCircleFill/></button>
                    <button  onClick={()=>right()}><BsFillArrowRightCircleFill   /></button>
                    
                    
                </div>
            </div>
    )
}