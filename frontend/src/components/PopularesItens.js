import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PopularesItens() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItens = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/itens');
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
          {itens.filter((item) => item.categoria?.toLowerCase() === 'popular' && item.status?.toLowerCase() === 'novo' ).map((item) => (
            <li key={item._id}>
              <Link to={`/itens/${item._id}`} className='link-item'>
                <img src={`http://localhost:5000${item.imagem}`} alt={`${item.marca} ${item.modelo}`} className='carroimg' />
                <a id='valorcolor'>{item.marca} {item.modelo} R$ {item.valor}</a>
                <a><strong></strong>{item.ano} • {item.quilometragem} km • {item.categoria} • {item.status}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Automovel não encontrado</p>
      )}
    </div>
  );
}

export default PopularesItens;