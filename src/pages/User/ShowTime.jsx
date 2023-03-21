import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Filter from "../../components/User/Filters";
import Navbar from "../../components/User/Navbar";
import ShowTimePage from "../../components/User/ShowTiming";

function ShowTime() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [filters, setFilters] = useState([])
    const [count, setCount] = useState(0)
  const handleFilters = (item) => {
    const newData = filters;
    if (filters.indexOf(item) >= 0) {
      newData.splice(filters.indexOf(item), 1);
      setFilters(newData);
    } else {
      newData.push(item);
      setFilters(newData);
    }
    setCount((prev) => prev + 1);
  };
  return (
    // <div style={{ backgroundColor: "#F2F2F2", paddingBottom: 20 }}>
    <div style={{marginTop:"100px"}}>
      <Navbar />
      <div>

      <Filter handleFilters={handleFilters} filters={filters} />
      </div>
      <div>

      <ShowTimePage filters={filters} />
     
      </div>
    </div>
  );
}

export default ShowTime;