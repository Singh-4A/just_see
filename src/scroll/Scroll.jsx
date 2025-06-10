import React, { useCallback, useEffect, useState } from "react";
import "./scroll.css";
import { paginationData } from "../utilal";
import Pagination from "../pagintion/pagination";

function Scroll() {
  // i have created Infinity scroll

  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  // const lastIndex = page * postPerPage;
  // const firstIndex = lastIndex - postPerPage;

  // const totalData = paginationData.slice(firstIndex, lastIndex);
  // console.log(lastIndex, "totalData");


  const [item, setItems] = useState([...new Array(50)]);
  const [page, setPage] = useState(1);

  // Array.prototype.myMap = function (callback) {
  //   if (typeof callback !== "function") {
  //     throw new TypeError("Callback must be a function");
  //   }
  //   const result = [];
  //   for (let i = 0; i < this.length; i++) {
  //     result.push(callback(this[i], i, this));
  //   }
  //   return result;
  // };

  return (
    <div className="box">
      <div className="container">{loading && "Loading..."}</div>

      
    </div>
  );
}

export default Scroll;
