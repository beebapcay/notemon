package com.notemon.config;

import com.notemon.dto.ErrorResponseBody;
import com.notemon.dto.MessageResponseDto;
import com.notemon.exception.AppBusinessException;
import com.notemon.exception.AppRTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerConfiguration {
    @ResponseBody
    @ExceptionHandler(AuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public MessageResponseDto handleAuthenticationException(Exception exception) {
        return log("Authentication error occurred.", exception);
    }

    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public MessageResponseDto handleAccessDeniedException(Exception exception) {
        return log("Access to forbidden data is not allowed.", exception);
    }

    @ResponseBody
    @ExceptionHandler(AppBusinessException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponseBody handleBusinessCheckedException(Exception exception) {
        log(exception.getMessage(), exception);
        return error(HttpStatus.BAD_REQUEST, "Business error occurred.", exception);
    }

    @ResponseBody
    @ExceptionHandler(AppRTException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseBody handleRTException(Exception exception) {
        log(exception.getMessage(), exception);
        return error(HttpStatus.INTERNAL_SERVER_ERROR, "Technical Runtime error occurred.", exception);
    }

    @ResponseBody
    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponseBody handleThrowable(Exception exception) {
        log(exception.getMessage(), exception);
        return error(HttpStatus.INTERNAL_SERVER_ERROR, "Exception error occurred.", exception);
    }

    private ErrorResponseBody error(
            HttpStatus status,
            String message,
            Throwable exception
    ) {
        log.error("Unhandled exceptions occurred", exception);
        return new ErrorResponseBody(status.value(), message, exception.getMessage());
    }

    private MessageResponseDto log(String message, Exception exception) {
        log.error(message, exception);
        return new MessageResponseDto(message);
    }
}
