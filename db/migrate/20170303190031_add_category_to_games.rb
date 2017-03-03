class AddCategoryToGames < ActiveRecord::Migration[5.0]
  def change
    add_reference :games, :category, foreign_key: true
  end
end
