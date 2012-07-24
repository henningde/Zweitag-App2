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

    this.posts = new ExampleApp.Collections.Posts(data.posts);
    window.posts = this.posts;
 

    new ExampleApp.Routers.Posts({ collection: this.posts, users: this.users });
   
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }

//posts.fetch()

};
