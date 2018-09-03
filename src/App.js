import React, { Component } from "react";
import MovieList from "./components/movieList";
import { getMovies } from "./services/fakeMovieService";
import "./App.css";

class App extends Component {
  state = {
    movies: [],
    pageSize: 4
  };

  constructor() {
    super();
    const movies = getMovies();
    this.state.movies = movies.map(x => {
      x.like = false;
      return x;
    });
    this.state.selectedPage = 1;
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(x => x._id !== id);
    console.log(movies);
    this.setState({
      movies: movies
    });
    console.log(this.state.movies);
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ selectedPage: page });
  };

  render() {
    return (
      <main className="container">
        <MovieList
          selectedPage={this.state.selectedPage}
          onDelete={this.handleDelete}
          onLike={this.handleLike}
          movies={this.state.movies}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </main>
    );
  }
}

export default App;
