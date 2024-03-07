import React from 'react'

export default function NewsItem({title,description,ImageURL,NewsURL,author,DATE}) {
    return (
      <div className='container my-3'>
        <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" alt='Card_Image' src={ImageURL} style={{ maxHeight: "170px", width: "auto",minHeight: "170px" }} />
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(DATE).toDateString()}</small></p>
            <a href={NewsURL} className="btn btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
}
