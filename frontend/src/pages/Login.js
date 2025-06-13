import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo/logoLogin.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        setErro(data.message || "Erro no login");
        return;
      }
      localStorage.setItem("usuarioId", data.usuarioId);
      localStorage.setItem("nome", data.nome);
      localStorage.setItem("tipoUsuario", data.tipoUsuario);

      if (data.tipoUsuario === "Gerente") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setErro("erro na conexao");
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
        <h1 className="login-title">LOGIN</h1>
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <button onClick={handleLogin} className="login-button">
          LOGIN
        </button>
        <div>
          <Link to="/CadastroUsuario" className="criar-Conta">
            Crie sua conta.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
