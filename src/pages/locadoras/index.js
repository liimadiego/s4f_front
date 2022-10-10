import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ locadoras, setLocadoras ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/locadoras", config)
      .then((response) => {
        if(response.data == 'token_invalido' || response.data == []){
          setLocadoras([])
        }else{
          setLocadoras(response.data)
        }
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  }, []);


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Lista de Locadoras</h2>
          <div className='search_register'>
            <Link to='/locadoras/cadastrar'>Cadastrar nova</Link>
          </div>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Locadora</div>
              <div>CNPJ</div>
              <div>E-mail</div>
              <div>Localidade</div>
            </li>
            {locadoras.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {locadoras.map((e, k)=>{
              let redirect_link = `/locadoras/editar/${e.id_locadora}`
              return(
                <li key={k}>
                  <Link to={redirect_link} className='table_row'>
                    <div className='id_linha_tabela'>{e.id}</div>
                    <div>{e.nome_fantasia}</div>
                    <div>{e.cnpj}</div>
                    <div>{e.email}</div>
                    <div>{e.cidade}/{e.estado}</div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default HomePage