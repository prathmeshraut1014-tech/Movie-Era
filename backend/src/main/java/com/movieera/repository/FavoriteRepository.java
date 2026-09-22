package com.movieera.repository;

import com.movieera.model.Favorite;
import com.movieera.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);
    Optional<Favorite> findByUserAndTmdbId(User user, Long tmdbId);
    boolean existsByUserAndTmdbId(User user, Long tmdbId);
    void deleteByUserAndTmdbId(User user, Long tmdbId);
}
