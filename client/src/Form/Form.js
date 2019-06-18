import React, { Component } from 'react';
import api from '../helpers/api';
import { Link } from 'react-router-dom';

import styles from './library';

export default function Form(type) {
  return class extends Component {
    state = {
      [type]: '',
      password: ''
    }

    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async event => {
      event.preventDefault();

      try {
        const result = await api.post(`/${type.toLowerCase()}`, {
          username: this.state[type],
          password: this.state.password,
        })
          if(type === 'Login') {
            localStorage.setItem('token', result.data.token);
            this.props.history.push('/jokes')
          } else {
            this.props.history.push('/login')
          }
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }

    render() {
      return (
        <form 
          style = { styles.container }
          onSubmit = { event => this.handleSubmit(event) }
        >
          <input 
            type="text"
            name = { type }
            placeholder = { type }
            value = { this.state[type] }
            onChange = { event => this.handleChange(event) }
            style = { styles.input }
          />
          <input 
            type="password"
            name="password"
            placeholder="Password"
            value = { this.state.password }
            onChange = { event => this.handleChange(event) }
            style = { styles.input }
          />
          <div style = { styles.btns }>
            <div style = { styles.aside }>
              { type === 'Login' ? 
                <>
                  <span>Don't have an account?</span>
                  <span>Register <Link to="/Register">here</Link></span>
                </>
              :
                <>
                  <span>Already have an account?</span>
                  <span>Login <Link to="/Login">here</Link></span>
                </>
              }
            </div>
            <input 
              type="submit"
              style = {{ ...styles.input, width: '50%', height: '100%' }}
              value = { type }
            />
          </div>
        </form>
      )
    }
  }
}