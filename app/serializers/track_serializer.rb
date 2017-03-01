class TrackSerializer < ActiveModel::Serializer
  attributes :id, :artist, :track, :preview_url, :album_image, :album_name
end
