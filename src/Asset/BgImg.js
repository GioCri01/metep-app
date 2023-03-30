 const background =
  {
    Clear:"https://media3.giphy.com/media/5PhRWWyHVy3goI9A0T/giphy.gif",
    Rain:"https://i.pinimg.com/originals/6a/f6/10/6af610112ee51bd2ca321fd0a4de5164.gif",
    Mist:"https://media.tenor.com/CHchDWaZDz4AAAAC/fog-smoke.gif",
    Clouds:"https://media.tenor.com/8xFu-vfptdkAAAAC/storm-dark-clouds.gif",
    Snow:"https://68.media.tumblr.com/20717407b96e9fdbc2e7d3a463552f97/tumblr_omu3x8GK2N1rlb7pso1_500.gif"
  }


export const findBG =(string)=>{
  if(Object.keys(background).includes(string)){
    return background[string]
  }  
}