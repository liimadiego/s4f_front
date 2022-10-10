import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ veiculos, setVeiculos ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {
    api
      .get("/veiculos", config)
      .then((response) => {
        if(response.data == 'token_invalido' || response.data == []){
          setVeiculos([])
        }else{
          setVeiculos(response.data)
        }
      })
      .catch((err) => {
        console.error("Ops! Ocorreu um erro: " + err);
      });
  }, []);



  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Lista de veículos</h2>
          <div className='search_register'>
            <Link to='/veiculos/cadastrar'>Cadastrar novo</Link>
          </div>
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Modelo</div>
              <div>Placa</div>
              <div>Data de cadastro</div>
            </li>
            {veiculos.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {veiculos.map((e, k)=>{
              let redirect_link = `/veiculos/editar/${e.id_veiculo}`
              let date = String(new Date(e.created_at).toLocaleDateString("pt-BR"));
              return(
                <li key={k}>
                  <Link to={redirect_link} className='table_row'>
                    <div className='id_linha_tabela'>{e.id_veiculo}</div>
                    <div>{e.nome_modelo}</div>
                    <div>{e.placa}</div>
                    <div>{date}</div>
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