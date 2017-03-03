class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validate :validate_username
  has_attached_file :image,
                    styles: { medium: "640x" },
                    storage: :s3,
                    s3_credentials: Proc.new{ |a| a.instance.s3_credentials },
                    s3_region: 'us-east-1'
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  has_many :games

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

  def s3_credentials
    {
      bucket: "trivia-profile-pics", #ENV["S3_USERS_BUCKET"],
      access_key_id: "AKIAJQJ4TFVV6J55HUMA", #ENV["S3_ACCESS_KEY_ID"],
      secret_access_key: "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" #ENV["S3_SECRET_ACCESS_KEY"]
    }
  end

  def image_url
    image.url(:medium)
  end
end
