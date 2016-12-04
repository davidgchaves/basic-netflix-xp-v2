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

ShowCard.propTypes = {
  description: React.PropTypes.string.isRequired,
  poster: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  year: React.PropTypes.string.isRequired
}
export default ShowCard
