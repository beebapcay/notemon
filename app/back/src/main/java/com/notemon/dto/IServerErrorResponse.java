package com.notemon.dto;

import com.notemon.enums.ServerErrorEnum;

public interface IServerErrorResponse {
    ServerErrorEnum getErrorType();
}
