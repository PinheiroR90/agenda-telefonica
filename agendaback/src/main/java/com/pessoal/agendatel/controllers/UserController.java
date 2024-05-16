package com.pessoal.agendatel.controllers;

import com.pessoal.agendatel.dto.UserDTO;
import com.pessoal.agendatel.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;
    //@CrossOrigin
    @GetMapping
    public ResponseEntity<Page<UserDTO>> getAllUsers(Pageable pageable){
        Page<UserDTO> userDTOS = userService.getAllUser(pageable);
        return ResponseEntity.ok(userDTOS);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getByIdUsers(@PathVariable Long id){
        UserDTO dto = userService.getByIdUser(id);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUserDto(@RequestBody UserDTO dto) {
        dto = userService.createUser(dto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(dto.getId()).toUri();
        return ResponseEntity.created(uri).body(dto);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO dto){
        dto = userService.updateUser(id,dto);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
