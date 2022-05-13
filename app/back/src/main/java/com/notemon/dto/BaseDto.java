package com.notemon.dto;


import lombok.Data;

import javax.validation.constraints.Min;
import java.io.Serializable;
import java.util.UUID;

@Data
public class BaseDto implements Serializable {
    private UUID id;

    @Min(value = 0, message = "The minimum value id is 0")
    private int version;
}
