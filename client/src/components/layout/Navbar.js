import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
        <div className='container'>
          {/*
          <Link className='navbar-brand' to='/'>
            DevConnect
          </Link>
          */}
          <a className='navbar-brand' href='/'>
            DevConnect
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                {/*
                <Link className='nav-link' to='/profiles'>
                  {' '}
                  Developers
                </Link>
                */}
                <a className='nav-link' href='/profiles'>
                  {' '}
                  Developers
                </a>
              </li>
            </ul>

            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                {/*
                <Link className='nav-link' to='/register'>
                  Sign Up
                </Link>
              */}
                <a className='nav-link' href='/register'>
                  Sign Up
                </a>
              </li>
              <li className='nav-item'>
                {/*
                <Link className='nav-link' to='/login'>
                  Login
                </Link>
              */}
                <a className='nav-link' href='/login'>
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
