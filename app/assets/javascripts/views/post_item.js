ExampleApp.Views.PostItem = Support.CompositeView.extend({
  tagName: "tr",

  events: {
    "change input": "update"
  },

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function () {
    this.$el.attr("id", "post_" + this.model.id);
    this.$el.html(JST['posts/item']({ task: this.model }));
    this.renderFormContents();
    return this;
  },

  renderFormContents: function() {
    this.$('label').attr("for", "post_completed_" + this.model.get('id'));
    this.$('label').html(this.model.escape('title'));

    this.$('input').attr("id", "post_completed_" + this.model.get('id'));
    this.$('input').prop("checked", this.model.isComplete());
    this.$('.user_email').html(this.model.get('user')['email']);
    this.$('.created_at').html($.timeago(this.model.get('created_at')));
this.$('.votes').html(this.model.get('vote'));

    //this.$('.vote-link').attr("href", "#"+this.model.get('id'));
    _this = this;
     this.$('.vote-link').click(function(){_this.update(_this.model.get('id'));});


    this.$('.post-link').text(this.model.escape('title'));
    this.$('.post-link').attr("href", this.postUrl());
  },

  postUrl: function() {
return this.model.get('link');


    return "#posts/" + this.model.get('id');
  },

  update: function(id) {
  
    // var complete = this.$('input').prop('checked');
    var complete = this.model.upvote(id);
    this.model.save({ complete: complete });
  }
});
