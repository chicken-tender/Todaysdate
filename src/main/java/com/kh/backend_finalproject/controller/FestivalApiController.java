package com.kh.backend_finalproject.controller;

import com.kh.backend_finalproject.dto.FestivalDto;
import com.kh.backend_finalproject.service.FestivalApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/festivals")
@RequiredArgsConstructor
public class FestivalApiController {
    private final FestivalApiService festivalApiService;

    @GetMapping("/")
    public List<FestivalDto> getAllFestivals() {
        return festivalApiService.getAllFestivals();
    }
}
