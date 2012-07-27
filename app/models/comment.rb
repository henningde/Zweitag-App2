class Comment < ActiveRecord::Base
	belongs_to :post
	belongs_to :user
  attr_accessible :comment, :post_id, :user_id
  validates :comment, presence: true, length: { :in => 5..250 }
end
