import React, { Component } from "react";
import Like from "./like";
import { paginate } from "../utils/paginate";

import Pagination from "./pageComponent.jsx";

class MovieList extends Component {
  renderTable() {
    const movies = paginate(
      this.props.selectedPage,
      this.props.pageSize,
      this.props.movies
    );
    if (movies.length > 0) {
      return (
        <div>
          <p> Displaying {movies.length} movies in the datbase </p>
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
    return (
      <React.Fragment>
        {this.props.movies.length === 0 && <p> No movies in the database </p>}
        {this.renderTable()}
        <Pagination
          itemCount={this.props.movies.length}
          pageSize={this.props.pageSize}
          onPageChange={x => this.props.onPageChange(x)}
          selectedPage={this.props.selectedPage}
        />
      </React.Fragment>
    );
  }
}

export default MovieList;
