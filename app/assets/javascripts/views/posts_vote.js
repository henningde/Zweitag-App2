ExampleApp.Views.PostsVote = Backbone.View.extend({
  tagName: 'form',
  id: "new-post",

  events: {
    "submit": "save"
  },

  initialize: function(options) {

    this.users = options.users;

    _.bindAll(this, "render", "saved", "errord");
    this.newVote();
       console.log(this.model);
   
  },

  newVote: function() {
    this.model = new ExampleApp.Models.Post();
  },

  render: function () {
    
    this.$el.html(JST['posts/form_fields']());

    this.$('input[name=title]').focus();
    this.$('input[name=link]').focus();
    return this;
  },



  save: function(e) {
    e.preventDefault();

    this.commitForm();

    this.model.save({}, { success: this.saved ,error: this.errord });

    return false;
  },

  saved: function() {
    var flash = "Neuer Link wurde erstellt " + this.model.escape('title');  
    this.collection.add(this.model);
    this.newPost();
    this.render();
    this.renderFlash(flash,'success');
  },






errord: function(jqXHR, response, errorThrown) {
  this.attributesWithErrors = JSON.parse(response.responseText);
  var flash;
  this.$(".flash").remove();
  $("input").css("background-color","");
  _.each(this.attributesWithErrors["errors"], function (num, key){
    
    $("label[for='new-task-"+key+"']").append(JST['posts/flash']({ flashText: num[0], type: 'error' }));
    $("#new-task-"+key).css("background-color","red");
  });


  }
});
