import React from "react";

const Like = props => {
  const { movie, onLike } = props;
  const base = "fa fa-heart";
  const classN = movie.like === false ? base + "-o" : base;
  return <i onClick={() => onLike(movie)} className={classN} />;
};

export default Like;
