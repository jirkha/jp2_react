import {
  BrowserRouter as Router,
  Routes,
  Route,
  //useParams
} from "react-router-dom";
import { Container } from "@mui/material";

// import "./App.css";
//import "./style.css";
// import Header from "./components/Header";
import ListMaterialPage from "./pages/ListMaterialPage";
import MaterialPage from "./pages/MaterialPage";
import StockPage from "./pages/StockPage";
import UpdateMaterialPage from "./pages/UpdateMaterialPage";
import TestPage_old from "./pages/TestPage_old";
import {TestPage} from "./pages/TestPage";
import ListProductPage from './pages/ListProductPage'
import ProductDetailPage from "./pages/ProductDetailPage";
import UpdateProductPage from "./pages/UpdateProductPage";
import SalesStatisticPage from "./pages/SalesStatisticPage";

import NavbarJP from "./components/Navbar/Navbar";
import AddItemForm from "./components/Material/AddItemForm";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ListTransactionPage from "./pages/ListTransactionPage";


function App() {
  return (
    // <div className="container">
    <>
      <Router>
        {/* <main className="py-3"> */}
        <Container>
          <NavbarJP />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/material" element={<ListMaterialPage />}></Route>
            <Route
              path="/edit_material/:materialId"
              element={<UpdateMaterialPage />}
            ></Route>
            <Route path="/testpage" element={<TestPage />}></Route>
            <Route path="/testpage2" element={<TestPage_old />}></Route>
            <Route
              path="/material/:materialId"
              element={<MaterialPage />}
            ></Route>
            <Route path="/stock" element={<StockPage />}></Route>
            <Route path="/product" element={<ListProductPage />}></Route>
            <Route
              path="/product_detail/:productId"
              element={<ProductDetailPage />}
            ></Route>
            <Route
              path="/edit_product/:productId"
              element={<UpdateProductPage />}
            ></Route>
            <Route
              path="/transaction"
              element={<ListTransactionPage />}
            ></Route>
            <Route
              path="/sales_statistic"
              element={<SalesStatisticPage />}
            ></Route>
          </Routes>
        </Container>
        {/* </main> */}

        <Footer />
      </Router>
    </>
  );
}

export default App;
