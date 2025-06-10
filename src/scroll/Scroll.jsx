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
  console.log(item,'item')
  const [page, setPage] = useState(1);

  Array.prototype.myMap = function (callback) {
    if (typeof callback !== "function") {
      throw new TypeError("Callback must be a function");
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback(this[i], i, this));
    }
    return result;
  };

  return (
    <div className="box">
      <div className="container">{loading && "Loading..."}</div>

      {/* <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
              </tr>
            </thead>
            {totalData.myMap((item, i) => {
              return (
                <>
                  <tbody>
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                      </tr>
                  </tbody>
                </>
              );
            })}
          </table> */}
      {/* <Pagination  setCurrentPage={setPage} */}

      {/* showingBtn={totalData} totalItem={paginationData.length} perPage={postPerPage}/>
      {loading && "Loading"} */}
    </div>
  );
}

export default Scroll;
