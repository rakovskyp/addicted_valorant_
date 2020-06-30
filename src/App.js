import React from "react";
import axios from 'axios';
import "./App.css";
import { FaSearch } from "react-icons/fa";

const API_ENDPOINT = 'http://hn.algolia.com/api/v1/items/1';

const timeReducer = (state, action) => {
  switch (action.type) {
    case 'TIME_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'TIME_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'TIME_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
}

function App() {
  // useReducer Hook
  const [time, dispatchTime] = React.useReducer(
    timeReducer,
    { data: [], isLoading: false, isError: false }
  );

  // useEffect Hook
  

  // Function to handle the submit button being clicked
  const handleSubmit = (event) =>
  {
    console.log("You clicked Submit");

    dispatchTime({type: 'TIME_FETCH_INIT'});
    
    axios
      .get(`${API_ENDPOINT}`)
      .then(result => {
        dispatchTime({
          type: 'TIME_FETCH_SUCCESS',
          payload: result.data,
        });
      })
      .catch(() =>
        dispatchTime({ type: 'TIME_FETCH_FAILURE'} )
      );

    // Prevents browser from reloading once submit is clicked
    event.preventDefault();
  };

  return (
    <>
      <div >
        <h1 className="title" >Addicted to Valorant</h1>
        <h4 className="sub-title"> HOW MUCH TIME HAVE YOU SPENT ON VALORANT?</h4>

        <form className='search-box' onSubmit={handleSubmit}>
          <input className='search-txt' type="text" id="search" placeholder='riot id n shit'/>
          <a className='search-btn'>
            <FaSearch/>
          </a>
          {/* <button 
            type="submit">
            Submit
          </button> */}
        </form>

        {time.isError && <p className="err-load-txt">Something went wrong while fetching data</p>}

        {time.isLoading ? (<p>Loading...</p>) : (<p className="err-load-txt">{time.data.type}</p>)}
        
      </div>
    </>
  );
}

export default App;
