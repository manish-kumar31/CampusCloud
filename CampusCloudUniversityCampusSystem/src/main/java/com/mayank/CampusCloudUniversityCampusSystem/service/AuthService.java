package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.mayank.CampusCloudUniversityCampusSystem.model.User;
import com.mayank.CampusCloudUniversityCampusSystem.repository.UserRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepo userRepository;

    public AuthService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> verifyTokenAndGetUser(String idToken) throws Exception {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            return userRepository.findByFirebaseUid(uid);
        } catch (Exception e) {
            throw new Exception("Invalid Firebase ID token");
        }
    }
}