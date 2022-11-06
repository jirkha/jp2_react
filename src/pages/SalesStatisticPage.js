import React from "react";
import DayStatistic from "../components/Statistic/DayStatistic";

import { Container, Typography, Stack, Divider, Box } from "@mui/material";
import TableDayStatistic from "../components/Statistic/TableDayStatistic";

function SalesStatisticPage() {
  return (
    <div>
      <Container component="section" id="storageForm">
        <Stack
          justifyContent="space-around" //vzájemná poloha
          direction={{ xs: "column", lg: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ mb: 5 }} //mezera pod komponentou
        >
          <Box sx={{ maxWidth: 350 }}>
            <Typography
              variant="h2"
              sx={{ mt: 3 }} //mezera nad textem
              color="primary"
              align="center" //zarovná doprostřed
              gutterBottom //vytvoří mezeru pod textem
            >
              &#9782; Denní přehled tržeb
            </Typography>
            <TableDayStatistic />
          </Box>
          <Box>
            <Typography
              variant="h2"
              sx={{ mt: 3 }} //mezera nad textem
              color="primary"
              align="center" //zarovná doprostřed
              gutterBottom //vytvoří mezeru pod textem
            >
              &#9782; Graf vývoje denních tržeb
            </Typography>
            <DayStatistic />
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default SalesStatisticPage;
