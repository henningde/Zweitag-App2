ExampleApp.Views.PostItem = Support.CompositeView.extend({
  tagName: "tr",

  events: {
    "click .upvote-link": "upvote",
    "click .downvote-link": "downvote"
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

    // console.log(this.model);
    this.$('label').attr("for", "post_completed_" + this.model.get('id'));
    this.$('label').html(this.model.escape('title'));

    this.$('input').attr("id", "post_completed_" + this.model.get('id'));
    this.$('input').prop("checked", this.model.isComplete());
    this.$('.user_email').html(this.model.get('user')['email']);



this.$('.user_email').html(this.model.get('user')['email']);


    this.$('.created_at').html($.timeago(this.model.get('created_at')));
if(this.model.get('calc_voting')<0){var calc_voting=0}else{calc_voting=this.model.get('calc_voting')}

this.$('.votes').html(calc_voting);

// +new Date().getTime()
    this.$('.post-link').text(this.model.escape('title'));
    this.$('.post-link').attr("href", this.postUrl());
 
this.$('.post-edit-link').attr("href", this.postEditUrl());

// this.model.get('vote').strip.each(' ') {|s| console.log(s.strip) };

if (this.model.get('has_user_vote')>=1){
  this.$('.upvote-link').text("");
    this.$('.downvote-link').text("");
  }




  },

  postUrl: function() {
    return this.model.get('link');
    // return "#posts/" + this.model.get('id');
  },

  postEditUrl: function() {

     return "#posts/" + this.model.get('id');
  },
  upvote: function() {

    var newVote=this.model.upvote(this.model.get('id'));
    this.model.set({ calc_voting: newVote });
 this.render();



    this.$('.upvote-link').text("");
    this.$('.downvote-link').text("");

  },

  downvote: function() {
    
    var newVote=this.model.downvote(this.model.get('id'));
    this.model.set({ calc_voting: newVote });
    this.render();
    
    this.$('.upvote-link').text("");
    this.$('.downvote-link').text("");
  
  }
});
