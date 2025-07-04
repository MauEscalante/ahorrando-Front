
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/navbar.css"
import Search from "./Search";
import usuarioIcon from "../Assets/usuario.svg";
import { logout } from "../controller/miApp.controller";
import { useAuth } from "../context/AuthContext";

const Navbar =  ({ onSearchResults, onSearchStart, onClearSearch }) => {
  const [estadoOptionList, setEstadoOptionList] = useState(false);
  const { user, clearUser } = useAuth();
  const navigate = useNavigate();


  const handleLogoClick = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const handdleLogout = async (e) => {
    e.preventDefault();
    await logout();
    clearUser(); // Limpiar el usuario del contexto
    navigate("/");
  };

 

  const handdleOptionList = () => {
    setEstadoOptionList(!estadoOptionList);
  }


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
          <Search onSearchResults={onSearchResults} onSearchStart={onSearchStart} />
        </div>

        <form className="d-flex form-log" role="search">
          {user ? (
            <>
              <div className="dropdown contenedor-menu-log">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5>Perfil </h5>
                </button>
                <ul className="dropdown-menu option-log">

                  <Link to={"/profile"}>
                    <span className="dropdown-item">Mi perfil</span>
                  </Link>
                  <li className="mis-listas" onClick={(e) => { e.stopPropagation(); handdleOptionList(); }}>
                    <button type="button" className="dropdown-item dropdown-toggle">
                      Mis Listas
                    </button>
                    <ul className={estadoOptionList ? "opcion-mis-listas" : "oculto"}>
                      <li><Link to="/favorites">Favoritas</Link></li>
                    </ul>
                  </li>

                  <li><Link to="/changePassword">Cambiar contraseña</Link></li>

                  <button className="dropdown-item" onClick={handdleLogout}>
                    Logout
                  </button>
                </ul>
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