import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

function EditPage() {

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
 
  let { id } = useParams();
  let link_req_get = `/dados_editar_locadora/${id}`;
  let link_req_post = `/editar_locadora/${id}`;
  let delete_req = `/deletar_locadora/${id}`;
  const navigate = useNavigate();
  
  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {

    api
      .get(link_req_get, config)
      .then((response) => {
        setNome_fantasia(response.data[0].nome_fantasia)
        setRazao_social(response.data[0].razao_social)
        setCnpj(response.data[0].cnpj)
        setEmail(response.data[0].email)
        setTelefone(response.data[0].telefone)
        setCep(response.data[0].cep)
        setLogradouro(response.data[0].logradouro)
        setNumero(response.data[0].numero)
        setBairro(response.data[0].bairro)
        setCidade(response.data[0].cidade)
        setEstado(response.data[0].estado)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const handleSubmit = e => {
    
    e.preventDefault()

    let finalData = {
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

    api
      .post(link_req_post, finalData, config)
      .then((response) => {
        if(response.data == 'token_invalido'){
          alert('Sem permissão para realizar esta ação')
        }else if(response.data == 'ja_existe'){
          alert('Locadora já cadastrada!')
        }else{
          navigate('/locadoras')
        }
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const deleteItem = () => {
    api
    .get(delete_req, config)
    .then((response) => {
      if(response.data == 'token_invalido'){
        alert('Sem permissão para realizar esta ação')
      }else{
        navigate('/locadoras')
      }
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

    return (
      <div className='container'>
        <div className='header_page'>
          <h2 className='title_page'>Editar</h2>
          <Link to='/locadoras'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>
              Nome fantasia:
              <input value={ nome_fantasia } onChange={e => setNome_fantasia(e.target.value)} type="text" placeholder='Nome fantasia da locadora'/>
            </label>
            <label>
              Razão Social:
              <input value={ razao_social } onChange={e => setRazao_social(e.target.value)} type="text" placeholder='Razão social da locadora'/>
            </label>
          </div>
          <div>
            <label>
              CNPJ:
              <input value={ cnpj } onChange={e => setCnpj(e.target.value)} type="text" placeholder='CNPJ'/>
            </label>
            <label>
              E-mail:
              <input value={ email } onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail da locadora'/>
            </label>
          </div>
          <div>
            <label>
              Telefone:
              <input value={ telefone } onChange={e => setTelefone(e.target.value)} type="text" placeholder='Telefone da locadora'/>
            </label>
          </div>
    
          <hr className='hr'></hr>
          <h3 className='subTitulo'>Endereço</h3>
          <div>
            <label>
              CEP:
              <input value={ cep } onChange={e => setCep(e.target.value)} type="text" placeholder='CEP da locadora'/>
            </label>
            <label>
              Logradouro:
              <input value={ logradouro } onChange={e => setLogradouro(e.target.value)} type="text" placeholder='Logradouro da locadora'/>
            </label>
          </div>

          <div>
            <label>
              Número:
              <input value={ numero } onChange={e => setNumero(e.target.value)} type="text" placeholder='Número da locadora'/>
            </label>
            <label>
              Bairro:
              <input value={ bairro } onChange={e => setBairro(e.target.value)} type="text" placeholder='Bairro da locadora'/>
            </label>
          </div>
          
          <div>
            <label>
              Cidade:
              <input value={ cidade } onChange={e => setCidade(e.target.value)} type="text" placeholder='Cidade da locadora'/>
            </label>
            <label>
              Estado:
              <input value={ estado } onChange={e => setEstado(e.target.value)} type="text" placeholder='Estado da locadora'/>
            </label>
          </div>
          <div className='container_submit'>
            <button className='delete_btn' onClick={deleteItem} type="button"><FaTrash /></button>
            <input type="submit" value="Enviar" />
          </div>
        </form>
      </div>
    );
}

export default EditPage