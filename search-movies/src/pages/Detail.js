import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ButtonBackToHome } from '../components/ButtonBackToHome';

const API_KEY = '6521920e';

export class Detail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
      isExact: PropTypes.bool,
      path: PropTypes.string,
      url: PropTypes.string
    })
  }

  state = { movie: {} };

  _fetchMovie({ id }){
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
    .then(resp => resp.json())
    .then(movie => {
      console.log({ movie });
      this.setState({movie});
    });
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    this._fetchMovie({ id });
  }

  render(){
    const {Title,
           Poster,
           Actors,
           Runtime,
           Plot,
           Director,
           imdbRating,
           Genre,
           Released} = this.state.movie;

    return(
      <div className="container">
        <div className="columns">
          <div className="column text-right">
            <img src={Poster} alt={ Title} />
          </div>
          <div className="column text-justify">
            <h1><strong>Title: </strong>{ Title }.</h1>
            <h3><strong>Actors: </strong>{ Actors }.</h3>
            <p><strong>Director: </strong> { Director }.</p>
            <p><strong>Genre: </strong> { Genre }.</p>
            <p><strong>Duration: </strong> { Runtime }.</p>
            <p><strong>Description: </strong> { Plot }</p>
            <p><strong>Rating: </strong> { imdbRating }.</p>
            <p><strong>Released: </strong> { Released }.</p>
            <ButtonBackToHome />
          </div>
        </div>
      </div>
    )
  }
}
