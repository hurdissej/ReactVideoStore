import React, { Component } from "react";
import Like from "./like";
import { getMovies } from "../services/fakeMovieService";

class MovieList extends Component {
  state = {
    movies: []
  };

  constructor() {
    super();
    const movies = getMovies();
    console.log(movies);
    this.state.movies = movies.map(x => {
      x.like = false;
      return x;
    });
    console.log(this.state.movies);
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

  renderTable() {
    if (this.state.movies.length > 0) {
      return (
        <div>
          <p> Displaying {this.state.movies.length} movies in the datbase </p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Like</th>
                <th scope="col">Rate</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>
                    <Like movie={movie} onLike={this.handleLike} />
                  </td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.movies.length === 0 && <p> No movies in the database </p>}
        {this.renderTable()}
      </React.Fragment>
    );
  }
}

export default MovieList;
