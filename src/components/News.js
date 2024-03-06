import React, { Component } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from 'react-infinite-scroll-component';
import MyLoader from './MyLoader';
export default class News extends Component {

    constructor(props){
        super(props);
        console.log(process.env.REACT_APP_NEWS_API)
        document.title=`${this.props.category} -Aalpha Tips`
        console.log("Constructor")
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults: 0,
            count:0
        }
    }
    async UpdateNews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page}&pageSize=20`
        this.setState({loading:true})
        let Data= await fetch(url)
        let ParsedData=await Data.json()
        this.setState({loading:false})
        this.setState({articles:this.state.articles.concat(ParsedData.articles),totalResults:ParsedData.totalResults})
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
    fetchData=async ()=>{
        this.setState({page:this.state.page+1,count:this.state.count+1})
        this.UpdateNews()
    }
  render() {
    
    return (
        <>
        {/* {this.state.loading && <Spinner/>} */}
        <div className='container'>
        <h2 className='text-center mt-3' >Aalpha Tips News Headline</h2>
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchData}
        hasMore={this.state.articles.length<=this.state.totalResults}
        loader={<MyLoader/>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            </p>
        }
        >
        <div className='d-flex flex-wrap justify-content-center' key={this.state.count}>
            {this.state.articles.map((element,index)=>{
                
                if(element.url!==null && element.description!==null && element.title!==null && element.urlToImage!==null)
                {
                    return <div className='col-md-3 mb-3' key={element.urlToImage+element.url+index}>
                            <NewsItem title={element.title.slice(0,45)} description={element.description.slice(0,88)} NewsURL={element.url} ImageURL={element.urlToImage} author={element.author} DATE={element.publishedAt}/>
                        </div>
                }
                else
                {
                    return null;
                }
            })}
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page===1} className="btn btn-dark" onClick={this.handlePrev}>&larr; Prev</button>
            <button type="button" disabled={this.state.page>=(Math.ceil(this.state.totalResults/20)-1)} className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
        </div> */}
        </div>
    </>
    )}
}

News.defaultProps={
    country:"in",
    category:"business"
}
