ExampleApp.Views.PostsNew = Backbone.View.extend({
  tagName: 'form',
  id: "new-post",

  events: {
    "submit": "save",
  },

  initialize: function(options) {
    this.users = options.users;
    _.bindAll(this, "render", "saved", "errord");
    this.newPost();
  },

  newPost: function() {
    this.model = new ExampleApp.Models.Post();
  },



  render: function () {
    
    this.$el.html(JST['posts/form_fields']());

    this.$('.title-form').html("New Link");
    //TODO: Why do you focus on two for elements? Only the last one
    //you focus on will be the focused element in the end.
    //
    this.$('input[name=title]').focus();
    //this.$('input[name=link]').val("http://www.dasdasd.de");
    this.$('input[name=link]').focus();
    return this;
  },

  renderFlash: function(flashText,type) {
  
    this.$(".flash").remove();
    $('.flash-place').html(JST['posts/flash']({ flashText: flashText, type: type }));
    $('.flash-place').fadeIn();
   // this.$el.prepend(JST['posts/flash']({ flashText: flashText, type: type }));
  },

  save: function(e) {
    e.preventDefault();

    this.commitForm();

    this.model.save({}, { success: this.saved ,error: this.errord });

    return false;
  },

  commitForm: function() {
    this.model.set({ title: this.$('input[name=title]').val() });
    this.model.set({ link: this.$('input[name=link]').val() });
  
  },



  saved: function() {
    var flash = "Create Link: " + this.model.escape('title');  
    this.collection.add(this.model);
    this.newPost();
    this.render();
    this.renderFlash(flash,'success');
  },






errord: function(jqXHR, response, errorThrown) {
  console.log(response.responseText);
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
