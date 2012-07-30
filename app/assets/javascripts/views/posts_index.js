ExampleApp.Views.PostsIndex = Support.CompositeView.extend({
  initialize: function() {
    //TODO: Maybe we should also bindAll "reset"
    //At this point it is important to know why
    //we are using bindAll. Remember to discuss this with me.
    _.bindAll(this, "render");
    this.collection.on("add", this.render);
    this.collection.on("reset", this.render);

  },



  render: function () {
    //TODO: Although I am using this as an example often,
    //asd is not an appropriate variable name in 99.999% cases.
   asd = this.collection.sortBy(function(user){
    //console.log(user.attributes.upvote);
    return (user.attributes.calc_voting*-1);
    });

    this.collection.reset(asd, {silent: true});

    this.renderTemplate();
    this.renderPosts();
    return this;
  },

  renderTemplate: function() {


    this.$el.html(JST['posts/index']({ posts: this.collection }));
   
  },

  renderPosts: function() {
    var self = this;
    this.collection.each(function(post) {
      //TODO: I know I proposed this,
      //but we might want to find a cleaner way
      //for the KaP app.
      post.off(null,null, self);
      post.on("all", self.render, self);

      var row = new ExampleApp.Views.PostItem({ model: post,collection: self.collection,});
      self.renderChild(row);
      self.$('.inhalt').append(row.el);
    });
  }
});
