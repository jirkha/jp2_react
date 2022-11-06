import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Box } from "@mui/material";

function DayStatistic() {
    let [data, setData] = useState([]);

    useEffect(() => {
      getData();
        }, []);

    let getData = async () => {
    Axios.get('/api/daily_sales/')
       .then((res) => {
        setData(res.data)
        //console.log("data: ", res.data);
    })};

 
return (
  <Box>
    <LineChart width={700} height={500} data={data}>
      <Line type="monotone" dataKey="sales" stroke="#2196F3" strokeWidth={3} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  </Box>
);
}

export default DayStatistic