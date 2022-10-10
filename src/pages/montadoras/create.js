import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function CreatePage() {
    
  const [ nome_montadora, setNome_montadora ] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    
    e.preventDefault()

    let dados = {
      nome_montadora
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };

    if(
      nome_montadora != ''
    ){
      api
        .post('/registrar_montadora', dados, config)
        .then((response) => {
          if(response.data == 'token_invalido'){
            alert('Sem permissão para realizar esta ação')
          }else if(response.data == 'ja_existe'){
            alert('Montadora já cadastrada!')
          }
          else{
            navigate('/montadoras')
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
          <h2 className='title_page'>Cadastrar nova montadora</h2>
          <Link to='/montadoras'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nome:
              <input onChange={e => setNome_montadora(e.target.value)} type="text" placeholder='Nome da montadora'/>
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