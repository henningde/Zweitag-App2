class PostsController < ApplicationController
  respond_to :html, :json
  before_filter :authenticate_user!

  before_filter :set_current_user
  def index
    @posts = Post.all
    #authorize! :read, @posts
    @comments = Comment.all
    respond_to do |format|
      format.html # index.html.erb
      #TODO: When using long hashes (e.g. you have to scroll to see all of it,
      #it is often useful to break them up onto multiple lines.
      format.json { render json: @posts,include:  { user:
                                                    {
                                                      only: [:id, :email] 
                                                    },
                                                     comment:
                                                      {
                                                        only: [:id, :comment] 
                                                      } 
                                                   } 
                  }
    end
  end

  def show
    #TODO: Why no "authorize!" here?

    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      #TODO: You are rendering "@posts", not "@post". Why?
      format.json { render json: @posts }
    end
  end

  def new
    @post = Post.new()

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  def upvote
    #TODO: Why no "authorize!" here?
    #TODO: Instead of using .new and then .save you can use .create.
    @vote = Vote.new(post_id:params[:id], user_id:current_user.id, upvote:true )
    @vote.save
    @post = Post.find(params[:id])
    respond_to do |format|
      format.json { render json: @post}
    end

  end

  def downvote
    #TODO: Why no "authorize!" here?
    #TODO: Instead of using .new and then .save you can use .create.
    @vote = Vote.new(post_id:params[:id], user_id:current_user.id, upvote:false )
    @vote.save
    @post = Post.find(params[:id])
    respond_to do |format|
      format.json { render json: @post}
    end
  end

  def comment
    #TODO: Why no "authorize!" here?
    @comment = Comment.new(post_id:params[:id], user_id:current_user.id,comment:params[:comment] )
    respond_to do |format|
      if @comment.save
        @post = Post.find(params[:id])
        #TODO: When using long hashes (e.g. you have to scroll to see all of it,
        #it is often useful to break them up onto multiple lines.
        format.json { render json: @post,include: { user: { only: [:id, :email] },comments: { only: [:id, :comment] } } }
      else
        format.json { render json: @comment.errors,:status => :unprocessable_entity }
      end
  end

  end

  #TODO: I guess you're still working on this :)
  #TODO: Why no "authorize!" here?
  def edit
    @post = Post.find(params[:id])
  end

  def create
    #TODO: Why no "authorize!" here?
    @posts=current_user.posts.create(params[:post])
    respond_with(@posts,include: { user: { only: [:id, :email] } })
  end

  def update
    #TODO: As in the other actions, you generally use
    #instance variables ("@post") instead of local variables ("post")
    #in order to be able to use them in a view context.
    post = Post.find(params[:id])
    authorize! :update, post
    post.update_attributes(params[:post])
    respond_with(post)
  end

  def destroy
    @post = Post.find(params[:id])
    authorize! :delete, @post
    @post.destroy
    render :json => @post
  end

end
