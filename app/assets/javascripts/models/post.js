//TODO: Einrücken
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



  //TODO: I don't get why you use id as a parameter here
  //Can't you use this.get("id") for that purpose?
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

  //TODO: I don't get why you use id as a parameter here
  //Can't you use this.get("id") for that purpose?
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
},

  comment: function(id,comments, callback, errorcallback) {
  //  var returncomment = null;
    $.ajax({
      type: "POST",
      url: "/posts/"+id+"/comment",
      data: { id: id,comment: comments},
      success: callback,
      error: errorcallback,
      })

  //.done(function( data ) {
  // vote=((data.upvote*2)-(data.downvote*3));

  //returncomment=data
  
//});
//return returncomment;
}

});
