import React from "react";
import '../ErrorComp/ErrorComp.css'

export default function ErrorComp() {

    return(
        <div className="Error">
            <div className="content">
                <h1>Siamo spiacenti al momento il servizio non è disponibile</h1>
                <button onClick={()=>window.location.reload()}>ricarica</button>
            </div>
        </div>
        
    )
}