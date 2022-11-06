import React, { useEffect } from "react";
import TableGlobal from "../Global/Tables/TableGlobal";
import { PRODUCT_COLUMNS } from "./ProductColumns";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Store/Features/Products/productSlice";

function TableProduct() {

useEffect(() => {
  dispatch(getProduct());
}, []);

const product = useSelector((state) => state.product.data);
const load = useSelector((state) => state.product.loading);

console.log("products",product)

const dispatch = useDispatch();

  return (
    <div>
      {product && (
        <TableGlobal
          columns={PRODUCT_COLUMNS}
          dataAPI={product}
          loadingState={load}
          type="product"
          name="produkt"
        />
      )}
    </div>
  );
}

export default TableProduct;
