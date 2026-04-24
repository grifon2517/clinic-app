import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")),
  );

  useEffect(() => {
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container header__inner">
          <nav className="nav">
            <NavLink to="/">Заявка</NavLink>
            <NavLink to="/requests">Таблица заявок</NavLink>
            {!isAuthenticated ? (
              <NavLink to="/login">Вход</NavLink>
            ) : (
              <button className="ghost-button" onClick={logout}>
                Выйти
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="container main">
        <Outlet />
      </main>
    </div>
  );
}
