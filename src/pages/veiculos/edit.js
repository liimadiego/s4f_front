import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { FaTrash } from 'react-icons/fa';

function EditPage() {

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
 
  let { id } = useParams();
  let link_req_get = `/dados_editar_veiculo/${id}`;
  let link_req_post = `/editar_veiculo/${id}`;
  let delete_req = `/deletar_veiculo/${id}`;
  const navigate = useNavigate();
  
  const config = {
      headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` }
  };

  useEffect(() => {

    api
      .get(link_req_get, config)
      .then((response) => {
        setPortas(response.data[0].portas)
        setCor(response.data[0].cor)
        setAno_modelo(response.data[0].ano_modelo)
        setAno_fabricacao(response.data[0].ano_fabricacao)
        setPlaca(response.data[0].placa)
        setChassi(response.data[0].chassi)
        setModelo_id(response.data[0].modelo_id)
        setLocadora_id(response.data[0].locadora_id)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
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

  const handleChangeModelo = e => {
    setModelo_id(e.target.value);
  }

  const handleChangeLocadora = e => {
    setLocadora_id(e.target.value);
  }

  const handleSubmit = e => {
    
    e.preventDefault()

    let finalData = {
      portas,
      modelo_id,
      locadora_id,
      cor,
      ano_modelo,
      ano_fabricacao,
      placa,
      chassi
    }

    api
      .post(link_req_post, finalData, config)
      .then((response) => {
        if(response.data == 'token_invalido'){
          alert('Sem permissão para realizar esta ação')
        }else if(response.data == 'ja_existe'){
          alert('Veiculo já cadastrado!')
        }else{
          navigate('/veiculos')
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
        navigate('/veiculos')
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
              <input value={portas} min={0} onChange={e => setPortas(e.target.value)} type="number" className='input_number' placeholder='Número de portas'/>
            </label>
            <label>
              Cor:
              <input value={cor} onChange={e => setCor(e.target.value)} type="text" placeholder='Cor do veículo'/>
            </label>
          </div>
          <div>
            <label>
              Ano (modelo):
              <input value={ano_modelo} min={0} onChange={e => setAno_modelo(e.target.value)} type="number" className='input_number' placeholder='Ano (modelo) do veículo'/>
            </label>
            <label>
              Ano (fabricação):
              <input value={ano_fabricacao} min={0} onChange={e => setAno_fabricacao(e.target.value)} type="number" className='input_number' placeholder='Ano (fabricação) do veículo'/>
            </label>
          </div>
          <div>
            <label>
              Placa:
              <input value={placa} onChange={e => setPlaca(e.target.value)} type="text" placeholder='Placa do veículo'/>
            </label>
            <label>
              Chassi:
              <input value={chassi} onChange={e => setChassi(e.target.value)} type="text" placeholder='Chassi do veículo'/>
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