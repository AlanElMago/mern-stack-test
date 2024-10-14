import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from 'react-icons/md';
import { API_URL, API_PORT } from "../config.js";
import BookCardsView from "../components/home/BookCardsView";
import BookTableView from "../components/home/BookTableView";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}:${API_PORT}/books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  return ( 
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setViewMode('table')}
        >
          Table
        </button>
        <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setViewMode('cards')}
        >
          Cards
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : viewMode === 'table' ? (<BookTableView books={books} />) : (<BookCardsView books={books} />) }
    </div>
  )
}

export default Home;
