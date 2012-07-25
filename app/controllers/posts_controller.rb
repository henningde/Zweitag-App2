class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
respond_to :html, :json
  before_filter :authenticate_user!

  before_filter :set_current_user
  def index
 #  @posts = Post.find(:all, :select => "* ,((COALESCE(upvote,0)*2)-(COALESCE(downvote,0)*3)) as calc_voting", :order => 'calc_voting DESC')
@posts = Post.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts,include: { vote: { only: [:id] } } ,include: { user: { only: [:id, :email] } } }
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
  def edit
    @post = Post.find(params[:id])
  end

  # POST /posts
  # POST /posts.json
  def create
 

 respond_with(current_user.posts.create(params[:post]))
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


  task = current_user.posts.find(params[:id])
    task.update_attributes(params[:task])
    respond_with(task)

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
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end


    def as_json(*args)
   hash = super(*args)
   # binding.pry
   upvote = Vote.where("post_id = ? and upvote= ?",self.id,true).count
     downvote = Vote.where("post_id = ? and upvote= ?",self.id,false).count

    calc_voting= (upvote*2)-(downvote*3)

    has_user_vote = Vote.where("post_id = ? and user_id= ?",self.id,user.id).count
  # puts "fsdf #{self.id} fsdf #{self.current_user.email}  ---#{has_user_vote}"
   hash.merge!(:calc_voting => calc_voting ,:has_user_vote => has_user_vote)
  
  end
end
