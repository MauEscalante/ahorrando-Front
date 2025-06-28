import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/navbar.css"
import Search from "./Search";
import usuarioIcon from "../Assets/usuario.svg";

const Navbar = () => {
  const [estadoOptionList, setEstadoOptionList] = useState(false);
  const initialTipoContenido = localStorage.getItem("tipoContenido") || "movie";
  const [tipoContenido, setTipoContenido] = useState(initialTipoContenido);

    const [mensaje, setMensaje] = useState("")

  const userNoparse = localStorage.getItem("user");
  const user = JSON.parse(userNoparse);
  const navigate = useNavigate();


  const handdleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("tipoContenido", tipoContenido);
  }, [tipoContenido]);

  const handleActualizarTipoContenido = (tipo) => {
    setTipoContenido(tipo);
  };


  const handdleOptionList = () => {
    setEstadoOptionList(!estadoOptionList);
  }

  const [value, setValue] = useState("");
  const [entretenimiento, setEntretenimiento] = useState([]);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.themoviedb.org/3/search/person?api_key=425c2d87b8b9c812c4101db1f80fd9e5&language=en-US&query=${value}&include_adult=false`
      )
      .then((res) => setEntretenimiento(res.data.results));

  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">Ahorrando</span>
          </div>
        </a>

        <div className="search-container">
          <Search />
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
                    <a className="dropdown-item dropdown-toggle ">
                      Mis Listas
                    </a>
                    <ul className={estadoOptionList ? "opcion-mis-listas" : "oculto"}>
                      <li><a href="/favorites">Favoritas</a></li>
                    </ul>
                  </li>

                  <li><a href="/changePassword"> Cambiar contraseña</a></li>

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