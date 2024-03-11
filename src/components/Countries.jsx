import { useEffect, useState } from "react";



export default function Countries(){
    
    const [countries, setCountries] = useState([])
    const [visited, setVisited] = useState([])

    
    useEffect(()=>{
        fetch('https://restcountries.com/v3.1/all')
        .then(res=> res.json())
        .then(data=> setCountries(data))
    }, [])
    
    const isVisited = (country) => {
        return visited.some(cnt=> cnt.name.common == country.name.common)
    } 

    const handleVisitedCountry = (country) => {
        console.log(isVisited(country))
        if(!isVisited(country)){
            setVisited([...visited, country])
        }
    }

   
    // console.log(countries)
    return (
        <>
        <div className="">Visited: <span className="text-res-500">{visited.length}</span></div>
        <div className="mt-10 gird inline-grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
           { 
           countries.map(country=> 
           <div onClick={()=>handleVisitedCountry(country)} key={country.name.common} className="border-2 border-white rounded-md p-10 flex flex-col justify-center cursor-pointer">
            <img className="h-28" src={country.flags.png}/>
            <div className="font-bold mt-5 text-2xl">{country.name.common}</div>
           </div>)
            }
        </div>
        
        </>
    );
}