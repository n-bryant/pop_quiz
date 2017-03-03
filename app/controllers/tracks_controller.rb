class TracksController < ApplicationController
  def index
    @tracks = Track.all

    limit = params[:limit]
    unless limit.nil?
      @tracks = @tracks.order("RANDOM()").limit(limit)
    end

    render json: @tracks
  end

  def show
    @tracks = Track.find(params[:id])

    render json: @tracks
  end
end
