import React from 'react'
import { Link } from 'react-router'

const ShowCard = ({ description, imdbID, poster, title, year }) => (
  <Link to={`/details/${imdbID}`}>
    <div className='show-card'>
      <img src={`/public/img/posters/${poster}`} />
      <div>
        <h3>{title}</h3>
        <h4>({year})</h4>
        <p>{description}</p>
      </div>
    </div>
  </Link>
)

const { string } = React.PropTypes
ShowCard.propTypes = {
  description: string.isRequired,
  imdbID: string.isRequired,
  poster: string.isRequired,
  title: string.isRequired,
  year: string.isRequired
}

export default ShowCard
