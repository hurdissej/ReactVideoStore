import React from "react";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie } from "../services/movieService";
import Joi from "joi-browser";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {},
    genres: []
  };

  setGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres: genres });
  };

  setMovie = async () => {
    const id = this.props.match.params.id;
    if (id === "new") return;
    const movie = await getMovie(id);
    const viewModel = this.mapToViewModel(movie);
    this.setState({ data: viewModel });
  };

  componentDidMount() {
    this.setGenres();
    this.setMovie();
  }

  mapToViewModel = input => {
    return {
      _id: input._id,
      title: input.title,
      genreId: input.genre._id,
      numberInStock: input.numberInStock,
      dailyRentalRate: input.dailyRentalRate
    };
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .max(100)
      .label("NumberInStock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        {this.props.match.params.id === "new" && <h1> New Movie </h1>}
        {this.props.match.params.id !== "new" && (
          <h1> Movie Form: {this.props.match.params.id} </h1>
        )}

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropdown("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "NumberInStock", "numberInStock")}
          {this.renderInput("dailyRentalRate", "Rate", "dailyRentalRate")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
