class AddAttributesToTracks < ActiveRecord::Migration[5.0]
  def change
    add_column :tracks, :album_image, :string
    add_column :tracks, :album_name, :string
  end
end
