import React, { Component } from 'react';
import api from '../helpers/api';

export default class Jokes extends Component {
  state = {
    jokes: [],
    joke: {},
    next: {},
    interval: '',
    list: true
  }

  async componentDidMount() {
    try {
      let result = await api.get('/jokes')
      let data = result.data.map((joke, i) => ({
        joke: joke.joke,
        index: i + 1
      }))      

      this.setState({ 
        jokes: data, 
        joke: data[0], 
        next: data[1]
      })
    } catch (err) {
      console.log(err)
    }
  }
  
  cycle = () => {
    let index = this.state.next.index;

    if(index !== this.state.jokes.length) {
      this.setState({
        joke: this.state.next,
        next: this.state.jokes[index]
      })
    } else {
      this.setState({
        joke: this.state.next,
        next: this.state.jokes[0]
      })
    }
    console.log(this.state)
  }

  render() {
    return (
      <>
        <div 
          style = {{
            width: '100%',
            top: '0',
            display: 'flex',
            justifyContent: 'center',
            height: '30px'
          }}
        >
          <button 
            style = {{
              border: '2px solid black',
              padding: '0 10px'
            }}
            onClick = { this.state.list ?
              () => this.setState({
                list: false,
                interval: setInterval(this.cycle, 3000) 
              })
            :
            () => this.setState({
              list: true,
              interval: clearInterval(this.state.interval) 
            })
            }
          >
            { this.state.list ? 
              'Cycle' 
            :
              'List'
            }
          </button>
        </div>
        <div style = {{
          textAlign: 'center',
          paddingTop: '30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          { this.state.list ? 
            this.state.jokes.map((joke, i) => (
              <div 
              style = {{
                  border: '2px solid black',
                  padding: '30px 20px',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
                onClick = { () => this.setState({ interval: clearInterval(this.state.interval) }) }
              >
                <span style={{ fontSize: '1.2rem' }}>
                  <b style = {{ fontWeight: 'bold' }}>{ i + 1 }.</b>&nbsp; 
                  <em style={{ fontStyle: 'italic' }}>{ joke.joke }</em>
                </span>
                <br />
                <br />
              </div>
            ))
          :
            <div 
              style = {{
                border: '2px solid black',
                padding: '30px 20px',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
              onClick = { () => this.setState({ interval: clearInterval(this.state.interval) }) }
            >
              <span style={{ fontSize: '1.2rem' }}><b style = {{ fontWeight: 'bold' }}>{ this.state.joke.index }.</b> <em style={{ fontStyle: 'italic' }}>{ this.state.joke.joke }</em></span>
            </div>
          }
        </div>
      </>
    )
  }
}