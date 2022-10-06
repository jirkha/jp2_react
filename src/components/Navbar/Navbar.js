// import { Link, useMatch, useResolvedPath } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   // Typography,
//   Button,
//   Stack,
//   // Menu,
//   // MenuItem,
// } from "@mui/material";
// import logo from "C:/Users/vecko/jp_2.0/jp2_react/src/assets/J-P web special_black.png";
// // import "./navbar.css";

// export default function NavbarJP() {
//   return (
//     <AppBar position="sticky">
//       <Toolbar>
//         <IconButton
//           //size="large"
//           edge="start"
//           color="inherit"
//           aria-label="Logo"
//           sx={{ mr: 2 }}
//         >
//           <Link to="/">
//             <img src={logo} width="140" height="35" alt="Logo" />
//           </Link>
//         </IconButton>
//         <Stack
//           direction="row"
//           //alignItems="center"
//           spacing={1}
//           justifyContent="center"
//         >
//           <Button color="inherit" href="/material" to="/material">
//             Materiál
//           </Button>
//           <Button color="inherit" href="/testpage" to="/testpage">
//             Test1
//           </Button>
//           <Button color="inherit" href="/testpage2" to="/testpage2">
//             Test2
//           </Button>
//         </Stack>
//         <ul></ul>
//       </Toolbar>
//     </AppBar>
//   );
// }



// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }

import React, { useState } from "react";
import { Link } from "@mui/material";
// import makeStyles from "@mui/styles/makeStyles";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Container } from "@mui/material";
// import {Avatar} from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SwipeableDrawer } from "@mui/material";
import { Divider } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import logo from "C:/Users/vecko/jp_2.0/jp2_react/src/assets/J-P web special_black.png";
import { Grid } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";


const navigationLinks = [
  { name: "Materiál", href: "/material" },
  { name: "Sklad", href: "/stock" },
  { name: "Test1", href: "/testpage" },
  { name: "Test2", href: "/testpage2" },
];

export default function NavbarJP() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  return (
    <AppBar position="sticky">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <IconButton
            //size="large"
            edge="start"
            color="inherit"
            aria-label="Logo"
            sx={{ mr: 2 }}
          >
            <Link to="/">
              <img src={logo} width="140" height="35" alt="Logo" />
            </Link>
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Grid container>
              <Grid item xs={12}>
                {navigationLinks.map((item) => (
                  <Link
                    //className={styles.link}
                    //indicatorColor="secondary"
                    key={item.name}
                    sx={{ marginRight: 2 }}
                    color="inherit"
                    variant="button"
                    underline="hover"
                    href={item.href}
                    label={item.name}
                  >
                    {item.name}
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
      <SwipeableDrawer
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
      </SwipeableDrawer>
    </AppBar>
  );
}


// function CustomLink({ to, children, ...props }) {
//   const resolvedPath = useResolvedPath(to);
//   const isActive = useMatch({ path: resolvedPath.pathname, end: true });

//   return (
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// }
