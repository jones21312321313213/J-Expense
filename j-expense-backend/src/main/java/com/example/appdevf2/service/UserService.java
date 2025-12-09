package com.example.appdevf2.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appdevf2.entity.UserEntity;
import com.example.appdevf2.repository.CategoryRepository;
import com.example.appdevf2.repository.UserRepository;
@Service
public class UserService {
    @Autowired
    UserRepository urepo;

    @Autowired
    CategoryRepository crepo;
    

    // C - Create or insert user record in tbl_user (including transactions)
    public UserEntity insertUser(UserEntity user) {
        // If POST request includes transactions, set FK back-reference
        // if (user.getTransactions() != null) {
        //     user.getTransactions().forEach(t -> t.setUser(user));
        // }

        // Saving user will automatically save transactions (cascade)
        return urepo.save(user);
    }


    //R - read all user records in tbluser
    public List<UserEntity> getAllUsers(){
        return urepo.findAll();
    }

    //R - read user by id in tbluser
    public UserEntity getUserById(int id) {
        return urepo.findById(id).orElse(null);
    }


    //U - update a user
    @SuppressWarnings("finally")
    public UserEntity updateUser(int uid, UserEntity newUserDetails){
        UserEntity u = new UserEntity();
        try{
            //1) Search the id number of the user that will be updated
            u = urepo.findById(uid).get();
            //2) upddate the record
            u.setUsername(newUserDetails.getUsername());
            u.setEmail(newUserDetails.getEmail());
            u.setPassword(newUserDetails.getPassword());
        }catch(NoSuchElementException e){
            throw new NoSuchElementException("User: " +  uid + " is not found");
        }finally{
            return urepo.save(u);
        }
    }


    // D - delete a user
    public String deleteUser(int uid){
        String msg = "";
        if(urepo.existsById(uid)){
            urepo.deleteById(uid);
            msg = "User: " + uid + " is successfully deleted!";
        }else{
            msg = "User: " + uid + " does not exist.";
        }
        return msg;
    }
}
