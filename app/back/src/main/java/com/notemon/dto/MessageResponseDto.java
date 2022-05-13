package com.notemon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class MessageResponseDto implements Serializable {
    private String message;
}
