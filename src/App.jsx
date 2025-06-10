import React, { useContext } from "react";
import "./App.css";
// import ProgressBar from "./progress";
// import Todo from "./Todo/todo";
import Navbar from "./nabvar/Navbar";
import { createContextData } from "./contextapi/contextApi";
// import { createPortal } from "react-dom";
// import { Modal } from "./modal/modal";

function App() {
  // State for progress bar value
  // Ref to store interval ID for cleanup
  // const intervalId = useRef(null);

  // List used for infinite scroll

  // Custom map function added to Array prototype (use with caution in production)
  // Array.prototype.myMap = function (callback) {
  //   if (typeof callback !== "function") {
  //     return TypeError("myMap error:undefined is myMap function");
  //   }
  //   const result = [];
  //   for (let i = 0; i < this.length; i++) {
  //     result.push(callback(this[i], i, this));
  //   }
  //   return result;
  // };

  // const peakElement = [1, 2, 3, 4, 9, 5, 6, 90];

  // function peak(arr) {
  //   const num = arr.length;
  //   if (num === 0) return 1;
  //   for (let i = 0; i < num; i++) {
  //     const left = i === 0 || arr[i] >= arr[i - 1];
  //     const right = i === -num || arr[i] >= arr[i + 1];
  //     if (left && right) {
  //       return arr[i];
  //     }
  //   }

  //   return -1;
  // }

  // const array1 = [1, 2, 3, 4];

  // // 0 + 1 + 2 + 3 + 4
  // const initialValue = 0;
  // const sumWithInitial = array1.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   initialValue
  // );

  // Expected output: 10

  // Count frequency of elements in array

  // const countFrequency = [
  //   "apple",
  //   "mango",
  //   "apple",
  //   "mango",
  //   "apple",
  //   "apple",
  //   "mango",
  // ].reduce((accumulator, currentValue) => {
  //   accumulator[currentValue] = (accumulator[currentValue] || 0) + 1;
  //   return accumulator;
  // }, {});

  // const flatten = [1, [2], [4, [5, [6]]]];

  // function flattenArray(array) {
  //   const result = [];
  //   if (Array.isArray(array)) {
  //     array.map((item) => result.push(...flattenArray(item)));
  //   } else {
  //     result.push(array);
  //   }
  //   return result;
  // }

  // const duplicate = [1, 2, 2, 3, 4, 5, 6, 7, 7, 7, 8];

  // const result = [];
  // for (let i = 0; i < duplicate.length; i++) {
  //   if (!result.includes(duplicate[i])) {
  //     result.push(duplicate[i]);
  //   }
  // }

  // const findDuplicate = duplicate.filter(
  //   (item, i) => i !== duplicate.indexOf(item)
  // );
  // let obj = {};

  // for (let i = 0; i < duplicateValue.length; i++) {
  //   if (obj[duplicateValue[i]] !== undefined) {
  //     obj[duplicateValue[i]] = obj[duplicateValue[i]] + 1;
  //   } else {
  //     obj[duplicateValue[i]] = 1;
  //   }
  // }

  // for (key in obj) {
  //   const data = `${key}-${obj[key]} `;
  //   console.log(data, "obj");
  // }

  // console.log(resultObj, "resultObj");

  const parentStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  };

  const {
    darkTheme,
    darkThemeHandler,
    countIncrement,
    countDecrement,
    currentValue,
  } = useContext(createContextData);

  // function reverseString(value) {
  //   let result = "";
  //   for (let i = value.length - 1; i > 0; i--) {
  //     result += value[i];
  //   }
  //   return result;
  // }

  // console.log(reverseString("Hello Arjuna"));

  // function firstNonRepeatingChar(str) {
  //   const count = {};

  //   for (let char of str) {
  //     count[char] = (count[char] || 0) + 1;
  //   }

  //   for (let char of str) {
  //     if (count[char] === 1) {
  //       return char;
  //     }
  //   }

  //   return null; // or return '_' or whatever indicates no non-repeating char
  // }

  // console.log(firstNonRepeatingChar(["hhlloy"]));

  // const firstSortedArray = [3, 4, 5, 1, 6, 9, 6];
  // const secondSortedArray = [100, 34, 67, 90];
  // const merge = [...firstSortedArray, ...secondSortedArray].sort(
  //   (a, b) => a - b
  // );
  // const [openModal, setOpenModal] = useState(false);

  // const openModalHandler = useCallback(() => {
  //   setOpenModal(true);
  // }, [open]);

  // i am gonna write Polyfills for filter method
  // Array.prototype.myFilter = function (callback) {
  //   if (typeof callback !== "function") {
  //     throw console.error("my filter is not function");
  //   }

  //   let result = [];
  //   for (let i = 0; i < this.length; i++) {
  //     if (callback(this[i], i, this)) result.push(this[i]);
  //   }
  //   return result;
  // };
  // const array = [1, 2, 3, 4, 5];

  // const test = array.myFilter((acc) => {
  //   return acc > 2;
  // });

  //  i am gonna write here reducer

  // Array.prototype.myReduce = function (cb, initialValue) {
  //   let accumulator = initialValue;

  //   for (let i = 0; i < this.length; i++) {
  //     accumulator = initialValue ? cb(accumulator, this[i], i, array) : this[i];
  //   }

  //   return accumulator;
  // };

  // const reduce = array.myReduce((acc, currentValue, i, array) => {
  //   return acc + currentValue;
  // }, 1);

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "black" : "white",
        height: "100vh",
      }}
    >
      <Navbar />/{/* Infinite Scroll Section */}
      {/* <button
        onClick={(e) => {
          e.stopPropagation();
          openModalHandler();
        }}
      >
        open modal
      </button> */}
   
      {/* {openModal &&
        createPortal(
          <Modal setOpenModal={setOpenModal} />,
          document.getElementById("create_portal")
        )} */}
    </div>
  );
}

export default App;
