import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logo from "C:/Users/vecko/jp_2.0/jp2_react/src/assets/J-P web special_black.png";
import "./navbar.css";

export default function NavbarJP() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <img src={logo} width="140" height="35" alt="Logo" />
      </Link>
      <ul>
        <CustomLink to="/material">Materiál</CustomLink>
        <CustomLink to="/testpage">Test1</CustomLink>
        <CustomLink to="/testpage2">Test2</CustomLink>
      </ul>
    </nav>
  );
}

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
