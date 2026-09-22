package com.movieera.service;

import com.movieera.dto.FavoriteRequest;
import com.movieera.model.Favorite;
import com.movieera.model.User;
import com.movieera.repository.FavoriteRepository;
import com.movieera.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;

    public FavoriteService(FavoriteRepository favoriteRepository, UserRepository userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Favorite> getFavorites(String email) {
        return favoriteRepository.findByUser(getUser(email));
    }

    public Favorite addFavorite(String email, FavoriteRequest req) {
        User user = getUser(email);
        if (favoriteRepository.existsByUserAndTmdbId(user, req.getTmdbId())) {
            throw new RuntimeException("Already in favorites");
        }
        Favorite fav = Favorite.builder()
                .user(user)
                .tmdbId(req.getTmdbId())
                .title(req.getTitle())
                .posterPath(req.getPosterPath())
                .releaseDate(req.getReleaseDate())
                .voteAverage(req.getVoteAverage())
                .build();
        return favoriteRepository.save(fav);
    }

    @Transactional
    public void removeFavorite(String email, Long tmdbId) {
        User user = getUser(email);
        favoriteRepository.deleteByUserAndTmdbId(user, tmdbId);
    }

    public boolean isFavorite(String email, Long tmdbId) {
        return favoriteRepository.existsByUserAndTmdbId(getUser(email), tmdbId);
    }
}
