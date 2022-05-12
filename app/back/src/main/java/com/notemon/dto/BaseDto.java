package com.notemon.dto;


import lombok.Data;

import javax.validation.constraints.Min;
import java.util.UUID;

@Data
public class BaseDto {
    private UUID id;

    @Min(value = 0, message = "The minimum value id is 0")
    private int version;
}
