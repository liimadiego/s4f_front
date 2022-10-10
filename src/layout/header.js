import { FaCar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
    render(){
        return (
            <>
              <header>
                  <div className='logo_container'> 
                      <Link to='/'>
                          <span><FaCar /></span>
                          <p>AutoAluga</p>
                      </Link>
                  </div>
                  <div className="menu">
                    <div className='menu-item'> 
                        <Link to='/locadoras'>
                            <p>Locadoras</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/montadoras'>
                            <p>Montadoras</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/modelos'>
                            <p>Modelos</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/veiculos'>
                            <p>Veículos</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/relatorios/locadoras_x_veiculos'>
                            <p>Locadoras/Veículos</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/relatorios/locadoras_x_modelos'>
                            <p>Locadoras/Modelos</p>
                        </Link>
                    </div>
                    <div className='menu-item'> 
                        <Link to='/log'>
                            <p>Log</p>
                        </Link>
                    </div>
                  </div>
              </header>
            </>
          );
    }
  }

export default Header;