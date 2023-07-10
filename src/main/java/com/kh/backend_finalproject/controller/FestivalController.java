package com.kh.backend_finalproject.controller;

import com.kh.backend_finalproject.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/festival")

public class FestivalController {

    private final FestivalService festivalService;

    //  이미지 가져오기
    @GetMapping("/images/{contentId}")
    public ResponseEntity<String> getImages(@PathVariable String contentId) {
        String imageData = festivalService.getImages(contentId);
        return ResponseEntity.ok(imageData);
    }
}

