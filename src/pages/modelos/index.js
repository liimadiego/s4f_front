import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ modelos, setModelos ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/modelos", config)
      .then((response) => {
        if(response.data == 'token_invalido' || response.data == []){
          setModelos([])
        }else{
          setModelos(response.data)
        }
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  }, []);


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Lista de modelos</h2>
          <div className='search_register'>
            <Link to='/modelos/cadastrar'>Cadastrar novo</Link>
          </div>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Modelo</div>
              <div>Montadora</div>
            </li>
            {modelos.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {modelos.map((e, k)=>{
              let redirect_link = `/modelos/editar/${e.id_modelo}`
              return(
                <li key={k}>
                  <Link to={redirect_link} className='table_row'>
                    <div className='id_linha_tabela'>{e.id_modelo}</div>
                    <div>{e.nome_modelo}</div>
                    <div>{e.nome_montadora}</div>
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