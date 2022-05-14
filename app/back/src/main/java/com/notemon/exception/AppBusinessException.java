package com.notemon.exception;

public class AppBusinessException extends Exception {
    public AppBusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppBusinessException(String message) {
        super(message);
    }
}
