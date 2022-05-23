package com.notemon.exception;

public class RefreshTokenException extends AppBusinessException {
    public static final String MESSAGE_PATTERN = "Refresh token is invalid or expired (Refresh token: %s)";

    public RefreshTokenException(String refreshToken) {
        super(String.format(MESSAGE_PATTERN, refreshToken));
    }
}
