var faker = require('faker');

var Review = function(){
  this.username = faker.name.findName()
  this.userId = faker.random.number();
  this.createdAt = faker.date.past();
  this.text = faker.lorem.text();
  this.avatarUrl = faker.image.avatar();
}

var insertSampleReviews = function() {
  // Blog.create(samplePosts)
  //   .then(() => db.disconnect());
};

insertSampleReviews();