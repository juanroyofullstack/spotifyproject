import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'

export const Search = ({search}) => {
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);
    const navigate = useNavigate();
    const [count, setCount] = useState('');
    const searchs = useLocation().search;
    const lookForSearch=(event)=> {
        if (event.charCode === 13) {
            event.preventDefault();
            localStorage.setItem('search', count)
            navigate(`?q=${ count }`)
            search(count)
        }
    }
    const onInit=()=> {
        const q = new URLSearchParams(searchs).get('q');
        if(q){
          return setCount(q)
        }
      }
    useEffect(()=> {
        onInit()
    }, [])
  return (
    <div className="inputDisplay">
        <input onChange={(e)=> {setCount(e.target.value)}} onKeyPress={lookForSearch} value={ count }></input>
        <button onClick={lookForSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
    </div>
  )
}
