import React, { useState, useEffect, useMemo } from "react";
import { DAY_STATISTIC_COLUMNS } from "./DayStatisticColumns";
import { useDispatch, useSelector } from "react-redux";
import { TableGlobalStatistic } from "../Global/Tables/TableGlobalStatistic";
import Axios from "axios";

function TableDayStatistic() {
    let [data, setData] = useState([]);

    useEffect(() => {
      getData();
    }, []);

    let getData = async () => {
      Axios.get("/api/daily_sales/").then((res) => {
        setData(res.data);
        //console.log("data: ", res.data);
      });
    };

  return (
    <div>
      {data && (
        <TableGlobalStatistic
          columns={DAY_STATISTIC_COLUMNS}
          dataAPI={data}
          //loadingState={load}
          //type="removal"
        />
      )}
    </div>
  );
}

export default TableDayStatistic;
