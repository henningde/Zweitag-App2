class Post < ActiveRecord::Base
  	attr_accessible :link, :title,:user_id,:vote
  	belongs_to :user
  	has_many :votes
    has_many :comments
    validates :link, presence: true, length: { maximum: 140 }
    validates :title, presence: true, length: { :in => 5..140 }
    validates :user_id, presence: true  

    #TODO: This is still a regexp for websites, NOT email
  	VALID_EMAIL_REGEX = /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
  	validates :link, presence: true, format: { with: VALID_EMAIL_REGEX }

    def as_json(*args)
      hash = super(*args)
      upvote = Vote.where("post_id = ? and upvote= ?",self.id,true).count
      downvote = Vote.where("post_id = ? and upvote= ?",self.id,false).count
      calc_voting= (upvote*2)-(downvote*3)

      if(calc_voting>0)
        calc_voting+=calc_rang_by_date(self.created_at)
      end

      #TODO: A better way to get the current user without defining User.current 
      #as a "globally" accessible variable, you could pass in the user into
      #the options to to_json (I think).
      has_user_vote = Vote.where("post_id = ? and user_id= ?",self.id,User.current.id).count
      hash.merge!(:calc_voting => calc_voting ,:has_user_vote => has_user_vote)
    end

    def upvote!
      self.upvote ||= 0
      self.upvote+=1
      #TODO: Is this still needed? Shouldn't votes be kept in a distinct table by now?
      self.vote=self.vote+" #{self.user.id}"
      #TODO: In general it is expected that a method with a "!" modifies the object in place
      #e.g. you should save the post here, too.
    end
 	 
    def downvote!
      self.downvote ||= 0
      self.downvote+=1
      #TODO: Is this still needed? Shouldn't votes be kept in a distinct table by now?
      self.vote=self.vote+" #{self.user.id}"
      #TODO: In general it is expected that a method with a "!" modifies the object in place
      #e.g. you should save the post here, too.
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
      ##älter als 1 Woche (7Tage)
      elsif calc_time>10080 
        return -8
      ##älter als 1 Tag
      elsif calc_time>1440 
        return -3
      end
    end

end
