import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  // Typography,
  Button,
  Stack,
  // Menu,
  // MenuItem,
} from "@mui/material";
import logo from "C:/Users/vecko/jp_2.0/jp2_react/src/assets/J-P web special_black.png";
// import "./navbar.css";

export default function NavbarJP() {
  return (
    <AppBar position="sticky">
      <Toolbar>
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
        <Stack
          direction="row"
          //alignItems="center"
          spacing={1}
          justifyContent="center"
        >
          <Button color="inherit" href="/material" to="/material">
            Materiál
          </Button>
          <Button color="inherit" href="/testpage" to="/testpage">
            Test1
          </Button>
          <Button color="inherit" href="/testpage2" to="/testpage2">
            Test2
          </Button>
        </Stack>
        <ul></ul>
      </Toolbar>
    </AppBar>
  );
}

// export default function NavbarJP() {
//   return (
//     <AppBar>
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="Logo"
//           sx={{ flexGrow: 1 }}
//         >
//           <Link to="/" className="site-title">
//             <img src={logo} width="140" height="35" alt="Logo" />
//           </Link>
//         </IconButton>
//         <Stack direction="row" spacing={2}>
//           <CustomLink to="/material">Materiál</CustomLink>
//           <CustomLink to="/testpage">Test1</CustomLink>
//           <CustomLink to="/testpage2">Test2</CustomLink>
//         </Stack>
//         <ul></ul>
//       </Toolbar>
//     </AppBar>
//   );
// }


function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
