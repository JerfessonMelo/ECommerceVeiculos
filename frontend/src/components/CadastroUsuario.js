import "../pages/home.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../pages/logo/logo.png";

const API_URL = process.env.REACT_APP_API_URL;

function CadastroUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    rua: "",
    bairro: "",
    numero: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async () => {
    try {
      const response = await fetch(`${API_URL}/api/RegistroUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          password: formData.senha,
          tipoUsuario: "Gerente",
          endereco: {
            rua: formData.rua,
            bairro: formData.bairro,
            numero: formData.numero,
            cep: formData.cep,
          },
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErro(data.message || "Erro de cadastro");
        return;
      }
      alert("Cadastro concluido");
      navigate("/");
    } catch (err) {
      setErro("Erro de conexao");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="left-content">
          <h2>BEM VINDO</h2>
          <p>Sinta a velocidade</p>
        </div>
      </div>

      <div className="login-right">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="login-title">Cadastro</h1>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="login-input"
          placeholder="Nome"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          placeholder="Email"
        />
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          className="login-input"
          placeholder="Senha"
        />
        <input
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="login-input"
          placeholder="CEP"
        />
        <input
          type="text"
          name="rua"
          value={formData.rua}
          onChange={handleChange}
          className="login-input"
          placeholder="Rua"
        />
        <input
          type="text"
          name="bairro"
          value={formData.bairro}
          onChange={handleChange}
          className="login-input"
          placeholder="Bairro"
        />
        <input
          type="text"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          className="login-input"
          placeholder="Número"
        />
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button className="button-cadastro" onClick={handleCadastro}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}

export default CadastroUsuario;
