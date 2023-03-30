
export const dataFormatter = (data)=>{
    let date = new Date(data * 1000); 
    const options = { hour: "numeric", minute: "numeric" };
    return date.toLocaleString("it-IT",options)      
}

export const tempFormatter = (temp)=>{
    const celsiusTemp = temp - 273.15;
    return celsiusTemp.toFixed(0)
}

export const today = ()=>{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();

    if (today.getMonth()+1 <=9) {
        month = `0${today.getMonth()+1}`
    }
    if(today.getDate()<=9){
        day = `0${today.getDate()}`
    }

    return `${year}-${month}-${day}`
}