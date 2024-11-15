
import React from 'react'

const SearchBarResults: React.FC<{results:string[]}> = ({results}) => {
  return (
    <div>
      {results.map((result, key) => <h1 key={key}>{result}</h1>)}
    </div>
  )
}

export default SearchBarResults
