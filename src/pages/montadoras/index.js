import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ montadoras, setMontadoras ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/montadoras", config)
      .then((response) => {
        if(response.data == 'token_invalido' || response.data == []){
          setMontadoras([])
        }else{
          setMontadoras(response.data)
        }
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  }, []);


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Lista de Montadoras</h2>
          <div className='search_register'>
            <Link to='/montadoras/cadastrar'>Cadastrar nova</Link>
          </div>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Montadora</div>
              <div>Qtd. Veículos</div>
            </li>
            {montadoras.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {montadoras.map((e, k)=>{
              let redirect_link = `/montadoras/editar/${e.id}`
              return(
                <li key={k}>
                  <Link to={redirect_link} className='table_row'>
                    <div className='id_linha_tabela'>{e.id}</div>
                    <div>{e.nome_montadora}</div>
                    <div>{e.cont}</div>
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