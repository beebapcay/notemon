package com.notemon.exception;

public class AppRTException extends RuntimeException {
    public AppRTException(String message, Throwable e) {
        super(message, e);
    }

    public AppRTException(String message) {
        super(message);
    }

    public AppRTException(Throwable e) {
        super(e);
    }
}
