class Post < ActiveRecord::Migration

	 def change
    add_column :posts, :upvote, :integer
    add_column :posts, :downvote, :integer
  end
  def up

  end

  def down
  end
end
