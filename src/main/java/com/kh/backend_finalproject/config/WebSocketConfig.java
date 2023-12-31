package com.kh.backend_finalproject.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@Import(CorsConfiguration.class)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    /* <💡정리>
        1. 사용자 A가 로그인하면 서버에 웹소켓 연결을 생성. 이 연결은 '/ws' 엔드포인트로 이루어짐.
        2. 사용자 A는 서버에게 자신이 구독한 지역을 알려줌. 이는 STOMP 메시지로 이루어지며,
            목적지는 '/app/region/{regionId}와 같은 형태
        3. 서버는 사용자 A의 구독 요청을 받아서 처리하고, 이 사용자가 해당 지역의 알림을 받을 수 있도록 설정
        4. 사용자 B가 해당 지역의 게시글을 작성하면, 서버는 이 정보를 감지하고, 해당 지역을 구독하는 모든 사용자에게 알림 발송
            이 알림은 '/region/{regionId}로 브로드캐스트 됨.
        5. 사용자 A는 서버로부터 알림을 받고, 새로운 게시글이 작성되었음을 알 수 있음.
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/region");
        registry.setApplicationDestinationPrefixes("/app");
    }
}
