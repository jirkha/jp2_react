import React, { useState, useEffect } from "react";
import Axios from "axios";
import DayStatistic from "../components/Statistic/DayStatistic";

import { Container, Typography, Stack, Box } from "@mui/material";
import StatisticUnit from "../components/Statistic/StatisticUnit";
import DateRangePicker from "../components/Global/DateTimePicker/DateRangePicker"
import { TableGlobalStatistic } from "../components/Global/Tables/TableGlobalStatistic";
import { DAY_STATISTIC_COLUMNS } from "../components/Statistic/DayStatisticColumns";

function SalesStatisticPage() {
  let [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    Axios.get("/api/daily_sales/").then((res) => {
      console.log(res.data)
      setData(res.data);
      //console.log("data: ", res.data);
    });
  };

  const onSubmit = (values) => {
    //console.log("CurrentPrice")
    const { day_from, day_to } = values;
    Axios.post("/api/daily_sales/", {
      day_from,
      day_to,
    })
      .then((res) => {
        console.log("Filtering: ", res.data);
        setData(res.data);
        //dispatch(getSale()); //aktualizuje seznam prodejních kanálů
      })
      .catch((err) => console.log(err));
  };

  const resetTable = () => {
    getData();
  };

  return (
    <div>
      <Container component="section" id="storageForm">
        <Typography
          variant="h2"
          sx={{ mt: 3 }} //mezera nad textem
          color="primary"
          align="center" //zarovná doprostřed
          gutterBottom //vytvoří mezeru pod textem
        >
          &#9782; Statistika tržeb
        </Typography>
        <DateRangePicker onSubmit={onSubmit} resetTable={resetTable} />
        <StatisticUnit
          title="Denní tržby"
          table={
            <TableGlobalStatistic
              columns={DAY_STATISTIC_COLUMNS}
              dataAPI={data}
            />
          }
          chart={<DayStatistic data={data} />}
        />
      </Container>
    </div>
  );
}

export default SalesStatisticPage;
