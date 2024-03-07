import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import MyLoader from './MyLoader';

export default function News(props) {
    document.title = `${props.category} - Aalpha Tips`;

    const [state, setState] = useState({
        articles: [],
        loading: false,
        page: 1,
        totalResults: 0,
    });

    useEffect(() => {
        console.log("Updating value inside useEffect");
        UpdateNews();
    }, []); // Empty dependency array to run only once after component mount

    const UpdateNews = async () => {
        console.log("Updating value inside UpdateNews()");
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${state.page}&pageSize=20`;

        setState(prevState => ({ ...prevState, loading: true })); // Update loading state correctly
        console.log("Length of articles-", state.articles.length);
        console.log("Articles-", state.articles);

        let Data = await fetch(url);
        let ParsedData = await Data.json();
        console.log(ParsedData);

        setState(prevState => ({
            ...prevState,
            loading: false,
            articles: prevState.articles.concat(ParsedData.articles),
            totalResults: ParsedData.totalResults
        }));
    }

    const fetchData = async () => {
        setState(prevState => ({ ...prevState, page: state.page + 1 }));
        UpdateNews();
    }

    return (
        <>
            <div className='container'>
                <h2 className='text-center mt-3'>Aalpha Tips News Headline</h2>
                <InfiniteScroll
                    next={fetchData}
                    dataLength={state.articles ? state.articles.length : 0}
                    hasMore={state.articles && state.articles.length <= state.totalResults}
                    loader={<MyLoader />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className='d-flex flex-wrap justify-content-center' key={props.ImageURL}>
                        {console.log("Printing inside the JSX", state.articles)}
                        {state.articles.map((element, index) => {
                            if (element.url !== null && element.description !== null && element.title !== null && element.urlToImage !== null) {
                                return <div className='col-md-3 mb-3' key={element.urlToImage + element.url + index}>
                                    <NewsItem title={element.title.slice(0, 45)} description={element.description.slice(0, 88)} NewsURL={element.url} ImageURL={element.urlToImage} author={element.author} DATE={element.publishedAt} />
                                </div>
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
}

News.defaultProps = {
    country: "in",
    category: "business"
}
