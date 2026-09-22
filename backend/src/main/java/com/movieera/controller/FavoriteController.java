package com.movieera.controller;

import com.movieera.dto.FavoriteRequest;
import com.movieera.model.Favorite;
import com.movieera.service.FavoriteService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(Authentication auth) {
        return ResponseEntity.ok(favoriteService.getFavorites(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest request, Authentication auth) {
        try {
            Favorite fav = favoriteService.addFavorite(auth.getName(), request);
            return ResponseEntity.ok(fav);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{tmdbId}")
    public ResponseEntity<?> removeFavorite(@PathVariable Long tmdbId, Authentication auth) {
        favoriteService.removeFavorite(auth.getName(), tmdbId);
        return ResponseEntity.ok(Map.of("message", "Removed from favorites"));
    }

    @GetMapping("/check/{tmdbId}")
    public ResponseEntity<Map<String, Boolean>> checkFavorite(@PathVariable Long tmdbId, Authentication auth) {
        boolean isFav = favoriteService.isFavorite(auth.getName(), tmdbId);
        return ResponseEntity.ok(Map.of("isFavorite", isFav));
    }
}
