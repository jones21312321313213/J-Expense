package com.example.appdevf2.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tbl_category")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryID;

    @Column(name = "category_name")
    private String category_name;

    @Column(name = "category_type")
    private String category_type;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserEntity user;

    @Column(name = "is_global")
    private Boolean is_global = false;

    public CategoryEntity() {
        super();
    }

    public CategoryEntity(int categoryID, String category_name, String category_type) {
        super();
        this.categoryID = categoryID;
        this.category_name = category_name;
        this.category_type = category_type;
    }

    public CategoryEntity(int categoryID, String category_name, String category_type, Boolean is_global) {
        super();
        this.categoryID = categoryID;
        this.category_name = category_name;
        this.category_type = category_type;
        this.is_global = is_global;
    }

    // Setters
    public void setCategoryID(int categoryID) {
        this.categoryID = categoryID;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public void setCategory_type(String category_type) {
        this.category_type = category_type;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public void setIs_global(Boolean is_global) {
        this.is_global = is_global;
    }

    // Getters
    public int getCategoryID() {
        return categoryID;
    }

    public String getCategory_name() {
        return category_name;
    }

    public String getCategory_type() {
        return category_type;
    }

    public UserEntity getUser() {
        return user;
    }

    public Boolean getIs_global() {
        return is_global;
    }
}