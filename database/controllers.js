const { Review, AverageRating } = require('./models.js')

const getAllReviews = (callback) => {
  Review.findAll({})
  .then(data => {callback(null, data)})
  .catch(err => {callback(err)})
}

const getReviewsById = (id, callback) => {
  Review.findAll({
    where: {
      idPlace: id
    }
  })
  .then(data => {callback(null, data)})
  .catch(err => {callback(err)})
}

const getRatingsById = (id, callback) => {
  AverageRating.findAll({
    where: {
      idPlace: id
    }
  })
  .then(data => {callback(null, data)})
  .catch(err => {callback(err)})
}

module.exports = {
  getAllReviews,
  getReviewsById,
  getRatingsById
}