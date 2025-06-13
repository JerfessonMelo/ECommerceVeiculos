import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../pages/home.css";
import logo from "../pages/logo/logo.png";
import userimg from "../pages/logo/user.png";

const API_URL = process.env.REACT_APP_API_URL;

function Pesquisa() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoriaInicial = queryParams.get("categoria");
  const statusInicial = queryParams.get("status");

  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const nomeUsuario = localStorage.getItem("nome");

  const [busca, setBusca] = useState("");
  const [itens, setItens] = useState([]);
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const fetchItens = async () => {
      const response = await fetch(`${API_URL}/api/itens`);
      const data = await res.json();
      setItens(data);
    };
    fetchItens();
  }, []);

  useEffect(() => {
    const filtrados = itens.filter((item) => {
      const buscaLower = busca.toLowerCase();
      const condicaoBusca =
        item.marca.toLowerCase().includes(buscaLower) ||
        item.modelo.toLowerCase().includes(buscaLower);

      const condicaoCategoria = categoriaInicial
        ? item.categoria.toLowerCase() === categoriaInicial.toLowerCase()
        : true;

      const condicaoStatus = statusInicial
        ? item.status.toLowerCase() === statusInicial.toLowerCase()
        : true;

      return condicaoBusca && condicaoCategoria && condicaoStatus;
    });

    setResultados(filtrados);
  }, [busca, itens, categoriaInicial, statusInicial]);

  return (
    <div className="Home_container">
      <div className="tire-track-loop"></div>
      <div className="tire-track-loop2"></div>
      <div className="TopColor">
        <ul className="nav-menu">
          <li>
            <Link to="/home">
              <img src={logo} alt="Nossa logo" className="ImagemLogo" />
            </Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Pesquisa"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="Pesquisa"
            />
          </li>
          <li>
            <Link to="/esportivos" className="nav-link">
              Esportivos
            </Link>
          </li>
          <li>
            <Link to="/populares" className="nav-link">
              Populares
            </Link>
          </li>
          <li>
            <Link to="/usados" className="nav-link">
              Usados
            </Link>
          </li>
          <li>
            {tipoUsuario === "Gerente" && (
              <Link to="/cadastroproduto" className="nav-link">
                Cadastro veiculo
              </Link>
            )}
          </li>
          <li className="colorUser">
            <img src={userimg} className="ImagemUser" />
            Olá, {nomeUsuario}
          </li>
        </ul>
      </div>

      <div className="itens">
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((item) => (
              <li key={item._id}>
                <Link to={`/itens/${item._id}`} className="link-item">
                  <img
                    src={`http://localhost:5000${item.imagem}`}
                    alt={`${item.marca} ${item.modelo}`}
                    className="carroimg"
                  />
                  <a id="valorcolor">
                    {item.marca} {item.modelo} R$ {item.valor}
                  </a>
                  <a>
                    {item.ano} • {item.quilometragem} km • {item.categoria} •{" "}
                    {item.status}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Automóvel não encontrado</p>
        )}
      </div>
    </div>
  );
}

export default Pesquisa;
