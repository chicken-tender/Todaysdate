package com.kh.backend_finalproject.service;

import com.kh.backend_finalproject.dto.FestivalDto;
import com.kh.backend_finalproject.entitiy.FestivalTb;
import com.kh.backend_finalproject.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class FestivalApiService {
    @Value("${api.serviceKey}")
    private String apiKey;

    private final FestivalRepository festivalRepository;
    private final FestivalService festivalService;

    @Scheduled(cron = "0 * * * * *")
    public void startScheduler() {
        // 1. API에서 축제 정보 가져오기
        String response = festivalService.searchFestival();

        if (response == null) {
            return;
        }

        // 2. API 응답 JSON을 파싱하여 FestivalTb 객체 리스트 생성
        List<FestivalTb> festivals = new ArrayList<>();
        JSONObject jsonObject = new JSONObject(response);
        JSONObject responseObj = jsonObject.getJSONObject("response");
        JSONObject bodyObj = responseObj.getJSONObject("body");
        JSONObject itemsObj = bodyObj.getJSONObject("items");
        JSONArray itemArray = itemsObj.getJSONArray("item");
        for (int i = 0; i < itemArray.length(); i++) {
            JSONObject item = itemArray.getJSONObject(i);
            festivals.add(new FestivalTb(item));
        }

        // 3. DB에 저장
        festivalRepository.saveAll(festivals);
    }

    public List<FestivalDto> getAllFestivals() {
        return festivalRepository.findAll().stream().map(FestivalDto::new).collect(Collectors.toList());
    }

    @Scheduled(cron = "0 * * * * *")
    public void startSchedulerImage() {

    }

}
