package com.pessoal.agendatel.services;

import com.pessoal.agendatel.dto.UserDTO;
import com.pessoal.agendatel.entities.User;
import com.pessoal.agendatel.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllUser(Pageable pageable){
        Page<User> users = userRepository.findAll(pageable);
        return users.map(UserDTO::new);
    }
    @Transactional(readOnly = true)
    public UserDTO getByIdUser(Long id){
        User user = userRepository.findById(id).orElseThrow(()-> new RuntimeException("inexistente"));
        return new UserDTO(user);
    }
    @Transactional
    public UserDTO createUser(UserDTO dto){
        User user = new User();
        copyDtoForUser(dto,user);
        user = userRepository.save(user);
        return new UserDTO(user);
    }
    @Transactional
    public UserDTO updateUser(Long id,UserDTO dto){
        try{
            User user = userRepository.getReferenceById(id);
            copyDtoForUser(dto,user);
            user = userRepository.save(user);
            return new UserDTO(user);
        }catch (Exception e){
            throw new RuntimeException("error ao atualizar");
        }
    }
    @Transactional(propagation = Propagation.SUPPORTS)
    public void deleteUser(Long id){
        try{
            userRepository.deleteById(id);
        }
        catch (Exception e){
            throw new RuntimeException("Erro ao deletar");
        }
    }

    public void copyDtoForUser(UserDTO dto,User user){
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
    }


}
