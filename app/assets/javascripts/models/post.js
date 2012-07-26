ExampleApp.Models.Post = Backbone.Model.extend({
  initialize: function() {
  },

  urlRoot: '/posts',
 isComplete: function() {
    return this.get('complete');
  },
  
  toJSON: function() {
    var json = _.clone(this.attributes);
    return json;
  },



  upvote: function(id) {
var vote = null;


$.ajax({
  type: "POST",
  url: "/posts/"+id+"/upvote",
  data: { id: id },
  async: false,
}).done(function( data ) {
  // vote=((data.upvote*2)-(data.downvote*3));
  vote=data.calc_voting
  
});

return vote;


},
  downvote: function(id) {
var vote = null;
$.ajax({
  type: "POST",
  url: "/posts/"+id+"/downvote",
  data: { id: id },
  async: false,
}).done(function( data ) {
  // vote=((data.upvote*2)-(data.downvote*3));
  vote=data.calc_voting
  
});
return vote;
}

});