package com.kh.backend_finalproject.controller;

import com.kh.backend_finalproject.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/festival")

public class FestivalController {

    private final FestivalService festivalService;

    @GetMapping("/")
    public ResponseEntity<String> searchFestival() {
        String festivalData = festivalService.searchFestival();
        return ResponseEntity.ok(festivalData);
    }
}
