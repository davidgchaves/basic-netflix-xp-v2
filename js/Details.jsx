import React from 'react'
import Header from './Header'

class Details extends React.Component {
  constructor (props) {
    super(props)

    this.state = { omdbData: {} }
  }

  componentDidMount () {
    const omdbApi = `http://www.omdbapi.com/?i=${this.props.show.imdbID}`

    fetch(omdbApi)
      .then(res => res.json())
      .then(json => this.setState({ omdbData: json }))
      .catch(err => console.error('fetch error:', err))
  }

  render () {
    const { description, poster, title, trailer, year } = this.props.show
    const rating = this.state.omdbData.imdbRating
      ? <h3>{this.state.omdbData.imdbRating}</h3>
      : <img src='/public/img/loading.png' alt='loading indicator' />

    return (
      <div className='details'>
        <Header showSearch={false} />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
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
  }
}

const { shape, string } = React.PropTypes
Details.propTypes = {
  show: shape({
    description: string.isRequired,
    imdbID: string,
    poster: string.isRequired,
    title: string.isRequired,
    trailer: string.isRequired,
    year: string.isRequired
  }).isRequired
}

export default Details
