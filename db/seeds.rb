# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'httparty'

url = 'https://api.spotify.com/v1/tracks/'
track_ids = ['4vb4mFvYsr2h6enhjJsq9Y','3dhjNA0jGA8vHBQ1VdD6vV',
            '6cr6UDpkjEaMQ80OjWqEBQ','6zeE5tKyr8Nu882DQhhSQI',
            '46eu3SBuFCXWsPT39Yg3tJ', '0PGwM5vdr5fMejx0IIAYXj',
            '42et6fnHCw1HIPSrdPprMl', '0ki28p3v35elzrc3th6y90']

track_ids.each do |id|
  result = HTTParty.get("#{url}#{id}")
  artist = result['artists'].first['name']
  track = result['name']
  preview_url = result['preview_url']

  Track.create(artist: artist, track: track, preview_url: preview_url)
end
