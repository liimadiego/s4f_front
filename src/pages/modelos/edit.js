import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

function EditPage() {
    
  const [ nome_modelo, setNome_modelo ] = React.useState('');
  const [ montadora_id, setMontadora_id ] = React.useState('');
  const [ montadoras, setMontadoras ] = React.useState([]);
 
  let { id } = useParams();
  let link_req_get = `/dados_editar_modelo/${id}`;
  let link_req_post = `/editar_modelo/${id}`;
  let delete_req = `/deletar_modelo/${id}`;
  const navigate = useNavigate();

  const handleChange = e => {
    setMontadora_id(e.target.value);
  }
  
  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {

    api
      .get(link_req_get, config)
      .then((response) => {
        setNome_modelo(response.data[0].nome_modelo)
        setMontadora_id(response.data[0].montadora_id)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });

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

  const handleSubmit = e => {
    
    e.preventDefault()

    let finalData = {
      nome_modelo,
      montadora_id
    }

    api
      .post(link_req_post, finalData, config)
      .then((response) => {
        if(response.data == 'token_invalido'){
          alert('Sem permissão para realizar esta ação')
        }else if(response.data == 'ja_existe'){
          alert('Modelo já cadastrado!')
        }else{
          navigate('/modelos')
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
        navigate('/modelos')
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
          <Link to='/modelos'>Voltar</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Modelo:
              <input onChange={e => setNome_modelo(e.target.value)} value={ nome_modelo } type="text" placeholder='Nome do modelo'/>
            </label>
            <label>
              Modelo:
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
            <button className='delete_btn' onClick={deleteItem} type="button"><FaTrash /></button>
            <input type="submit" value="Enviar" />
          </div>
        </form>
      </div>
    );
}

export default EditPage