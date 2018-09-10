import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import Filter from "./filter.jsx";
import Pagination from "./pagination.jsx";
import MovieTable from "./movieTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    selectedPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const movies = getMovies().map(x => {
      x.like = false;
      return x;
    });
    this.setState({ movies: movies });
    const genres = getGenres();
    const all = { name: "All Genres" };
    this.setState({ activeFilter: all });
    genres.unshift(all);
    this.setState({ genres: genres });
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(x => x._id !== id);
    this.setState({
      movies: movies
    });
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

  handleFilter = item => {
    this.setState({ activeFilter: item });
    this.setState({ selectedPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  getPagedData = (activeFilter, movies, sortColumn, selectedPage, pageSize) => {
    const filtered =
      activeFilter && activeFilter._id
        ? movies.filter(movie => movie.genre._id === activeFilter._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedMovies = paginate(selectedPage, pageSize, sorted);
    return { totalCount: filtered.length, data: pagedMovies };
  };

  render() {
    const {
      sortColumn,
      selectedPage,
      pageSize,
      movies,
      activeFilter
    } = this.state;

    const pagedData = this.getPagedData(
      activeFilter,
      movies,
      sortColumn,
      selectedPage,
      pageSize
    );

    return (
      <div className="row">
        <div className="col-sm-3">
          <Filter
            items={this.state.genres}
            textProp="name"
            valueProp="_id"
            activeFilter={activeFilter}
            onFilter={this.handleFilter}
          />
        </div>
        <div className="col-sm-6">
          {pagedData.totalCount !== 0 && (
            <p> Displaying {pagedData.totalCount} movies in the datbase </p>
          )}
          {pagedData.totalCount === 0 && <p> No movies in the database </p>}
          <MovieTable
            onLike={this.handleLike}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            movies={pagedData.data}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={pagedData.totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            selectedPage={selectedPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;