import React, { useState } from 'react'

export default function PicHandler() {
    const [test,setTest] =useState(false)
    const obj ={

        1 : "hi",
        2: "my", 
        3 : "Name",
        4: "is",
    
        5:"qika qika ",
        6:"slim Shady"
    
        
    }
    console.log(obj[1])
    const arr = [obj[6]]
    const irr = [obj[1]]
    
   const HandleTest = () => {
    if (x === imageType)
        setTest(true)

   }
   const inget = " "


    {test? ({arr}):(inget)}
    
    
  return (
    <div>
     {arr}
    </div>
  )
}
