require 'pry'

class Post < ActiveRecord::Base
  	attr_accessible :link, :title,:user_id,:vote
 	 #, :user_id, :vote
  	belongs_to :user
  	has_many :votes
    has_many :comments
 	validates :link, presence: true, length: { maximum: 140 }
  validates :title, presence: true, length: { :in => 5..140 }
	validates :user_id, presence: true  

  	VALID_EMAIL_REGEX = /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
  	validates :link, presence: true, format: { with: VALID_EMAIL_REGEX }

 	# default_scope order: count_sub_parts


	def as_json(*args)
	 hash = super(*args)
   # binding.pry
	 upvote = Vote.where("post_id = ? and upvote= ?",self.id,true).count
   	 downvote = Vote.where("post_id = ? and upvote= ?",self.id,false).count

   	calc_voting= (upvote*2)-(downvote*3)

if(calc_voting>0)
  calc_voting+=calc_rang_by_date(self.created_at)
end
    has_user_vote = Vote.where("post_id = ? and user_id= ?",self.id,User.current.id).count
   hash.merge!(:calc_voting => calc_voting ,:has_user_vote => has_user_vote)
	
	end

 	def upvote!
 		self.upvote ||= 0
 		self.upvote+=1
 		self.vote=self.vote+" #{self.user.id}"
 	end
 	 
   def downvote!
 		self.downvote ||= 0
 		self.downvote+=1
 		self.vote=self.vote+" #{self.user.id}"
 	end

  def calc_rang_by_date(created_time)
    created_time= created_time.to_time.to_i
    time_now=Time.now.to_i
    calc_time=(time_now-created_time)/60

    ###kleiner als 1 Tag (24Std)
    if calc_time<1440
      return +2
    ##älter als 1 Monat (30Tage)
    elsif calc_time>43200
      return -15
    ##älter als 1 Woche (7Tagfe9)
    elsif calc_time>10080 
      return -8
    ##älter als 1 Tag
    elsif calc_time>1440 
      return -3
    end
  
  end

end