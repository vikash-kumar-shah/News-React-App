import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
// import PropTypes from 'prop-types';
export default class News extends Component {

    constructor(props){
        super(props);
        document.title=`${this.props.category} -Aalpha Tips`
        console.log("Constructor")
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults: 0
        }
    }
    async UpdateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=e8c1c71c98ae4b0495d673d34849962b&page=${this.state.page}&pageSize=20`
        this.setState({loading:true})
        let Data= await fetch(url)
        let ParsedData=await Data.json()
        this.setState({loading:false})
        this.setState({articles:ParsedData.articles,totalResults:ParsedData.totalResults})
    }
    async componentDidMount(){
        this.UpdateNews()
    }
    handleNext=async ()=>{
        this.setState({page:this.state.page+1})
        this.UpdateNews()
    }
    handlePrev=async ()=>{
        this.setState({page:this.state.page-1})
        this.UpdateNews()
    }
  render() {
    
    return (
        <>
        {this.state.loading && <Spinner/>}
        {!this.state.loading && <div className='container'>
        <h2 className='text-center mt-3' >Aalpha Tips News Headline</h2>
        <div className='d-flex flex-wrap justify-content-center'>
            {this.state.articles.map((element)=>{
                
                if(element.url!==null && element.description!==null && element.title!==null && element.urlToImage!==null)
                {
                    return <div className='col-md-3 mb-3' key={element.urlToImage}>
                            <NewsItem title={element.title.slice(0,45)} description={element.description.slice(0,88)} NewsURL={element.url} ImageURL={element.urlToImage} author={element.author} DATE={element.publishedAt}/>
                        </div>
                }
                else 
                {
                    return null;
                }
            })}
        </div>
        <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page===1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
            <button type="button" disabled={this.state.page>=(Math.ceil(this.state.totalResults/20)-1)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div>
        </div>}
    </>
    )}
}

News.defaultProps={
    country:"in",
    category:"business"
}
