import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import Filter from "./common/filter.jsx";
import Input from "./common/input.jsx";
import Pagination from "./common/pagination.jsx";
import MovieTable from "./movieTable";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    searchValue: "",
    movies: [],
    genres: [],
    pageSize: 4,
    selectedPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    let movies = await getMovies();
    movies = movies.data.map(x => {
      x.like = false;
      return x;
    });
    this.setState({ movies: movies });
    const genres = await getGenres();
    const all = { name: "All Genres" };
    this.setState({ activeFilter: all });
    genres.unshift(all);
    this.setState({ genres: genres });
  }

  handleDelete = async id => {
    await deleteMovie(id);
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

  handleSearch = ({ currentTarget: input }) => {
    this.setState({ activeFilter: null });
    this.setState({ selectedPage: 1 });
    this.setState({ searchValue: input.value });
  };

  getPagedData = (
    activeFilter,
    movies,
    sortColumn,
    selectedPage,
    pageSize,
    searchValue
  ) => {
    const filtered =
      activeFilter && activeFilter._id
        ? movies.filter(movie => movie.genre._id === activeFilter._id)
        : movies;

    const searched = filtered.filter(movie => {
      const regex = new RegExp(searchValue, "gi");
      if (movie.title.match(regex)) return true;
      return false;
    });

    const sorted = _.orderBy(searched, [sortColumn.path], [sortColumn.order]);
    const pagedMovies = paginate(selectedPage, pageSize, sorted);
    return { totalCount: searched.length, data: pagedMovies };
  };

  render() {
    const {
      sortColumn,
      selectedPage,
      pageSize,
      movies,
      activeFilter,
      searchValue
    } = this.state;

    const pagedData = this.getPagedData(
      activeFilter,
      movies,
      sortColumn,
      selectedPage,
      pageSize,
      searchValue // To do - extract search into its own component
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
          <Link to="/movies/new" className="btn btn-primary m-2">
            New Movie!
          </Link>
          <Input
            type="test"
            id="search"
            label="Search"
            className="my-3"
            onChange={this.handleSearch}
            value={this.state.searchValue}
          />
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
