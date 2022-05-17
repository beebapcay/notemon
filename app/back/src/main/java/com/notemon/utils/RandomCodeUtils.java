package com.notemon.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class RandomCodeUtils {
    public static String generateShareCode() {
        return RandomStringUtils.random(12, true, true);
    }
}
