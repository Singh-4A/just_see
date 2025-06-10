import React from "react";

const Pagination = ({ totalItem, perPage,setCurrentPage,showingBtn }) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItem / perPage); i++) {
    pages.push(i);
  }

  return (  
    <div>
      {pages.map((item,i) => {
        return <button onClick={()=>setCurrentPage(item)} key={i}>{item}</button>;
      })}
    </div>
  );
};

export default Pagination;
