window.ExampleApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},

    
  initialize: function(data) {
    this.data = data;
    //data=this.loadData();
    //console.log(data);
    // console.log(data);
    this.users = new ExampleApp.Collections.Users(data.users);
    this.posts = new ExampleApp.Collections.Posts(data.posts);
    this.comments = new ExampleApp.Collections.Posts(data.comments);

    new ExampleApp.Routers.Posts({ collection: this.posts,comments: this.comments, users: this.users });


    this.notavailablevar=0;

      if (!Backbone.history.started) {
        Backbone.history.start();
        Backbone.history.started = true;
      }

  },

  update: function() {

  var self=this;
    window.setTimeout(function() {  
    self.posts.fetch({success:self.available,error:self.notavailable});  
        self.update();
    }, 5000); 
  },
    

  available: function() {
   
    
    if(this.notavailablevar==1){
      this.$('.server_error').text("Server now available");
      this.$('.server_error').css("backgroundColor",'green');
      this.$('.server_error').fadeIn();
      this.notavailablevar=0;
    }else{
       this.$('.server_error').fadeOut();
    }
  },
  notavailable: function() {
    this.$('.server_error').text("Server not available");
    this.$('.server_error').css("backgroundColor",'red');
    this.$('.server_error').fadeIn();
    this.notavailablevar =1;
  }
};

ErrorHandlingModel = Backbone.Model.extend({
});
