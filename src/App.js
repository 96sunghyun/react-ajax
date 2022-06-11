import "./App.css";
import React, { Component } from "react";

class NowLoading extends Component {
  render() {
    return <div>Now Loading...</div>;
  }
}

class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class Nav extends Component {
  render() {
    const listTag = this.props.list.map((el) => {
      return (
        <li key={el.id}>
          <a
            href={el.id}
            id={el.id}
            onClick={(e) => {
              e.preventDefault();
              console.log(e.target.id);
              this.props.onClick(e.target.id);
            }}
          >
            {el.title}
          </a>
        </li>
      );
    });

    return !this.props.Loading ? <nav>{listTag}</nav> : <NowLoading />;
  }
}

class App extends Component {
  state = {
    article: { title: "Welcome", desc: "Hello, React & Ajax" },
    list: [],
    navLoading: false,
    articleLoading: false,
  };
  componentDidMount() {
    this.setState({ navLoading: true });
    fetch("list.json")
      .then((result) => {
        return result.json();
      })
      .then((list) => {
        this.setState({ list, navLoading: false });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Web</h1>
        <Nav
          Loading={this.state.navLoading}
          list={this.state.list}
          onClick={(id) => {
            this.setState({ articleLoading: true });
            fetch(`${id}.json`)
              .then((result) => {
                return result.json();
              })
              .then((json) => {
                console.log(json);
                this.setState({ article: json, articleLoading: false });
              });
          }}
        />
        {!this.state.articleLoading ? (
          <Article
            title={this.state.article.title}
            desc={this.state.article.desc}
          />
        ) : (
          <NowLoading />
        )}
      </div>
    );
  }
}

export default App;
