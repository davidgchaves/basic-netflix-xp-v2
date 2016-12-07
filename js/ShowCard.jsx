import React from 'react'

const ShowCard = ({ description, poster, title, year }) => (
  <div className='show-card'>
    <img src={`/public/img/posters/${poster}`} />
    <div>
      <h3>{title}</h3>
      <h4>({year})</h4>
      <p>{description}</p>
    </div>
  </div>
)

const { string } = React.PropTypes
ShowCard.propTypes = {
  description: string.isRequired,
  poster: string.isRequired,
  title: string.isRequired,
  year: string.isRequired
}

export default ShowCard
