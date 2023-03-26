import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/database";

const Handler = async (req: NextApiRequest, response: NextApiResponse) => {
  const movies = req.body.movies;

  if (!movies || movies.length == 0) return;

  // client.connect();

  for (const movie of movies) {
    // console.log(movie);

    let correctTitle = movie.title
      .split("")
      .map((char: string) => {
        if (char == "'") return char + "'";
        else return char;
      })
      .join("");
    let correctdescription = movie.overview
      .split("")
      .map((char: string) => {
        if (char == "'") return char + "'";
        else return char;
      })
      .join("");

    // console.log(correctTitle)
    // console.log(correctdescription)

    await client.query(`INSERT INTO "movies" (
        id,
        title,
        year,
        rating,
        poster,
        description,
        language,
        runtime
      ) VALUES (
        '${movie.imdbID}',
        '${correctTitle}',
        ${movie.year},
        ${movie.imdbRating},
        '${movie.posterURLs.original}',
        '${correctdescription}',
        '${movie.originalLanguage}',
        ${movie.runtime}
      )`);

    for (const genreId of movie.genres) {
      await client.query(`
      INSERT INTO "movie_genre" (
        movie_id, 
        genre_id
      ) VALUES (
        '${movie.imdbID}',
        ${genreId}
      )`);
    }
  }

  // client.end();
};

export default Handler;
