import React,{useEffect, useState }from 'react'
import './App.css'

const App = () => {
  const [input,setInput]=useState("");
  const [result,setResult]=useState([])
  const [showResults,setShowResults]=useState(false);
  const [cache,setCache]=useState({});
  const fetchData=async()=>{
    if(cache[input]){
      console.log('Cache Returned',input)
      setResult(cache[input]);
      return;
    }
    console.log('Api-call',input)
    const data=await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json=await data.json();
    setResult(json?.recipes);
    setCache((prev)=>({...prev,[input]: json?.recipes}));

  };
  useEffect(()=>{
    const timer=setTimeout(fetchData,300);
    return ()=>{
      clearTimeout(timer)
    }
   
  },[input]);
  return (
    <div className='App'>
      <h1>Search Engine Optimisation</h1>
      <div>
      <input 
      type='text'
      className='search-input'
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      onFocus={(e)=>setShowResults(true)}
      onBlur={()=>setShowResults(false)}
      
      ></input>

      {showResults && (
        <div className='results-container'>
        {result.map((r)=>(<span  className='results' key={r.id}>{r.name}</span>))}
      </div>

      )}
      
     

      </div>
      
    </div>
  )
}

export default App
