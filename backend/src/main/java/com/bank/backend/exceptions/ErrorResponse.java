package com.bank.backend.exceptions;

import java.time.LocalDateTime;

public record ErrorResponse(LocalDateTime timestamp, String message) {

}