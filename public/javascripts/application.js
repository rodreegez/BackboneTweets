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
    this.collection.bind('reset', this.render, this);
    var view = this;
    this.collection.each(function(tweet) {
      if ($('#' + tweet.id).length > 0) {
        console.log('already displayed');
      }else{
        var tweetView = new TweetView({model:tweet});
        $('#tweets-list').prepend(tweetView.render().el);
      }
    });
  }
});

setInterval(function() {
  tweets.fetch();
  var tweetsView = new TweetsView({collection: tweets});
}, 10000);
