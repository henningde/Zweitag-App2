ExampleApp.Views.PostItem = Support.CompositeView.extend({
  tagName: "tr",

  events: {
    "click .upvote-link": "upvote",
    "click .downvote-link": "downvote",
    "click a.delete": "delete"
  },



  initialize: function() {
    _.bindAll(this, "render","delete", "deleted", "errord");
  },

  render: function () {
    this.$el.attr("id", "post_" + this.model.id);

    this.$el.html(JST['posts/item']({ task: this.model }));
    this.renderFormContents();
    return this;
  },

  renderFormContents: function() {

    // console.log(this.model);
    this.$('label').attr("for", "post_completed_" + this.model.get('id'));
    this.$('label').html(this.model.escape('title'));

    this.$('input').attr("id", "post_completed_" + this.model.get('id'));
    this.$('input').prop("checked", this.model.isComplete());


    this.$('.user_email').html(this.model.get('user')['email']);

    this.$('.created_at').html($.timeago(this.model.get('created_at')));
    if(this.model.get('calc_voting')<0){var calc_voting=0}else{calc_voting=this.model.get('calc_voting')}

    this.$('.votes').html(calc_voting);

    this.$('.post-edit-link').text();


// +new Date().getTime()
    this.$('.post-link').text(this.model.escape('title'));
    this.$('.post-link').attr("href", this.postUrl());
 


     if(ExampleApp.data.current_user_id==this.model.get('user')['id']) {
        this.$('.vote-buttons').html("<a class=\"post-edit-link\" href=\"#\">[E]</a><a class=\"delete\" href=\"#\">[X]</a>");
        this.$('.post-edit-link').attr("href", this.postEditUrl());
        this.$('.delete').click(function(){
          var answer = confirm('You sure?');
          return answer // answer is a boolean
        }); 
    }else{
        this.$('.post-edit-link').text("");
    }





// this.model.get('vote').strip.each(' ') {|s| console.log(s.strip) };

    if (this.model.get('has_user_vote')>=1){
      this.$('.upvote-link').text("");
      this.$('.downvote-link').text("");
    }

  },

  postUrl: function() {
    return this.model.get('link');
    // return "#posts/" + this.model.get('id');
  },

  postEditUrl: function() {

     return "#posts/" + this.model.get('id');
  },
  upvote: function() {

    var newVote=this.model.upvote(this.model.get('id'));
    this.model.set({ calc_voting: newVote });
    this.model.set({ has_user_vote: 1 });
    this.render();

    this.$('.upvote-link').text("");
    this.$('.downvote-link').text("");

  },

  downvote: function() {
    
    var newVote=this.model.downvote(this.model.get('id'));
    this.model.set({ calc_voting: newVote });
    this.model.set({ has_user_vote: 1 });
    this.render();
    
    this.$('.upvote-link').text("");
    this.$('.downvote-link').text("");
  
  },

  renderFlash: function(flashText,type) {
  
    this.$(".flash").remove();
    this.$('.flash-place').html(JST['posts/flash']({ flashText: flashText, type: type }));
   // this.$el.prepend(JST['posts/flash']({ flashText: flashText, type: type }));
  },


  delete: function() {
    this.model.destroy( { success: this.deleted ,error: this.errord ,wait:true});


  },

  deleted: function() {
    var flash = "Delete Link:";  
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


