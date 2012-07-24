ExampleApp.Views.PostsIndex = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render");
    this.collection.on("add", this.render);
    this.collection.on("reset", this.render);

  },

  render: function () {
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
      post.off(null,null, self);
      post.on("change", self.render, self);

      var row = new ExampleApp.Views.PostItem({ model: post});
      self.renderChild(row);
      self.$('.inhalt').append(row.el);
    });
  }
});
