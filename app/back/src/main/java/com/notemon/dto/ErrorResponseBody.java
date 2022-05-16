package com.notemon.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class ErrorResponseBody implements Serializable {
    private int httpStatusCode;
    protected String correlationId;
    protected String message;
}
