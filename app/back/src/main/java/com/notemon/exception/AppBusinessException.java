package com.notemon.exception;

public class AppBusinessException extends Exception {
    public AppBusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}
