import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Layout from "./Layout";
import { ProgressMain } from "../ProgressMain";
import TrafficLight from "../TrraficLight/TrafficLight";

const Stopwatch=lazy(()=>import("../Stopwatch/Stopwatch"))

function Home() {
  return <h2>Home21212</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Not found </h2>;
}

export default function Navbar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/traffic" element={<TrafficLight />} />
            <Route path="/about" element={<About />} />
            <Route path="/progress" element={<ProgressMain />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="*" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
