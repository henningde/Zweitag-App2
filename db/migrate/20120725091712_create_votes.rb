class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :post_id
      t.integer :user_id
      t.boolean :upvote

      t.timestamps
    end
  end
end
