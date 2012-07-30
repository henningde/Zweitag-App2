class User < ActiveRecord::Base
	has_many :posts
	has_many :votes
	has_many :comments
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me
  # attr_accessible :title, :body



  #TODO: Doesn't Devise provide the current_user method?
  #Anyway, this seems to be a good pattern, although you are
  #modifying global state - this is not "forbidden", but you 
  #want to have good reasons for this as it breaks encapsulation.
  def self.current
    Thread.current[:user]
  end
  def self.current=(user)
    Thread.current[:user] = user
  end

end


