import React, { lazy, Suspense, useEffect } from "react";

import Layout from "./Layout";
import { ProgressMain } from "../ProgressMain";
import TrafficLight from "../TrraficLight/TrafficLight";
import Login from "../Login/login";
import DragAndDropList from "../draganddrop/drangAndDrop";
import { AutoComponent } from "../autocomponent/autoComponent";
import Chatbot from "../Chatbot/AiChatbot";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "../signup/signup";

const Stopwatch = lazy(() => import("../Stopwatch/Stopwatch"));
const MainTodo = lazy(() => import("../orgnigim/Todo/MainTodo"));

function Home() {
  return <h2>Home21212</h2>;
}

function Users() {
  return <h2>Not found </h2>;
}

export default function Navbar() {
const navigate = useNavigate()

  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("token"))
    if (getData === null) {
      navigate("/login")
    }
  }, [])


  return (
    <Suspense fallback={<div>Loading...</div>}>
    
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/traffic" element={<TrafficLight />} />
            <Route path="/autocomplete" element={<AutoComponent />} />
            <Route path="/progress" element={<ProgressMain />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/todo" element={<MainTodo />} />
            <Route path="/drag" element={<DragAndDropList />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="*" element={<Users />} />
          </Route>
        </Routes>
   
    </Suspense>
  );
}
