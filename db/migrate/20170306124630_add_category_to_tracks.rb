class AddCategoryToTracks < ActiveRecord::Migration[5.0]
  def change
    add_reference :tracks, :category, foreign_key: true
  end
end
