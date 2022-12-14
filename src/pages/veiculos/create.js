import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function CreatePage() {
    
  const [ portas, setPortas ] = React.useState('');
  const [ cor, setCor ] = React.useState('');
  const [ ano_modelo, setAno_modelo ] = React.useState('');
  const [ ano_fabricacao, setAno_fabricacao ] = React.useState('');
  const [ placa, setPlaca ] = React.useState('');
  const [ chassi, setChassi ] = React.useState('');
  const [ modelo_id, setModelo_id ] = React.useState('');
  const [ modelos, setModelos ] = React.useState([]);
  const [ locadoras, setLocadoras ] = React.useState([]);
  const [ locadora_id, setLocadora_id ] = React.useState('');
  const navigate = useNavigate();

  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  const handleChangeModelo = e => {
    setModelo_id(e.target.value);
  }

  const handleChangeLocadora = e => {
    setLocadora_id(e.target.value);
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

  const handleSubmit = e => {
    
    e.preventDefault()

    let dados = {
      portas,
      modelo_id,
      locadora_id,
      cor,
      ano_modelo,
      ano_fabricacao,
      placa,
      chassi
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };

    if(
      portas != '' &&
      modelo_id != '' &&
      locadora_id != '' &&
      cor != '' &&
      ano_modelo != '' &&
      ano_fabricacao != '' &&
      placa != '' &&
      chassi != ''
    ){
      api
        .post('/registrar_veiculo', dados, config)
        .then((response) => {
          if(response.data == 'token_invalido'){
            alert('Sem permiss??o para realizar esta a????o')
          }else if(response.data == 'ja_existe'){
            alert('Ve??culo j?? cadastrado!')
          }
          else{
            navigate('/veiculos')
          }
        })
        .catch((err) => {
          console.error("Ops! ocorreu um erro: " + err);
        });
    }else{
      alert('Preencha todos os campos de forma correta!')
    }
  }

    return (
      <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Cadastrar novo ve??culo</h2>
          <Link to='/veiculos'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Modelo:
              <select value={modelo_id} onChange={handleChangeModelo}>
                <option>Selecione</option>
                {modelos.map((e, k)=>{
                  return(
                    <option key={k} value={e.id_modelo}>{e.nome_modelo}</option>
                  )
                })}
              </select>
            </label>
            <label>
              Locadora:
              <select value={locadora_id} onChange={handleChangeLocadora}>
                <option>Selecione</option>
                {locadoras.map((e, k)=>{
                  return(
                    <option key={k} value={e.id}>{e.nome_fantasia}</option>
                  )
                })}
              </select>
            </label>
          </div>
          <div>
            <label>
              Portas:
              <input min={0} onChange={e => setPortas(e.target.value)} type="number" className='input_number' placeholder='N??mero de portas'/>
            </label>
            <label>
              Cor:
              <input onChange={e => setCor(e.target.value)} type="text" placeholder='Cor do ve??culo'/>
            </label>
          </div>
          <div>
            <label>
              Ano (modelo):
              <input min={0} onChange={e => setAno_modelo(e.target.value)} type="number" className='input_number' placeholder='Ano (modelo) do ve??culo'/>
            </label>
            <label>
              Ano (fabrica????o):
              <input min={0} onChange={e => setAno_fabricacao(e.target.value)} type="number" className='input_number' placeholder='Ano (fabrica????o) do ve??culo'/>
            </label>
          </div>
          <div>
            <label>
              Placa:
              <input onChange={e => setPlaca(e.target.value)} type="text" placeholder='Placa do ve??culo'/>
            </label>
            <label>
              Chassi:
              <input onChange={e => setChassi(e.target.value)} type="text" placeholder='Chassi do ve??culo'/>
            </label>
          </div>

          <div className='container_submit'>
            <input type="submit" value="Enviar" />
          </div>
        </form>
      </div>
    );
}

export default CreatePage