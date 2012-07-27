ExampleApp.Views.PostItem = Support.CompositeView.extend({
  tagName: "tr",

  events: {
    "click .upvote-link": "upvote",
    "click .downvote-link": "downvote",
    "click a.delete": "delete",
    "click a.post-add-comment": "addandremcommentbox",
    "click input.submit": "comment"
  },



  initialize: function() {
    _.bindAll(this, "render","delete", "deleted", "errord");
  },

  render: function () {
    this.$el.attr("id", "post_" + this.model.id);

    this.$el.html(JST['posts/item']({ task: this.model }));
    this.renderFormContents();
  //  this.renderComments();
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

var test=this.model.get('comments');


var self=this;


  _.each(test, function (num, key){
 
var comment= JST['posts/comment']({ comment: num["comment"] });
 self.$('.content_comments').append(comment);
});

// +new Date().getTime()
    this.$('.post-link').text(this.model.escape('title'));
    this.$('.post-link').attr("href", this.postUrl());
 
this.$('.post-add-comment').text("Comment");






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
addandremcommentbox: function(){


  this.$('.commentarea').toggle();
},
  comment: function() {
var self=this;
    var newComment=this.model.comment(this.model.get('id'),this.$('.commentbox').val(), function(data) {
    

        self.model.set({ comments: data.comments });

        self.render();
        self.renderFlash("Comment was created",'success');



  },function( data ) {

attributesWithErrors = JSON.parse(data.responseText);
self.renderFlash(attributesWithErrors['comment'][0],'error');
    
  })


  },


  renderFlash: function(flashText,type) {
  
    this.$(".flash").remove();
    $('.flash-place').html(JST['posts/flash']({ flashText: flashText, type: type }));
    $('.flash-place').fadeIn();
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


