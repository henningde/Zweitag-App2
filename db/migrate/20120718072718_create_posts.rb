class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :link
      t.integer :user_id
      t.integer :vote

      t.timestamps
    end
  end
end
