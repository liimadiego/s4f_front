import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function CreatePage() {
    
  const [ nome_modelo, setNome_modelo ] = React.useState('');
  const [ montadora_id, setMontadora_id ] = React.useState('');
  const [ montadoras, setMontadoras ] = React.useState([]);
  const navigate = useNavigate();


  const handleChange = e => {
    setMontadora_id(e.target.value);
  }

  const handleSubmit = e => {
    
    e.preventDefault()

    let dados = {
      nome_modelo,
      montadora_id
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };

    if(
      nome_modelo != '' &&
      montadora_id != ''
    ){
      api
        .post('/registrar_modelo', dados, config)
        .then((response) => {
          if(response.data == 'token_invalido'){
            alert('Sem permissão para realizar esta ação')
          }else if(response.data == 'ja_existe'){
            alert('Modelo já cadastrado!')
          }
          else{
            navigate('/modelos')
          }
        })
        .catch((err) => {
          console.error("Ops! ocorreu um erro: " + err);
        });
    }else{
      alert('Preencha todos os campos de forma correta!')
    }
  }

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
          <h2 className='title_page'>Cadastrar novo modelo</h2>
          <Link to='/modelos'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Modelo:
              <input onChange={e => setNome_modelo(e.target.value)} type="text" placeholder='Nome do modelo'/>
            </label>
            <label>
              Montadora:
              <select value={montadora_id} onChange={handleChange}>
                <option>Selecione</option>
                {montadoras.map((e, k)=>{
                  return(
                    <option key={k} value={e.id}>{e.nome_montadora}</option>
                  )
                })}
              </select>
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