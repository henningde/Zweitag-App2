class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
respond_to :html, :json
 before_filter :authenticate_user!

# rescue_from CanCan::AccessDenied do |exception|  
#   render json: {:status => :AccessDenied}

# end  

  before_filter :set_current_user
  def index
     #  @posts = Post.find(:all, :select => "* ,((COALESCE(upvote,0)*2)-(COALESCE(downvote,0)*3)) as calc_voting", :order => 'calc_voting DESC')
    @posts = Post.all
    #authorize! :read, @posts
@comments = Comment.all
    respond_to do |format|
      format.html # index.html.erb
  format.json { render json: @posts,include: { user: { only: [:id, :email] },comment: { only: [:id, :comment] } } }
   
    end
  end



  # GET /posts/1
  # GET /posts/1.json
  def show

    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new()

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/1/edit
  def upvote

    @vote = Vote.new(post_id:params[:id], user_id:current_user.id, upvote:true )
    @vote.save
    @post = Post.find(params[:id])
    respond_to do |format|
    format.json { render json: @post}
    end

  end


  # GET /posts/1/edit
  def downvote
    @vote = Vote.new(post_id:params[:id], user_id:current_user.id, upvote:false )
    @vote.save
    @post = Post.find(params[:id])
    respond_to do |format|
    format.json { render json: @post}
    end

  end


    # GET /posts/1/edit
  def comment
    @comment = Comment.new(post_id:params[:id], user_id:current_user.id,comment:params[:comment] )
     respond_to do |format|
    if @comment.save
      @post = Post.find(params[:id])
     
        format.json { render json: @post,include: { user: { only: [:id, :email] },comments: { only: [:id, :comment] } } }
      
    else

      format.json { render json: @comment.errors,:status => :unprocessable_entity }
    end
  end

  end
  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
 

    @posts=current_user.posts.create(params[:post])


      respond_with(@posts,include: { user: { only: [:id, :email] } })


    # @post = current_user.posts.build(params[:post])

    # respond_to do |format|
    #   if @post.save
    #     format.html { redirect_to @post, notice: 'Post was successfully created.' }
    #     format.json { render json: @post, status: :created, location: @post }
    #   else
    #     format.html { render action: "new" }
    #     format.json { render json: @post.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update


    post = Post.find(params[:id])

    authorize! :update, post


    post.update_attributes(params[:post])
    respond_with(post)
    # @post = Post.find(params[:id])

    # respond_to do |format|
    #   if @post.update_attributes(params[:post])
    #     format.html { redirect_to @post, notice: 'Post was successfully updated.' }
    #     format.json { head :no_content }
    #   else
    #     format.html { render action: "edit" }
    #     format.json { render json: @post.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    authorize! :delete, @post
    @post.destroy
render :json => @post
 
  end



end
