import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home  from './components/pages/Home.js'
import Login from './components/pages/auth/Login.js'


export default function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>      
      {/* </Provider> */}
    </div>
  );
}