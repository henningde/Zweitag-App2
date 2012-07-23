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
  	var test=$.post("/posts/"+id+"/upvote", { id: id } );
 this.model = new ExampleApp.Models.Post();
console.log(test);
//this.model.save({}, { success: this.saved ,error: this.errord });
  	//this.set(data)
  }
});