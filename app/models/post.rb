class Post < ActiveRecord::Base
  	attr_accessible :link, :title,:user_id,:vote
 	 #, :user_id, :vote
  	belongs_to :user
 	validates :link, presence: true, length: { maximum: 140 }
  	validates :title, presence: true, length: { :in => 5..140 }
	validates :user_id, presence: true  

  	VALID_EMAIL_REGEX = /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
  	validates :link, presence: true, format: { with: VALID_EMAIL_REGEX }

 	# default_scope order: count_sub_parts


 	def upvote!
 		self.upvote ||= 0
 		self.upvote+=1
 	end
 	 	def downvote!
 		self.downvote ||= 0
 		self.downvote+=1
 	end


end