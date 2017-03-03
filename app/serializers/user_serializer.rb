class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :image
  has_many :games
end
