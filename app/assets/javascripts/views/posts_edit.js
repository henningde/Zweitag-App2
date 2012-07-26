ExampleApp.Views.PostsEdit = Backbone.View.extend({
  tagName: 'form',
  id: "edit-post",

  events: {
    "submit": "update",
  },

  initialize: function(options) {
    this.users = options.users;
    _.bindAll(this, "render", "saved", "errord");
    
  },


  addAssignee: function() {
    this.$('ul.assignees').append(JST['posts/assignee_field']());
    return false;
  },

  render: function () {
    
    this.$el.html(JST['posts/form_fields']());
    this.$('input[name=submit]').val("Update url");
    this.$('.title-form').html("Edit Link "+this.model.get('title'));
    this.$('input[name=title]').val(this.model.get('title'));
    this.$('input[name=link]').val(this.model.get('link'));
    return this;
  },

  renderFlash: function(flashText,type) {

    this.$(".flash").remove();
    this.$('.flash-place').html(JST['posts/flash']({ flashText: flashText, type: type }));
  
   // this.$el.prepend(JST['posts/flash']({ flashText: flashText, type: type }));
  },

  update: function(e) {
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
    var flash = "Link will be changed: " + this.model.escape('title');  

    this.render();
    this.renderFlash(flash,'success');
  },






errord: function(jqXHR, response, errorThrown) {

  if(response.status==422){
    this.attributesWithErrors = JSON.parse(response.responseText);
    var flash;
    this.$(".flash").remove();
    $("input").css("background-color","");
    _.each(this.attributesWithErrors["errors"], function (num, key){
      
      $("label[for='new-task-"+key+"']").append(JST['posts/flash']({ flashText: num[0], type: 'error' }));
      $("#new-task-"+key).css("background-color","red");
    });
  }else if(response.status==500){
      var flash = "Access denied";  
      this.renderFlash(flash,'error');

  }else{
    var flash = "Error!";  
      this.renderFlash(flash,'error');
  }

  }
});
