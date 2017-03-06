class RemoveCategoriesFromGames < ActiveRecord::Migration[5.0]
  def change
    remove_column :games, :category_id
  end
end
