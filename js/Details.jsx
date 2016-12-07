import React from 'react'

const Details = ({ show: { description, poster, title, trailer, year } }) => (
  <div className='details'>
    <header>
      <h1>Basic Netflix XP v2</h1>
    </header>
    <section>
      <h1>{title}</h1>
      <h2>({year})</h2>
      <img src={`/public/img/posters/${poster}`} alt={`${title} poster`} />
      <p>{description}</p>
    </section>
    <div>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
        frameBorder='0'
        allowFullScreen />
    </div>
  </div>
)

const { shape, string } = React.PropTypes
Details.propTypes = {
  show: shape({
    description: string.isRequired,
    poster: string.isRequired,
    title: string.isRequired,
    trailer: string.isRequired,
    year: string.isRequired
  }).isRequired
}

export default Details
