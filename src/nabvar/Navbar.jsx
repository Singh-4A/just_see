import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./Layout";
import { ProgressMain } from "../ProgressMain";
import TrafficLight from "../TrraficLight/TrafficLight";
import Scroll from "../scroll/Scroll";
import Login from "../Login/login";
import DragAndDropList from "../draganddrop/drangAndDrop";

const Stopwatch = lazy(() => import("../Stopwatch/Stopwatch"));
const MainTodo = lazy(() => import("../orgnigim/Todo/MainTodo"));

function Home() {
  return <h2>Home21212</h2>;
}

function Users() {
  return <h2>Not found </h2>;
}

export default function Navbar() {

;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/traffic" element={<TrafficLight />} />
            <Route path="/scroll" element={<Scroll />} />
            <Route path="/progress" element={<ProgressMain />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/todo" element={<MainTodo />} />
            <Route  path="/drag" element={<DragAndDropList/>}/>
            <Route path="*" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
