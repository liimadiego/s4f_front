import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaSearch } from 'react-icons/fa';
import api from '../../services/api';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

function HomePage() {

  const [ veiculos, setVeiculos ] = React.useState([]);
  const [ locadora, setLocadora ] = React.useState('');
  const [ modelo_id, setModelo_id ] = React.useState('');
  const [ modelos, setModelos ] = React.useState([]);
  const [ rangePicker, setRangePicker ] = React.useState(null);

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  const handleChangeModelo = e => {
    setModelo_id(e.target.value);
  }

  const handleChangePicker = e => {
    if(e == null){
      setRangePicker(null);
    }else{
      setRangePicker([e[0],e[1]]);
    }
    
    
  }
  
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

  const Filtered = () => {
    let data_i = rangePicker !== null ? new Date(rangePicker[0]).toLocaleDateString('es-US') : '';
    let data_f = rangePicker !== null ? new Date(rangePicker[1]).toLocaleDateString('es-US') : ''
    let url = `locadora=${locadora}&data_inicio=${data_i}&data_fim=${data_f}&modelo_id=${modelo_id}`;
    let filtro = {
      url
    };
    console.log(url)
    const search_req = `/veiculos_filtrados`
      api
        .post(search_req, url, config)
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
  }


  return (
    <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Locadoras X Veículos</h2>
        </div>
        <div>
        <div className='container_search'>
          <div className='datePickerDiv'>
            <DateRangePicker onChange={handleChangePicker} value={rangePicker} />
          </div>
          <select className='pesquisa_modelo' value={modelo_id} onChange={handleChangeModelo}>
            <option>Selecione o modelo</option>
            {modelos.map((e, k)=>{
              return(
                <option key={k} value={e.id_modelo}>{e.nome_modelo}</option>
              )
            })}
          </select>
          <div className='pesquisa_locadora'>
            <input placeholder='Pesquisar por locadora' type='text' onChange={e => setLocadora(e.target.value)}/>
            <button className='search_button' onClick={Filtered}><FaSearch /></button>
          </div>
          
        </div>
        
        </div>
        <div className='table_container'>
          <ul>
            <li className='header_table'>
              <div className='id_linha_tabela'>ID</div>
              <div>Locadora</div>
              <div>Modelo</div>
              <div>Placa</div>
              <div>Data de cadastro</div>
            </li>
            {veiculos.length == 0 ? <h3 className='noData'>Sem dados!</h3> : false}
            {veiculos.map((e, k)=>{
              let redirect_link = `/veiculos/editar/${e.id_veiculo}`
              let date = String(new Date(e.veiculo_criado_em).toLocaleDateString("pt-BR"));
              return(
                <li key={k}>
                  <Link to={redirect_link} className='table_row'>
                    <div className='id_linha_tabela'>{e.id_veiculo}</div>
                    <div>{e.nome_fantasia}</div>
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