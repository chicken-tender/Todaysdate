//package com.kh.backend_finalproject.repository;
//import com.kh.backend_finalproject.dto.ChatbotUserDto;
//import com.kh.backend_finalproject.entitiy.ChatbotTb;
//import com.kh.backend_finalproject.entitiy.PostTb;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.TestPropertySource;
//import org.springframework.test.context.jdbc.Sql;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@SpringBootTest
//@TestPropertySource(locations = "classpath:application-test.properties")
//@Sql("/dummy_test.sql")
//class ChatbotRepositoryTest {
//    @Autowired
//    ChatbotRepository chatbotRepository;
//
//
//    @Test
//    @DisplayName("관리자페이지 - 문의내역 조회 테스트")
//    public void findAllInquiriesTest () {
//        List<ChatbotTb> chatbotTbs = chatbotRepository.findAll();
//        for (ChatbotTb e : chatbotTbs) {
//            System.out.println("💗문의 번호 : " + e.getId());
//            System.out.println("💗문의 내용 : " + e.getInquiryContent());
//            System.out.println("💗문의자 : " + e.getUser().getNickname());
//            System.out.println("💗문의일 : " + e.getInquiryDate());
//            System.out.println("💗상태 : " + e.getInquiryStatus());
//            System.out.println("—————————————— ");
//
//        }
//    }
//}