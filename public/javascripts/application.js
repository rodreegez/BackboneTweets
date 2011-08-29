var Tweet = Backbone.Model.extend();

var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'http://search.twitter.com/search.json?q=backbonejs&callback=?',
  parse: function(response) {
    return response.results;
  }
});

var tweets = new Tweets();

var TweetView = Backbone.View.extend({
  template: '#tweet-template',

  initialize: function() {
    this.model.bind('change', this.render, this);
    this.template = _.template($(this.template).html());
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var TweetsView = Backbone.View.extend({
  initialize: function() {
    this.collection.bind('change', this.render, this);
    this.collection.each(this.addTweet);
  },

  addTweet: function(tweet) {
    var tweetView = new TweetView({model:tweet});
    $('#tweets').append(tweetView.render().el);
  }
});

setInterval(function() {
  console.log('fetching...');
  tweets.fetch();
  var tweetsView = new TweetsView({collection: tweets});
  console.log('fetched', tweets.length, 'tweets');
}, 10000);
