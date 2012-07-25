window.ExampleApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
     
     
    
  initialize: function(data) {

//data=this.loadData();
//console.log(data);
// console.log(data);
  this.users = new ExampleApp.Collections.Users(data.users);

    this.posts1 = new ExampleApp.Collections.Posts(data.posts);
  
 

    new ExampleApp.Routers.Posts({ collection: this.posts1, users: this.users });
   
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }

  },

  update: function() {
var self=this;
window.setTimeout(function() {  
self.posts1.fetch();  
    self.update();
}, 5000); 
    },
    


};