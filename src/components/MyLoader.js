import React, { Component } from 'react'
import loader from "./loader.gif"
export default class MyLoader extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center'>
        <img src={loader} alt="loader" />
      </div>
    )
  }
}
