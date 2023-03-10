package com.errorit.erroritoverflow.app.auth.cookie;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@Component
public class CookieManager {

    @Getter
    @Value("${cookie.refresh.max-age}")
    private int REFRESH_COOKIE_MAX_AGE;

    @Getter
    @Value("${cookie.refresh.name}")
    private String REFRESH_COOKIE_NAME;

    // Refresh 토큰 쿠키 획득
    public Cookie getRefreshCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(REFRESH_COOKIE_NAME)) {
                return cookie;
            };
        }
        return null;
    }

    // Refresh 토큰 쿠키 발급
    public void generateRefreshCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie(REFRESH_COOKIE_NAME, refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(REFRESH_COOKIE_MAX_AGE);
        response.addCookie(refreshTokenCookie);
    }
}
