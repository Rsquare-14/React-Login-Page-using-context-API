import axios from "axios";
import { useEffect, useState } from "react";

export function UseBlogSearch (pageNumber) {
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [hasMore , setHasMore] = useState(false);


  useEffect(() => {
    setLoading(true);
    setError(false);
    axios({
      method : "GET",
      url : "https://newsapi.org/v2/everything?q=tesla&from=2022-10-17&sortBy=publishedAt&apiKey=888f9850fcd945598f09d17797200a2d",
      params : {page : pageNumber, pageSize : 5}
    }).then(res => {
      setBlogs((prevBlogs) => {
        return [...new Set([...prevBlogs,...res.data.articles.map((blog) => {return blog})])]
      })
      setHasMore(res.data.articles.length>0)
      setLoading(false);
    }).catch((e) => {
      setError(true);
    })
  },[pageNumber])

  return {loading , error , blogs, hasMore}
}