ExampleApp.Views.PostsIndex = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render");
    this.collection.on("add", this.render);
  },

  render: function () {
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
      var row = new ExampleApp.Views.PostItem({ model: post });
      self.renderChild(row);
      self.$('.inhalt').append(row.el);
    });
  }
});
