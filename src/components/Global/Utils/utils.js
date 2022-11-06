import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Axios from "axios";


export function CurrentPrice(price, mark, change, variant ) {

  // console.log("mark", mark);
  // console.log("change", change);
  // console.log("variant", variant);

  if (variant === "%") {
        let changed = parseInt(change) * 0.01 * parseInt(price);
        if (mark === "+") {
          let result = parseInt(price) + parseInt(changed)
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} + {changed} = <strong>{result} Kč</strong> (navýšení{" "}
               {change}%)
             </Typography>
           </>
         );
      } else if (mark === "-") {
        let result = parseInt(price) - parseInt(changed)
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} - {changed} = <strong>{result} Kč</strong> (sleva{" "}
               {change}%)
             </Typography>
           </>
         );
      }
      } else {
        if (mark === "+") {
          let result = parseInt(price) + parseInt(change);
          return (
            <>
              <Typography>Prodejní cena za 1 produkt:</Typography>
              <Typography>
                {price} + {change} = <strong>{result} Kč</strong>
              </Typography>
            </>
          );
      } else if (mark === "-") {
        let result = parseInt(price) - parseInt(change);
         return (
           <>
             <Typography>Prodejní cena za 1 produkt:</Typography>
             <Typography>
               {price} - {change} = <strong>{result} Kč</strong>
             </Typography>
           </>
         );
      }
    }
  }
