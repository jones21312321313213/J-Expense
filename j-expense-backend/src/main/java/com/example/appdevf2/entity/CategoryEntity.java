package com.example.appdevf2.entity;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

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
    
    @Column(name = "is_default")
    private Boolean is_default = false;

    @Column(name = "icon_path")
    private String icon_path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"categories"})
    private UserEntity user;

    public CategoryEntity() {
        super();
    }

    public CategoryEntity(int categoryID, String category_name, String category_type) {
        super();
        this.categoryID = categoryID;
        this.category_name = category_name;
        this.category_type = category_type;
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

    public void setIs_default(Boolean is_default) {
        this.is_default = is_default;
    }

    public void setIcon_path(String icon_path) {
        this.icon_path = icon_path;
    }

    public void setUser(UserEntity user) {
        this.user = user;
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

    public Boolean getIs_default() {
        return is_default;
    }

    public String getIcon_path() {
        return icon_path;
    }

    public UserEntity getUser() {
        return user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CategoryEntity that = (CategoryEntity) o;
        return categoryID == that.categoryID;
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryID);
    }
}