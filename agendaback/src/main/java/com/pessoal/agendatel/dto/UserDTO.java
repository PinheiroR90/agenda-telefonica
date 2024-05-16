package com.pessoal.agendatel.dto;

import com.pessoal.agendatel.entities.User;

public class UserDTO {
    private Long id;
    private String name;
    private String phone;

    public UserDTO(){
    }

    public UserDTO(User entity) {
        id = entity.getId();
        name = entity.getName();
        phone = entity.getPhone();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

}
