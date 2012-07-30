ExampleApp.Views.PostItem = Support.CompositeView.extend({

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    this.$el.attr("id", "comment_" + this.model.id);
    this.$el.html(JST['posts/comment']({ task: this.model }));
  //  this.renderFormContents();
    return this;
  },
});
