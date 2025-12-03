package com.example.appdevf2.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToMany;
// import java.util.List;
// import jakarta.persistence.CascadeType;

@Entity
@Table(name = "tbl_user")
public class UserEntity {
  
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userID;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "creation_date")
    private Date creation_date;



    // @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    // private List<TransactionEntity> transactions;


    

    public UserEntity() {
        super();
    }

    public UserEntity(int userID, String username, String email, String password, Date creation_date) {
        super();
        this.userID = userID;
        this.username = username;
        this.email = email;
        this.password = password;
        this.creation_date = creation_date;
    }

    // setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

     
    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }


    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Date getCreation_date() {
        return creation_date;
    }
}
