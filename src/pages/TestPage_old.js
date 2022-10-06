// import * as React from "react";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import FilledInput from "@mui/material/FilledInput";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormHelperText from "@mui/material/FormHelperText";
// import FormControl from "@mui/material/FormControl";
// import TextField from "@mui/material/TextField";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

// export default function InputAdornments() {
//   const [values, setValues] = React.useState({
//     amount: "",
//     password: "",
//     weight: "",
//     weightRange: "",
//     showPassword: false,
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({
//       ...values,
//       showPassword: !values.showPassword,
//     });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//       <div>
//         <TextField
//           label="With normal TextField"
//           id="outlined-start-adornment"
//           sx={{ m: 1, width: "25ch" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">kg</InputAdornment>
//             ),
//           }}
//         />
//         <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//           <OutlinedInput
//             id="outlined-adornment-weight"
//             value={values.weight}
//             onChange={handleChange("weight")}
//             endAdornment={<InputAdornment position="end">kg</InputAdornment>}
//             aria-describedby="outlined-weight-helper-text"
//             inputProps={{
//               "aria-label": "weight",
//             }}
//           />
//           <FormHelperText id="outlined-weight-helper-text">
//             Weight
//           </FormHelperText>
//         </FormControl>
//         <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">
//             Password
//           </InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             type={values.showPassword ? "text" : "password"}
//             value={values.password}
//             onChange={handleChange("password")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {values.showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Password"
//           />
//         </FormControl>
//         <FormControl fullWidth sx={{ m: 1 }}>
//           <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-amount"
//             value={values.amount}
//             onChange={handleChange("amount")}
//             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//             label="Amount"
//           />
//         </FormControl>
//       </div>
//       <div>
//         <TextField
//           label="With normal TextField"
//           id="filled-start-adornment"
//           sx={{ m: 1, width: "25ch" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">kg</InputAdornment>
//             ),
//           }}
//           variant="filled"
//         />
//         <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
//           <FilledInput
//             id="filled-adornment-weight"
//             value={values.weight}
//             onChange={handleChange("weight")}
//             endAdornment={<InputAdornment position="end">kg</InputAdornment>}
//             aria-describedby="filled-weight-helper-text"
//             inputProps={{
//               "aria-label": "weight",
//             }}
//           />
//           <FormHelperText id="filled-weight-helper-text">Weight</FormHelperText>
//         </FormControl>
//         <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
//           <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
//           <FilledInput
//             id="filled-adornment-password"
//             type={values.showPassword ? "text" : "password"}
//             value={values.password}
//             onChange={handleChange("password")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   edge="end"
//                 >
//                   {values.showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>
//         <FormControl fullWidth sx={{ m: 1 }} variant="filled">
//           <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
//           <FilledInput
//             id="filled-adornment-amount"
//             value={values.amount}
//             onChange={handleChange("amount")}
//             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//           />
//         </FormControl>
//       </div>
//       <div>
//         <TextField
//           label="With normal TextField"
//           id="standard-start-adornment"
//           sx={{ m: 1, width: "25ch" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">kg</InputAdornment>
//             ),
//           }}
//           variant="standard"
//         />
//         <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "25ch" }}>
//           <Input
//             id="standard-adornment-weight"
//             value={values.weight}
//             onChange={handleChange("weight")}
//             endAdornment={<InputAdornment position="end">kg</InputAdornment>}
//             aria-describedby="standard-weight-helper-text"
//             inputProps={{
//               "aria-label": "weight",
//             }}
//           />
//           <FormHelperText id="standard-weight-helper-text">
//             Weight
//           </FormHelperText>
//         </FormControl>
//         <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
//           <InputLabel htmlFor="standard-adornment-password">
//             Password
//           </InputLabel>
//           <Input
//             id="standard-adornment-password"
//             type={values.showPassword ? "text" : "password"}
//             value={values.password}
//             onChange={handleChange("password")}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label="toggle password visibility"
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                 >
//                   {values.showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//           />
//         </FormControl>
//         <FormControl fullWidth sx={{ m: 1 }} variant="standard">
//           <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
//           <Input
//             id="standard-adornment-amount"
//             value={values.amount}
//             onChange={handleChange("amount")}
//             startAdornment={<InputAdornment position="start">$</InputAdornment>}
//           />
//         </FormControl>
//       </div>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {Link} from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";
import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import {Container} from "@mui/material";
// import {Avatar} from "@mui/material";
import { Hidden, Grid, Tabs, Tab } from "@mui/material";
import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import { Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";

const navigationLinks = [
  { id: 0, name: "Materiál", href: "/material" },
  { id: 1, name: "Test1", href: "/testpage" },
  { id: 2, name: "Test2", href: "/testpage2" },
];

// const useStyles = makeStyles((theme) => ({
//   link: {
//     marginRight: 20,
//   },
//   avatar: {
//     marginRight: "auto",
//     color: "white",
//     backgroundColor: "black",
//     borderRadius: 0,
//     height: 30,
//     border: "2px solid gray",
//     borderLeft: "12px solid transparent",
//     borderRight: "12px solid transparent",
//   },
// }));

export default function Header() {
  //const styles = useStyles();
  const [open, setOpen] = useState(false);
    const [value, setValue] = useState(navigationLinks[1].id);

       const handleChange = (event, newValue) => {
         console.log(newValue);
         setValue("newValue", newValue.id);
       };

  return (
    <AppBar position="sticky" color="default">
      <Container >
        <Toolbar disableGutters>
          {/* <Avatar className={styles.avatar}>P</Avatar> */}
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                indicatorColor="secondary"
                textColor="inherit"
                value={value.id}
                onChange={handleChange}
              >
                {navigationLinks.map((item) => (
                  <Tab
                    //className={styles.link}
                    sx={{ marginRight: 1 }}
                    color="textPrimary"
                    variant="button"
                    underline="none"
                    value={item.id}
                    label={item.name}
                    href={item.href}
                    key={item.name}
                  ></Tab>
                ))}
              </Tabs>
            </Grid>
          </Grid>
          {/* <Hidden xsDown>
            {navigationLinks.map((item) => (
              <Link
                //className={styles.link}
                sx={{ marginRight: 20 }}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden> */}
        </Toolbar>
      </Container>
      {/* <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link
                //className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer> */}
    </AppBar>
  );
}