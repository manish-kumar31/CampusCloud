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

    // Existing method (unchanged)
    public Optional<User> verifyTokenAndGetUser(String idToken) throws Exception {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            return userRepository.findByFirebaseUid(uid);
        } catch (Exception e) {
            throw new Exception("Invalid Firebase ID token");
        }
    }

    /**
     * NEW METHOD: Verifies token AND checks if the user has access to the requested resource.
     * @param idToken Firebase JWT token
     * @param requestedUserId The user ID the client is trying to access
     * @throws Exception If token is invalid or access is denied
     */
    public void verifyTokenAndCheckAccess(String idToken, String requestedUserId) throws Exception {
        try {
            // 1. Verify token and decode
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String tokenUserId = decodedToken.getUid(); // Firebase UID from token

            // 2. Fetch user from DB using Firebase UID
            User user = userRepository.findByFirebaseUid(tokenUserId)
                    .orElseThrow(() -> new Exception("User not found in database"));

            // 3. Check if the token's user matches the requested user ID
            // (Assuming your User entity has getId() returning the MySQL user ID)
            if (!user.getId().equals(requestedUserId)) {
                throw new Exception("Access denied: You can only access your own data");
            }

            // 4. (Optional) Add role-based checks here if needed
            // e.g., Admins can access any user's data:
            // if (!user.getRole().equals("admin") && !user.getId().equals(requestedUserId)) { ... }

        } catch (Exception e) {
            throw new Exception("Access verification failed: " + e.getMessage());
        }
    }
}