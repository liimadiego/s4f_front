import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import api from '../../services/api';

function HomePage() {

  const [ locadoras, setLocadoras ] = React.useState([]);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };
  
  useEffect(() => {
    api
    .get("/locadoras_x_modelos", config)
    .then((response) => {
      console.log(response.data)
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
          <h2 className='title_page'>Locadoras X Modelos</h2>
        </div>
        <div>
        
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div>Locadora</div>
              <div>Modelo</div>
              <div>Qtd. Modelo na locadora</div>
            </li>
            {locadoras.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {locadoras.map((e, k)=>{
              let redirect_link = `/locadoras/editar/${e.id_veiculo}`
              let date = String(new Date(e.veiculo_criado_em).toLocaleDateString("pt-BR"));
              return(
                <li key={k} className='table_row'>
                    <div>{e.nome_fantasia}</div>
                    <div>{e.nome_modelo}</div>
                    <div>{e.qtd_veiculo_x_modelo}</div>
                </li>
              )
            })}
          </ul>
        </div>
    </div>
  );
}

export default HomePage