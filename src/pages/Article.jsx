import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const Article = () => {
  // has now an obj which contains the :id info declared in App.js
  const { id } = useParams();
  const url = "http://localhost:3000/articles/" + id;
  const { data: article, isPending, error } = useFetch(url);
  // history contains now a obj on which methods can be applied related to useHistory
  const history = useHistory()
  

  useEffect(()=>{
    if(error){
        // redirect
        // goBack() like we would press the back-arrow
        // history.goBack()
        // push('/') routes the user back to home
        setTimeout(()=>{
            history.push('/')
        }, 2000)
    }
  },[error, history])

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {article && (
        <div>
          <h2>{article.title}</h2>
          <p>{article.author}</p>
          <p>{article.body}</p>
        </div>
      )}
    </div>
  );
};

export default Article;
