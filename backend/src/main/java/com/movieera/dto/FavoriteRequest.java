package com.movieera.dto;

import lombok.Data;

@Data
public class FavoriteRequest {
    private Long tmdbId;
    private String title;
    private String posterPath;
    private String releaseDate;
    private Double voteAverage;
}
