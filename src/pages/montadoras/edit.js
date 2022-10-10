import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

function EditPage() {

  const [ nome_montadora, setNome_montadora ] = React.useState('');
 
  let { id } = useParams();
  let link_req_get = `/dados_editar_montadora/${id}`;
  let link_req_post = `/editar_montadora/${id}`;
  let delete_req = `/deletar_montadora/${id}`;
  const navigate = useNavigate();
  
  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {

    api
      .get(link_req_get, config)
      .then((response) => {
        setNome_montadora(response.data[0].nome_montadora)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const handleSubmit = e => {
    
    e.preventDefault()

    let finalData = {
      nome_montadora
    }

    api
      .post(link_req_post, finalData, config)
      .then((response) => {
        if(response.data == 'token_invalido'){
          alert('Sem permissão para realizar esta ação')
        }else if(response.data == 'ja_existe'){
          alert('Montadora já cadastrada!')
        }else{
          navigate('/montadoras')
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
        navigate('/montadoras')
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
          <Link to='/montadoras'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>
              Nome:
              <input value={ nome_montadora } onChange={e => setNome_montadora(e.target.value)} type="text" placeholder='Nome da montadora'/>
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