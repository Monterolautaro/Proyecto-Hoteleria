'use client'
import getResult from '@/helpers/searchBar'
import React, { useState } from 'react'
import SearchBarResults from './searchBarResults'

const SearchBar = () => {
const [result, setResult] = useState<string[]>([""])
const handleChange = async (e: string) => {
    if (e.length >= 3) {
       const result = await getResult(e)
        console.log(result)
        setResult(result)
    } 
      
    }

  return (
    <div>
      
<input className='w-18 bg-white m-auto text-black' 
    type='text'
    onChange={(e) => handleChange(e.target.value)}

/>
<SearchBarResults results={result}/>



    </div>
  )
}

export default SearchBar
