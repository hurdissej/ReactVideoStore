import React, { Component } from "react";
import Like from "./like";
import { paginate } from "../utils/paginate";
import Pagination from "./pageComponent.jsx";

class MovieList extends Component {
  renderTable(movies) {
    if (movies.length > 0) {
      return (
        <div>
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
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>
                    <Like movie={movie} onLike={x => this.props.onLike(x)} />
                  </td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.props.onDelete(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }

  render() {
    const { movies, pageSize, selectedPage, onPageChange } = this.props;
    const pagedMovies = paginate(
      this.props.selectedPage,
      this.props.pageSize,
      this.props.movies
    );
    return (
      <React.Fragment>
        {movies.length !== 0 && (
          <p> Displaying {movies.length} movies in the datbase </p>
        )}
        {movies.length === 0 && <p> No movies in the database </p>}
        {this.renderTable(pagedMovies)}
        <Pagination
          itemCount={movies.length}
          pageSize={pageSize}
          onPageChange={x => onPageChange(x)}
          selectedPage={selectedPage}
        />
      </React.Fragment>
    );
  }
}

export default MovieList;
