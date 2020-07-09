import React from "react";
import axios from 'axios';
import "./App.css";
import { FaSearch } from "react-icons/fa";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/items/';

// reducer function
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

  // useState hook for the inputted username in the search bar
  const [userInput, setUserInput] = React.useState();

  // Function to handle when the input to the search bar is changed
  const handleSearchInput = (event) =>
  {
    setUserInput(event.target.value);
  }

  // Function to handle the submit button being clicked
  const handleSubmit = (async (event) =>
  {
    // Prevents browser from reloading once submit is clicked
    event.preventDefault();

    console.log("You clicked Submit. Now with async");

    dispatchTime({type: 'TIME_FETCH_INIT'});
    
    try {
      const result = await axios.get(`${API_ENDPOINT}${userInput}`);

      dispatchTime({
        type: 'TIME_FETCH_SUCCESS',
        payload: result.data,
      });
    }
    catch {
      dispatchTime({ type: 'TIME_FETCH_FAILURE'} )
    }
  });

  return (
    <>
      <div className='container' >
        <h1 className="title" >Addicted to Valorant</h1>
        <h4 className="sub-title"> HOW MUCH TIME HAVE YOU SPENT ON VALORANT?</h4>

        <form className='search-box' onSubmit={handleSubmit}>
          <input className='search-txt' type="text" id="search" placeholder='riot id n shit' onChange={handleSearchInput}/>
          <a className='search-btn'>
            <FaSearch/>
          </a>
          {/* <button 
            type="submit">
            Submit
          </button> */}
        </form>

        <div className='data'>
        {time.isError && <p className="err-load-txt">Something went wrong while fetching data</p>}

        {time.isLoading ? (<p>Loading...</p>) : 
        (<p className="err-load-txt">{time.data.title}</p>)}
        </div>
      </div>
    </>
  );
}

export default App;
