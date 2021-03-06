const { Review, AverageRating } = require('./models.js')
const faker = require('faker')

const placeIds = [1,2,3,4,5]

Review.sync({ force: true })
.then(() => {
  for (var i = 0; i < placeIds.length; i++){
    var reviewsNum = Math.floor(Math.random() * Math.floor(60))
    for (var j = 0; j < reviewsNum; j++){
      let newReview = {
        idPlace: placeIds[i],
        username: faker.name.firstName(),
        idUser: faker.random.number(),
        createdAt: faker.date.past(),
        text: faker.lorem.text(),
        avatarUrl: faker.image.avatar(),
      }
      Review.create(newReview)
    }
  }
})

AverageRating.sync({ force: true })
.then(() => {
    for (var i = 0; i < placeIds.length; i++){
      let newRating = {
        idPlace: placeIds[i],
        accuracy_avg: faker.random.number({max: 5, precision: 0.01}),
        communication_avg: faker.random.number({max: 5, precision: 0.01}),
        cleanliness_avg: faker.random.number({max: 5, precision: 0.01}),
        location_avg: faker.random.number({max: 5, precision: 0.01}),
        checkin_avg: faker.random.number({max: 5, precision: 0.01}),
        value_avg: faker.random.number({max: 5, precision: 0.01}),
        overall_avg: faker.random.number({max: 5, precision: 0.01}),
      }
      AverageRating.create(newRating)
    }
})