import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../pages/home.css";

const API_URL = process.env.REACT_APP_API_URL;

function ListaDeItens() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  return (
    <div className="itens">
      {itens.length > 0 ? (
        <ul>
          {itens.map((item) => (
            <li key={item._id}>
              <div
                className="link-item"
                onClick={() => (window.location.href = `/itens/${item._id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`http://localhost:5000${item.imagem}`}
                  alt={`${item.marca} ${item.modelo}`}
                  className="carroimg"
                />
                <p id="valorcolor">
                  {item.marca} {item.modelo} R$ {item.valor}
                </p>
                <p>
                  {item.ano} • {item.quilometragem} km • {item.categoria} •{" "}
                  {item.status}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Automóvel não encontrado</p>
      )}
    </div>
  );
}

export default ListaDeItens;
