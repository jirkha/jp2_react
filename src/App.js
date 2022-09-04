import {
  BrowserRouter as Router,
  Routes,
  Route,
  //useParams
} from "react-router-dom";
//import React, {useState, useEffect} from 'react'

import './App.css';
//import "./style.css";
import Header from "./components/Header";
import ListMaterialPage from "./pages/ListMaterialPage";
import MaterialPage from "./pages/MaterialPage";
import AddItemPage from "./pages/AddItemPage";
import TestPage from "./pages/TestPage";
//import ProductReviewForm from "./pages/TestPage_old";
import AddItemForm from "./components/AddItemForm";

function App() {
  return (
    <div className="container">
      <div className="app">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<ListMaterialPage />}></Route>
            <Route path="/edit_material" element={<AddItemPage />}></Route>
            <Route path="/testpage" element={<TestPage />}></Route>
            <Route path="/testpage2" element={<AddItemForm />}></Route>
            <Route
              path="/material/:materialId"
              element={<MaterialPage />}
            ></Route>
            {/* <Route path="/material_type" element={<MaterialTypePage />}></Route> */}
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
