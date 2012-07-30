ExampleApp.Routers.Posts = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('#posts');
    this.collection = options.collection;
    this.users = options.users; 
  },

  routes: {
    "":          "index",
    "new":       "newPost",
    "posts/:id": "edit"
  },


  index: function() {
    var view = new ExampleApp.Views.PostsIndex({ collection: this.collection});
    $('.flash-place').fadeOut();
    this.swap(view);

  },

  newPost: function() {
    var view = new ExampleApp.Views.PostsNew({ collection: this.collection, users: this.users });
    $('.flash-place').fadeOut();
    this.swap(view);    
  },

  edit: function(taskId) {
    var post = this.collection.get(taskId);
    var postsRouter = this;
    post.fetch({
      success: function() {
        var view = new ExampleApp.Views.PostsEdit({ model: post });
        $('.flash-place').fadeOut();
        postsRouter.swap(view);
      }
    });
  }
});
