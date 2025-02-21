package com.revature.aspects;

import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Aspect
@Component
public class AuthAspect {
    //@Before allows us to invoke this method BEFORE any method we specify
    //"Invoke the login check before any method in the controller package BESIDES AuthController"
    @Order(1) //This advice will run first
    @Before("within(com.revature.controllers.*)" +
            " && !within(com.revature.controllers.AuthController)")
    public void checkLoggedIn() {

        //gest access to the session (or lack thereof)
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attributes.getRequest().getSession(false);

        if(session == null || session.getAttribute("userId") == null) {
            throw new IllegalArgumentException("User must be logged to do this!");
        }
    }

    @Before("@annotation(com.revature.aspects.ManagerOnly)")
    @Order(2)
    public void checkAdmin() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attributes.getRequest().getSession(false);

        if(session == null){
            throw new IllegalArgumentException("User must be logged in to do this");
        }

        String role = session.getAttribute("role").toString();

        if(!role.equals("manager")) {
            throw new IllegalArgumentException("User must be an admin to do this!");
        }
    }

}
