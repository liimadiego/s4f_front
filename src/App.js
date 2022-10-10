import { Route, Routes, Link } from 'react-router-dom';

import './css/global.css';

import Header from './layout/header';
import Locadoras from './pages/locadoras/index';
import CadastrarLocadora from './pages/locadoras/create';
import EditarLocadora from './pages/locadoras/edit';

import Montadoras from './pages/montadoras/index';
import CadastrarMontadora from './pages/montadoras/create';
import EditarMontadora from './pages/montadoras/edit';

import Modelos from './pages/modelos/index';
import CadastrarModelo from './pages/modelos/create';
import EditarModelo from './pages/modelos/edit';

import Veiculos from './pages/veiculos/index';
import CadastrarVeiculo from './pages/veiculos/create';
import EditarVeiculo from './pages/veiculos/edit';

import Locadoras_x_veiculos from './pages/relatorios/locadoras_x_veiculos';

import Locadoras_x_modelos from './pages/relatorios/locadoras_x_modelos';

import LogVeiculo from './pages/logs/index';

function App() {

  return (
    <>
      <Header />
     
      <Routes>
        <Route path='/' element={ <h1 className='homepage'>Página inicial</h1> }/>

        <Route path='/locadoras/' element={ <Locadoras /> }/>
        <Route path='/locadoras/cadastrar' element={ <CadastrarLocadora /> }/>
        <Route path='/locadoras/editar/:id' element={ <EditarLocadora /> }/>

        <Route path='/montadoras/' element={ <Montadoras /> }/>
        <Route path='/montadoras/cadastrar' element={ <CadastrarMontadora /> }/>
        <Route path='/montadoras/editar/:id' element={ <EditarMontadora /> }/>

        <Route path='/modelos/' element={ <Modelos /> }/>
        <Route path='/modelos/cadastrar' element={ <CadastrarModelo /> }/>
        <Route path='/modelos/editar/:id' element={ <EditarModelo /> }/>

        <Route path='/veiculos/' element={ <Veiculos /> }/>
        <Route path='/veiculos/cadastrar' element={ <CadastrarVeiculo /> }/>
        <Route path='/veiculos/editar/:id' element={ <EditarVeiculo /> }/>
        
        <Route path='/relatorios/locadoras_x_veiculos' element={ <Locadoras_x_veiculos /> }/>
        <Route path='/relatorios/locadoras_x_modelos' element={ <Locadoras_x_modelos /> }/>
        
        <Route path='/log/' element={ <LogVeiculo /> }/>

        <Route path='*' element={ <h1>404 Not found</h1> }/>
      </Routes>
    </>
  );
}

export default App;
