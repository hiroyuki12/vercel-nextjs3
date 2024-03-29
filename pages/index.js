import React, { useState, useEffect } from 'react';
// axiosをインポート
import axios from 'axios';
import lodash from 'lodash';
import moment from 'moment';
//import './QiitaApp.css';

function App() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [postsList, setPostsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tag, setTag] = useState('next.js');
  const [error, setError] = useState('');

  // 一番下に到達したら handleClick()でページを更新
  const handleScroll = lodash.throttle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }

    // 一番下に到達した時の処理
    //if(message !== "loading...") {
      setPage((prevCount) => prevCount + 1);
    //}

  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // pageが変化した時に実行
  useEffect(() => {
    //document.title = `page = ${page}, message = ${message}`;
    handleClick();
    // eslint-disable-next-line
  }, [page]); // Only re-run the effect if count changes

  // tagが変化した時に実行
  useEffect(() => {
    //document.title = `page = ${page}, message = ${message}`;
    handleClick();
    // eslint-disable-next-line
  }, [tag]); // Only re-run the effect if count changes

  const tagButtonClick = (target) => {
    setPerPage(20);
    setPostsList([]);
    setPage(1);
    setTag(target);
  }

  const pageButtonClick = (target) => {
    setPerPage(100);
    setPostsList([]);
    const tmp = parseInt(target,10);
    setPage(tmp);
    //setTag('Swift');
  }

  const handleClick = (target) => {
    const url = `https://qiita.com/api/v2/tags/${tag}/items?page=${page}&per_page=${perPage}`;
    setIsLoading(true);

    const headers = {}
    fetch(url, { headers })
      .then(res =>
        res.json().then(data => ({
          ok: res.ok,
          data,
        }))
      )
      .then(res => {
        if (!res.ok) {
          setError(res.data.message);
          setIsLoading(false);
          //throw Error(res.data.message)
        } else {
          setPostsList(postsList.concat(res.data));
          setIsLoading(false);
        }
      })
  }

  // page + 1 
  const getNextQiitaPosts = () => {
    const newPage = page + 1;
    setPage(newPage);
  }
  // page - 1
  const getBeforeQiitaPosts = () => {
    const newPage = page - 1;
    setPage(newPage);
  }

  const renderTag = (list) => {
    const tags = list.map((item, index) => {
      return (
        <>{item.name}, </>
      );
    });
    return tags;
  }

  const renderImageList = (list) => {
    const posts = list.map((item, index) => {
      return (
        <li className="item" key={index}>
          <div className="card-container">
            <img src={item.user.profile_image_url} width="50" height="50" loading="lazy" alt="img" />
            <div className="card-text">
              <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
              <div className="card-text2">
              <p>{moment(item.created_at).fromNow()}
                 / {renderTag(item.tags)} / {item.likes_count}likes / {item.user.items_count}posts</p>
              </div>
            </div>
          </div>
        </li>
      );
    });
    return posts;
  }

  // 表示されるHTMLを記述
    return (
      <div className="App">
        <header className="QiitaApp-header">
          <font color="red"><b>{error}</b></font><br />
          <a className="QiitaApp-link" href="https://mbp.hatenablog.com/entry/2021/08/25/224215" target="_blank" rel="noreferrer">Next.jsでQiitaAPIを使って記事情報を取得して表示(vercel-nextjs3)</a><br />
          <a className="QiitaApp-link" href="welcome" target="_blank" rel="noreferrer">Welcome</a><br />
          <h3>QiitaでNext.jsタグありの記事を表示</h3>
          <br />
          <button onClick={() => {tagButtonClick("React")}}>React</button>
          <button onClick={() => {tagButtonClick("Next.js")}}>Next.js</button>
          <button onClick={() => {tagButtonClick("Vue.js")}}>Vue.js</button>
          <button onClick={() => {tagButtonClick("Nuxt.js")}}>Nuxt.js</button>
          <button onClick={() => {tagButtonClick("JavaScript")}}>JavaScript</button>
          <button onClick={() => {tagButtonClick("Swift")}}>Swift</button>
          <button onClick={() => {tagButtonClick("Vim")}}>Vim</button>
          <button onClick={() => {tagButtonClick("Azure")}}>Azure</button>
          <button onClick={() => {tagButtonClick("Aws")}}>AWS</button>
          <button onClick={() => {tagButtonClick(".NET")}}>.NET</button>
          <button onClick={() => {tagButtonClick("Flutter")}}>Flutter</button>
          {tag}<br />
          page:<button onClick={() => {pageButtonClick("1")}}>__1__</button>
          ___:<button onClick={() => {pageButtonClick("15")}}>__15__</button>
          ___:<button onClick={() => {pageButtonClick("50")}}>__50__</button>
          ___:<button onClick={() => {pageButtonClick("90")}}>__90__</button>
          {page}/{perPage}posts
          <ul>{renderImageList(postsList)}</ul>

          Page {page}, tag {tag}, {isLoading}
          <br />
          {isLoading ? (
            <>Loading .... page: {page}/{perPage}posts/{perPage*(page-1)+1}-</>
          ) : (
            <>Not Loading. page: {page}/{perPage}posts/{perPage*(page-1)+1}-</>
          )}
        </header>
        <div className="QiitaApp-footer">{tag} Page {page}/{perPage}posts/{perPage*(page-1)+1}-</div>
      </div>
    )
}

export default App;
