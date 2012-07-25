ExampleApp.Routers.Posts = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('#posts');
    this.collection = options.collection;
    this.users = options.users;
  },

  routes: {
    ":id":          "vote",
    "":          "index",
    "new":       "newPost",
    "posts/:id": "show"

  },

  index: function() {
    var view = new ExampleApp.Views.PostsIndex({ collection: this.collection });
console.log(this.collection);
    this.swap(view);

  },

  newPost: function() {
  var view = new ExampleApp.Views.PostsNew({ collection: this.collection, users: this.users });
  this.swap(view);
    
  },


  vote: function(taskId) {

  var view = new ExampleApp.Views.PostsVote({ collection: this.collection, users: this.users });
  this.swap(view);
  },

  show: function(taskId) {
    var post = this.collection.get(taskId);
    var postsRouter = this;
    post.fetch({
      success: function() {
        var view = new ExampleApp.Views.PostShow({ model: post });
        postsRouter.swap(view);
      }
    });
  }
});
