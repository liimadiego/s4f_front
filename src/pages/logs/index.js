import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ logs, setLogs ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/logs", config)
      .then((response) => {
        if(response.data == 'token_invalido' || response.data == []){
          setLogs([])
        }else{
          setLogs(response.data)
        }
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  }, []);


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Log Veículos x Locadoras</h2>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Modelo</div>
              <div>Locadora</div>
              <div>Data início</div>
              <div>Data fim</div>
            </li>
            {logs.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {logs.map((e, k)=>{
              return(
                <li key={k} className='table_row'>
                    <div className='id_linha_tabela'>{e.id_log}</div>
                    <div>{e.nome_modelo}</div>
                    <div>{e.nome_fantasia}</div>
                    <div>{e.data_inicio}</div>
                    <div>{e.data_fim}</div>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default HomePage