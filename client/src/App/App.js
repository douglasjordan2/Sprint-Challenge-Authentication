import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Links from './data';
import styles from './library';

class App extends Component {
  render() {
    return (
      <div style = { styles.page }>
        <header style = { styles.header }>
          <h1 style = { styles.welcome }>Welcome</h1>
          <ul style = { styles.nav }>
            { Links.map((link, i) => (
              <li>
                <NavLink to={ `/${link.name.toLowerCase()}` }>
                  { link.name }
                </NavLink>
                { i !== Links.length - 1 ? 
                  <span>&nbsp;|&nbsp;</span> 
                :
                  null
                }
              </li>
            ))}
          </ul>
        </header>

        <main>
          { Links.map(link => (
            <Route path = { `/${link.name.toLowerCase()}` } component = { link.render } />
          )) }
        </main>

        <footer>
          <span style = {{ fontSize: '0.7rem', margin: '10px' }}>Copyright: Douglas</span>
        </footer>
      </div>
    );
  }
}

export default App;
