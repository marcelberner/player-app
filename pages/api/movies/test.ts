import { NextApiRequest, NextApiResponse } from "next"
import { client } from "../../../lib/database"

const LIMIT = 20

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = parseInt(req.query.page as any)

  let movies: any

  try {
    movies = await client.query(`
    SELECT genres.genre AS genre_name, (
      SELECT json_agg(
        json_build_object(
          'id', m.id, 
          'title', m.title, 
          'year', m.year, 
          'rating', m.rating, 
          'poster', m.poster, 
          'description', m.description, 
          'language', m.language, 
          'runtime', m.runtime, 
          'video', m.video, 
          'genres', m.all_genres
        )
      )
      FROM (
        SELECT DISTINCT ON (movies.id) movies.id, movies.title, movies.year, movies.rating, movies.poster, movies.description, movies.language, movies.runtime, movies.video, array_agg(genres.genre) AS all_genres
        FROM movies
        JOIN movie_genre ON movies.id = movie_genre.movie_id
        JOIN genres ON movie_genre.genre_id = genres.id
        GROUP BY movies.id
      ) AS m
      JOIN unnest(m.all_genres) AS g(genre) ON g.genre = genres.genre
      GROUP BY genres.genre
      LIMIT 20
    ) AS movies_data
    FROM genres
    WHERE genres.genre IN (
      'Action', 
      'Horror', 
      'Animation', 
      'Fantasy', 
      'Thriller', 
      'Romance', 
      'Science Fiction', 
      'Documentary', 
      'History', 
      'War', 
      'Comedy'
    )
    GROUP BY genres.genre
    `)
  } catch {
    res.status(500).json({ message: "Couldn't get movies by genre." })
  }

  const rows = movies.rows.slice(0, LIMIT)
  const hasNextPage = movies.rows.length > LIMIT

  res.status(200).json({
    movies: rows,
    next: hasNextPage ? page + 1 : undefined,
    prev: page > 1 ? page - 1 : undefined,
  })
}

export default Handler
