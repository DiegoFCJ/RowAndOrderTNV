package com.tnv.userManager.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tnv.userManager.model.User;
import com.tnv.userManager.service.JpaUserDetailsService;
import com.tnv.userManager.service.EmailActivationLinkService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.security.spec.InvalidParameterSpecException;

@RestController
@RequestMapping("/api/public")
public class PublicUsersController {
    PasswordEncoder encoder = new BCryptPasswordEncoder();
    EmailActivationLinkService activation;
    JpaUserDetailsService userService;

    @Autowired
    public PublicUsersController(JpaUserDetailsService userService, EmailActivationLinkService activation) {
        this.userService = userService;
        this.activation = activation;
    }

    @PostMapping("/signIn")
    public ResponseEntity<User> signIn(@RequestBody User user) throws AccountNotFoundException, InvalidParameterSpecException {

        User userFound = userService.signIn(user);
        boolean isUsernamePresent = userService.doesUsernameExists(user.getUsername());
        boolean isPasswordPresent = encoder.matches(user.getPassword(), userFound.getPassword());
        boolean isEmailPresent = userService.doesEmailExists(user.getUsername());

        if(isUsernamePresent || isEmailPresent && isPasswordPresent){
            return new ResponseEntity<>(userFound, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(userFound, HttpStatus.UNAUTHORIZED);

    }

    @PostMapping("/signUp")
    public ResponseEntity<User> signUp(@RequestBody User user) throws JsonProcessingException, MessagingException {
        boolean isUsernamePresent = userService.doesUsernameExists(user.getUsername());
        boolean isEmailPresent = userService.doesEmailExists(user.getEmail());

        if(!isUsernamePresent && !isEmailPresent){
            ObjectMapper mapper = new ObjectMapper();
            String signedUser = userService.signUp(user);
            activation.sendMail(user);/*
            Map<String,Object> map = mapper.readValue(signedUser, Map.class);*/
            return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(user, HttpStatus.CONFLICT);
    }

    @GetMapping("/activation")
    public String activation(@RequestParam String token){
            return activation.confirmEmail(token);
    }

    @PostMapping("/signAdmin")
    public void signAdmin(){
        userService.signAdmin();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUser(id);
    }

    @GetMapping("/all")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    }
