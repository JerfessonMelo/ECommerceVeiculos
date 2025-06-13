import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/logo/logo.png";
import ListaDeItens from "../components/ListaDeItens";
import "../pages/home.css";
import userimg from "../pages/logo/user.png";

const API_URL = process.env.REACT_APP_API_URL;

function ItemSelecionado() {
  const { id } = useParams();
  const [item, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const nomeUsuario = localStorage.getItem("nome");
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch(`${API_URL}/api/itens`);
        const data = await response.json();
        setItens(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchItens();
  }, [id]);
  const handleComprar = () => {
    navigate("/vendas", { state: { item } });
  };

  return item ? (
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
            <Link to="/pesquisa">
              <input
                type="carros"
                placeholder="Pesquisa"
                className="Pesquisa"
              />
            </Link>
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
            Ola, {nomeUsuario}
          </li>
        </ul>
      </div>
      <div className="produto-wrapper">
        <div className="produto">
          <div className="info-left">
            <img
              src={`${process.env.REACT_APP_API_URL}${item.imagem}`}
              alt={`${item.marca} ${item.modelo}`}
              className="selecionado"
            />
            <div className="top">
              <div className="info-down">
                <strong className="nomeDoItem">{item.marca}</strong>
                <strong className="modeloDoItem"> {item.modelo}</strong>
                <a>({item.status})</a>
              </div>
              <p className="valor">
                <strong>R$</strong> {item.valor}
              </p>
              <p className="color">
                {item.cor}
                <span
                  className="cor"
                  style={{ backgroundColor: item.cor }}
                ></span>
              </p>
              <lu className="detalhes-lista">
                <h4>Detalhes</h4>
                <li>Ano {item.ano}.</li>
                <li>Peso {item.detalhesTecnicos?.peso}KG.</li>
                <li>Max {item.detalhesTecnicos?.velocidadeMaxima}.</li>
                <li>Combustivel {item.detalhesTecnicos?.combustivel}.</li>
                <li>{item.detalhesTecnicos?.motorizacao}.</li>
                <li>{item.quilometragem} KM.</li>
                {/* <li>{item.descricao}.</li> */}
              </lu>
              <button onClick={handleComprar} className="button-compra">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="outros">Mais Produtos</h1>

      <ListaDeItens />
    </div>
  ) : (
    <p>Nenhum automóvel encontrado.</p>
  );
}

export default ItemSelecionado;
