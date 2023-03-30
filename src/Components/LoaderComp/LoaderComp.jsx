import React from "react";
import '../LoaderComp/LoaderComp.css'

export default function LoaderComp() {
    return(
        <div className="loader">
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
        
    )
}