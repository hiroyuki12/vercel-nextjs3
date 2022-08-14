import React from 'react';
import Api from './youtubeApi';

function App() {
  // 表示されるHTMLを記述
  return (
    <div className="App">
      <header className="QiitaApp-header">
        <a href="https://mbp.hatenablog.com/entry/2021/08/12/082102" target="_blank" rel="noreferrer">Youtube APIを使って検索＋再生</a><br />
        <p>Youtube APIのテスト</p>
        <Api/>
      </header>
      <div className="QiitaApp-footer">YouTube</div>
    </div>
  )
}

export default App;
