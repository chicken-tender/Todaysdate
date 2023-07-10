package com.kh.backend_finalproject.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Transactional
@RequiredArgsConstructor
@Service
@Slf4j
public class FestivalService {

    @Value("${api.serviceKey}")
    private String apiKey;

    public String searchFestival() {
        try {
            // API 요청 URL 생성
            String url = "http://apis.data.go.kr/B551011/KorService1/searchFestival1";
            String startDate = formatDate(LocalDate.now());
            String endDate = formatDate(LocalDate.now().plusMonths(6));

            url += "?serviceKey=" + apiKey;
            url += "&numOfRows=99";
            url += "&MobileOS=ETC";
            url += "&MobileApp=todaysDate";
            url += "&_type=json";
            url += "&listYN=Y";
            url += "&arrange=A";
            url += "&eventStartDate=" + startDate;
            url += "&eventEndDate=" + endDate;

            // API 호출
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                // API 응답 데이터 읽기
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder responseBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseBuilder.append(line);
                }
                reader.close();

                // API 응답 데이터 반환
                return responseBuilder.toString();
            } else {
                log.error("API 요청에 실패했습니다. 응답 코드: {}", responseCode);
            }
        } catch (Exception e) {
            log.error("API 요청 중 오류가 발생했습니다.", e);
        }

        return null;
    }

    private String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return date.format(formatter);
    }

    public String getImages(String contentId) {
        try {
            // API 요청 URL 생성
            String url = "http://apis.data.go.kr/B551011/KorService1/detailImage1";

            url += "?serviceKey=" + apiKey;
            url += "&numOfRows=6";
            url += "&pageNo=1";
            url += "&MobileOS=ETC";
            url += "&MobileApp=todaysDate";
            url += "&_type=json";
            url += "&imageYN=Y";
            url += "&subImageYN=Y";
            url += "&contentId=" + contentId;

            // API 호출
            HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
            connection.setRequestMethod("GET");
            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                // API 응답 데이터 읽기
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                StringBuilder responseBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    responseBuilder.append(line);
                }
                reader.close();

                // API 응답 데이터 반환
                return responseBuilder.toString();
            } else {
                log.error("API 요청에 실패했습니다. 응답 코드: {}", responseCode);
            }
        } catch (Exception e) {
            log.error("API 요청 중 오류가 발생했습니다.", e);
        }

        return null;
    }

}
