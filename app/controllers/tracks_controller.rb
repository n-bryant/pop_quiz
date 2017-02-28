class TracksController < ApplicationController
  def index
    tracks = Track.all

    render json: tracks
  end

  def show
    tracks = Track.find(params[:id])

    render json: tracks
  end
end
