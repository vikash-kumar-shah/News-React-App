import React, { Component } from 'react'
import GIF from './Walk.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center spindiv" style={{ height: '100vh', width: '100vw' }}>
        <img src={GIF} className="img-fluid" alt="spinner" />
      </div>
    )
  }
}
