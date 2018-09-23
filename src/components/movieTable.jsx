import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import Table from "./common/table";
class MovieTable extends Component {
  columns = [
    {
      key: "title",
      label: "Title",
      content: movie => {
        return <Link to={`/movies/${movie._id}`}>{movie.title}</Link>;
      }
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "like",
      content: movie => (
        <Like movie={movie} onLike={x => this.props.onLike(x)} />
      )
    },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie._id)}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { sortColumn, movies, onSort } = this.props;
    if (movies.length > 0) {
      return (
        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
          data={movies}
        />
      );
    } else {
      return <p> No items in table </p>;
    }
  }
}

export default MovieTable;
