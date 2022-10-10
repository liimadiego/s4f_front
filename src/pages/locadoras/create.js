import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function CreatePage() {
    
  const [ nome_fantasia, setNome_fantasia ] = React.useState('');
  const [ razao_social, setRazao_social ] = React.useState('');
  const [ cnpj, setCnpj ] = React.useState('');
  const [ email, setEmail ] = React.useState('');
  const [ telefone, setTelefone ] = React.useState('');
  const [ cep, setCep ] = React.useState('');
  const [ logradouro, setLogradouro ] = React.useState('');
  const [ numero, setNumero ] = React.useState('');
  const [ bairro, setBairro ] = React.useState('');
  const [ cidade, setCidade ] = React.useState('');
  const [ estado, setEstado ] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    
    e.preventDefault()

    let dados = {
      nome_fantasia,
      razao_social,
      cnpj,
      email,
      telefone,
      cep,
      logradouro,
      numero,
      bairro,
      cidade,
      estado
    }

    const config = {
        headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
    };

    if(
      nome_fantasia != '' &&
      razao_social != '' &&
      cnpj != '' &&
      email != '' &&
      telefone != '' &&
      cep != '' &&
      logradouro != '' &&
      numero != '' &&
      bairro != '' &&
      cidade != '' &&
      estado != ''
    ){
      api
        .post('/registrar_locadora', dados, config)
        .then((response) => {
          if(response.data == 'token_invalido'){
            alert('Sem permissão para realizar esta ação')
          }else if(response.data == 'ja_existe'){
            alert('Locadora já cadastrada!')
          }
          else{
            navigate('/locadoras')
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
          <h2 className='title_page'>Cadastrar nova locadora</h2>
          <Link to='/locadoras'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Nome fantasia:
              <input onChange={e => setNome_fantasia(e.target.value)} type="text" placeholder='Nome fantasia da locadora'/>
            </label>
            <label>
              Razão Social:
              <input onChange={e => setRazao_social(e.target.value)} type="text" placeholder='Razão social da locadora'/>
            </label>
          </div>
          <div>
            <label>
              CNPJ:
              <input onChange={e => setCnpj(e.target.value)} type="text" placeholder='CNPJ'/>
            </label>
            <label>
              E-mail:
              <input onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail da locadora'/>
            </label>
          </div>
          <div>
            <label>
              Telefone:
              <input onChange={e => setTelefone(e.target.value)} type="text" placeholder='Telefone da locadora'/>
            </label>
          </div>
    
          <hr className='hr'></hr>
          <h3 className='subTitulo'>Endereço</h3>
          <div>
            <label>
              CEP:
              <input onChange={e => setCep(e.target.value)} type="text" placeholder='CEP da locadora'/>
            </label>
            <label>
              Logradouro:
              <input onChange={e => setLogradouro(e.target.value)} type="text" placeholder='Logradouro da locadora'/>
            </label>
          </div>

          <div>
            <label>
              Número:
              <input onChange={e => setNumero(e.target.value)} type="text" placeholder='Número da locadora'/>
            </label>
            <label>
              Bairro:
              <input onChange={e => setBairro(e.target.value)} type="text" placeholder='Bairro da locadora'/>
            </label>
          </div>
          
          <div>
            <label>
              Cidade:
              <input onChange={e => setCidade(e.target.value)} type="text" placeholder='Cidade da locadora'/>
            </label>
            <label>
              Estado:
              <input onChange={e => setEstado(e.target.value)} type="text" placeholder='Estado da locadora'/>
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