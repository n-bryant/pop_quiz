require 'httparty'

class TracksController < ApplicationController
  def index
    tracks = Track.all

    tracks.to_json
  end

  def create
    
  end
end
