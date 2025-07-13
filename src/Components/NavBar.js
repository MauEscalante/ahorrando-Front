
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/navbar.css"
import Search from "./Search";
import options from "../Assets/options.svg";
import usuarioIcon from "../Assets/usuario.svg";
import { logout } from "../controller/miApp.controller";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";

const Navbar =  () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, clearUser } = useAuth();
  const navigate = useNavigate();
  const { limpiarBusqueda } = useSearch();


  const handleLogoClick = () => {
    try{
      limpiarBusqueda();
      navigate("/"); // Redirigir al inicio
    }catch (error) {
      console.error('Error al manejar el clic en el logo:', error);
    }
   
  };

  const handdleLogout = async (e) => {
    e.preventDefault();
    await logout();
    clearUser(); // Limpiar el usuario del contexto
    navigate("/");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" onClick={handleLogoClick}>
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Ahorrando</span>
          </div>
        </Link>

        <div className="search-container">
          <Search/>
        </div>

        <form className="d-flex form-log" role="search">
          {user ? (
            <>
              <div className="dropdown contenedor-menu-log">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <img src={options} alt="Options" className="user-icon" />
                </button>
                {isDropdownOpen && (
                  <ul className="dropdown-menu show">
                    <li>
                      <Link to={"/profile"} className="dropdown-item" onClick={handleProfileClick}>
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handdleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-outline-info login-button" type="submit">
                  <img src={usuarioIcon} alt="Usuario" className="user-icon" />
                  Ingresar
                </button>
              </Link>
            </>
          )}
        </form>
      </div>

    </nav >

  );
};

export default Navbar;