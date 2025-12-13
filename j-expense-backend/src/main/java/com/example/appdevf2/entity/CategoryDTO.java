package com.example.appdevf2.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDTO {
    @JsonAlias({"category_name", "categoryName"})
    private String category_name;

    @JsonAlias({"category_type", "categoryType"})
    private String category_type;

    @JsonAlias({"is_default", "isDefault"})
    private Boolean is_default;

    @JsonAlias({"iconPath", "icon_path"})
    private String iconPath;

    @JsonAlias({"userID", "userId", "user_id"})
    private Integer userID; // user id to associate with category
}
