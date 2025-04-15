import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [input,setInput]=useState("")
  const [result,setResult]=useState([]);
  const [showResults,setShowResults]=useState(false);
  const [cache,setCache]=useState({})
  const fetchData=async()=>{
    if(cache[input]){
      console.log('Cache returned',input);
      setResult(cache[input]);
      return;
      
    }
    const data=await fetch('https://dummyjson.com/recipes/search?q=' + input);
    const json=await data.json();
    setResult(json?.recipes);
    setCache((prev)=>({...prev,[input]:json?.recipes}))
    console.log('Api call:'+ input)
  }
  useEffect(()=>{
    const timer=setTimeout(fetchData,300)
    return (()=>{
      clearTimeout(timer)
    })
    
  },[input])
  
  return (
    <div className='App'>
      <h1>Search Optimisation</h1>
      <input 
      value={input} 
      type='text'
       className='input' 
       onChange={(e)=>setInput(e.target.value)}
       onFocus={(e)=>setShowResults(true)}
       onBlur={()=>setShowResults(false)}/>
       {showResults && (
        <div className='result-container'>
        {result.map((value)=>(<span key={value.id} className='result'>{value.name}</span>))}
        
      </div>

       )}
      
      
    </div>
  )
}

export default App
