import "../pages/home.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../pages/logo/logo.png";
import { useLocation } from "react-router-dom";
import userimg from "../pages/logo/user.png";
import { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function Vendas() {
  const navigate = useNavigate();
  const tipoUsuario = localStorage.getItem("tipoUsuario");
  const nomeUsuario = localStorage.getItem("nome");

  const location = useLocation();
  const { item } = location.state || {};

  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    email: "",
    desconto: "",
    pagamento: "pix",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const irParaPesquisa = () => {
    navigate("/pesquisa?categoria");
  };

  const handleFinalizarCompra = async () => {
    if (!item || !item._id) {
      alert("Item inválido.");
      return;
    }
    const response = await fetch(`${API_URL}/api/itens/${item._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Compra finalizada com sucesso!");
      navigate("/home");
    } else {
      const data = await response.json();
      alert(`Erro ao finalizar compra: ${data.message}`);
    }
  };

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
              onClick={irParaPesquisa}
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
            Ola, {nomeUsuario}
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="container-compra">
          <h2>Confirme os dados da compra</h2>
          {item && (
            <>
              <img
                src={`${API_URL}${item.imagem}`}
                alt={`${item.marca} ${item.modelo}`}
                className="selecionadoVenda"
              />
              <a>
                {item.marca} {item.modelo} ({item.status})
              </a>
              <a>R$ {item.valor}</a>
              <a>
                {item.cor}
                <span
                  className="cor"
                  style={{ backgroundColor: item.cor }}
                ></span>
              </a>
            </>
          )}
        </div>

        <div className="container-vendas">
          <h2>Dados pessoais</h2>
          <label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome"
            />
          </label>
          <label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleInputChange}
              placeholder="Endereço"
            />
          </label>
          <label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </label>
          <label>
            <input
              type="text"
              name="desconto"
              value={formData.desconto}
              onChange={handleInputChange}
              placeholder="Desconto"
            />
          </label>
          <div className="finalizar-input">
            <label>
              Forma de pagamento:
              <select
                name="pagamento"
                value={formData.pagamento}
                onChange={handleInputChange}
              >
                <option value="pix">Pix</option>
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="boleto">Boleto</option>
                <option value="cheque">Cheque</option>
                <option value="dinheiro">Dinheiro</option>
              </select>
            </label>
          </div>
          <button className="button-compra" onClick={handleFinalizarCompra}>
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vendas;
