import React from 'react'
import loader from "./loader.gif"
export default function MyLoader() {
    return (
      <div className='d-flex justify-content-center'>
        <img src={loader} alt="loader" />
      </div>
    )
}
