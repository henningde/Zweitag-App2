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
  }

});