import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import { getOMDBDetails } from './actionCreators'

class Details extends React.Component {
  componentDidMount () {
    const imdbRatingIsNotLoaded = !this.props.omdbData.imdbRating
    const loadImdbRating =
      () => this.props.dispatch(getOMDBDetails(this.props.show.imdbID))

    if (imdbRatingIsNotLoaded) {
      loadImdbRating()
    }
  }

  render () {
    const { description, poster, title, trailer, year } = this.props.show
    const rating = this.props.omdbData.imdbRating
      ? <h3>{this.props.omdbData.imdbRating}</h3>
      : <img className='loading' src='/public/img/loading.png' alt='loading indicator' />

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

const { func, shape, string } = React.PropTypes
Details.propTypes = {
  dispatch: func.isRequired,
  omdbData: shape({
    imdbID: string
  }).isRequired,
  show: shape({
    description: string.isRequired,
    imdbID: string,
    poster: string.isRequired,
    title: string.isRequired,
    trailer: string.isRequired,
    year: string.isRequired
  }).isRequired
}

const mapModelToProps = ({ omdbData }, { show: { imdbID } }) => ({
  omdbData: omdbData[imdbID] ? omdbData[imdbID] : {}
})

export default connect(mapModelToProps)(Details)
