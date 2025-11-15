package com.example.appdevf2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userv;
    
    //C - create a user record
    @PostMapping("/insertUser")
    public UserEntity insertUser(@RequestBody UserEntity user){
        return userv.insertUser(user);
    }


    // R - read all user records in tbluser
    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers(){
        return userv.getAllUsers();
    }

    @GetMapping("/getUser/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id){
       UserEntity user = userv.getUserById(id);
       if(user != null){
            return ResponseEntity.ok(user);
       }else{
            return ResponseEntity.notFound().build();
       }
     
    }


    //U - update a user record
    @PutMapping("/updateUser")
    public UserEntity updateUser(@RequestParam int uid, @RequestBody UserEntity newUserDetails){
            return userv.updateUser(uid, newUserDetails);
    }

    //D - delete a user record
    @DeleteMapping("/deleteUser/{uid}")
    public String deleteUser(@PathVariable int uid){
        return userv.deleteUser(uid);
    }
}
