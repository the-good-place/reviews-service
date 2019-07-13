import React from 'react';
import $ from 'jquery';

import Search from './Search';
import Rating from './Rating';
import Attributes from './Attributes';
import Reviews from './Reviews';
import Pagination from './Pagination';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBtn: 1,
      currentPlace: null,
      places: [],
      reviewsByPlace: [],
      ratingsByPlace: [],
      currentPage: 1,
      reviewsStart: 0,
      reviewsEnd: 7,
      textSearch: '',
      showNotFound: false
    };
    this.getReviewsByPlace = this.getReviewsByPlace.bind(this);
    this.getRatingsByPlace = this.getRatingsByPlace.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearchReviews = this.handleSearchReviews.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount(){
    // logs all idPlaces
    $.ajax({
      type: 'GET',
      url: '/api/places'
    })
    .done(places => {
      const idPlaces = places.reduce((acc, cur) => {
        return acc.concat(cur.idPlace)
      }, []);

      console.log(
        "%c These are the idPlaces created in db: ",
        "color: blue; font-size: 16px",
        idPlaces,
      );

      return this.setState({
        currentPlace: idPlaces[0],
        places: idPlaces
      })
    })
    .done(() => {
      this.getReviewsByPlace(this.state.currentPlace)
      this.getRatingsByPlace(this.state.currentPlace)
    })
  }

  getReviewsByPlace(id){
    $.ajax({
      type: 'GET',
      url: `/api/reviews/${id}`
    })
    .done(data => {
      return this.setState({
        reviewsByPlace: data
      })
    })
  }

  getRatingsByPlace(id){
    $.ajax({
      type: 'GET',
      url: `/api/ratings/${id}`
    })
    .done(data => {
      return this.setState({
        ratingsByPlace: data.reduce(cur => cur)
      })
    })
  }

  handleChangePage(value){
    const { currentPage, reviewsByPlace } = this.state;
    const numBtns = Math.ceil(reviewsByPlace.length / 7);

    if(value === 'next' && currentPage < numBtns){
      return this.setState(state => {
        return {
          currentPage: state.currentPage + 1,
          reviewsStart: state.reviewsStart + 7,
          reviewsEnd: state.reviewsEnd + 7
        }
      })
    }
    else if (value === 'before' && currentPage >= 1){
      return this.setState(state => {
        return {
          currentPage: state.currentPage - 1,
          reviewsStart: state.reviewsStart - 7,
          reviewsEnd: state.reviewsEnd - 7
        }
      })
    }
    else {
      let end = value * 7;
      let start = end - 7;
      return this.setState({
        currentPage: value,
        reviewsStart: start,
        reviewsEnd: end
      })
    }
  }

  handleChangeInput(e){
    console.log(e.target.value)
    return this.setState({
      textSearch: e.target.value
    })
  }

  handleSearchReviews(e){
    e.preventDefault(e)
    const query = this.state.textSearch

    // ajax request to search query in db reviews model
    if (query !== ''){
      $.ajax({
        type: 'GET',
        url: `/api/reviews/search/${query}`
      })
      .done(data => {
        this.setState({
          reviewsByPlace: data
        })
      })
      .done(() => {
        if (this.state.reviewsByPlace.length === 0){
          this.setState(state => {
            return {
              showNotFound: !state.showNotFound
            }
          })
        }
      })
    }
    else {
      this.getReviewsByPlace(this.state.currentPlace)
      this.setState(state => {
        return {
          showNotFound: !state.showNotFound
        }
      })
    }
  }

  handleBackButton(){
    this.setState(state => {
      return {showNotFound: !state.showNotFound}
    })
    this.getReviewsByPlace(this.state.currentPlace)
  }

  render() {
    const {
      currentPlace,
      reviewsByPlace,
      ratingsByPlace,
      currentPage,
      reviewsStart,
      reviewsEnd,
      textSearch,
      showNotFound
    } = this.state;

    const numBtns = Math.ceil(reviewsByPlace.length / 7);

    return (
      <div style={styles.divModule}>
        {currentPlace !== 'null' && (
          <div>
            <div style={styles.divHeader}>
              <div style={styles.numReviews}>
                {reviewsByPlace.length} Reviews
              </div>
              <Rating rating={ratingsByPlace.overall_avg} />
              <Search
                handleSearch={this.handleSearchReviews}
                handleChange={this.handleChangeInput}
                text={textSearch}
              />
            </div>
            {!showNotFound && (
              <div>
                <Attributes rating={ratingsByPlace}/>
                <Reviews
                  reviews={reviewsByPlace.slice(reviewsStart, reviewsEnd)}
                />
                <Pagination
                  currentPage={currentPage}
                  numBtns={numBtns}
                  changePage={this.handleChangePage}
                />
              </div>
            )}
            {showNotFound && (
              <div>
                <div>
                  None of our guests have mentioned “<strong>{textSearch}</strong>”
                </div>
                <button onClick={this.handleBackButton}>
                  Back to all reviews
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  divModule: {
    width: '60%'
  },
  divHeader: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px 0 32px 0'
  },
  numReviews: {
    width: '25%',
    margin: '0px',
    wordWrap: 'break-word',
    fontFamily: 'Circular,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,sans-serif',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.25em',
    color: '#484848',
    paddingTop: '2px',
    paddingBottom: '2px',
  }
}

export default App;