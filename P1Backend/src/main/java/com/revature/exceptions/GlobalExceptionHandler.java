package com.revature.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//We can use a global exception handler to clean up our code
@RestControllerAdvice //This lets our handler intercept exception thrown in any controller
public class GlobalExceptionHandler {

    //In here, we can define how we want to handle any Exception that could be thrown
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

}
