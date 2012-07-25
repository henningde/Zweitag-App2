class ChangeDataTypeVote < ActiveRecord::Migration
  def up
  	change_table :posts do |t|
      t.change :vote, :string
    end
  end

  def down
  end
end
