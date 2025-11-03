package com.eventmate.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.User;
import com.eventmate.Service.UserService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/save")
	public String save(@RequestBody User user) {
		userService.save(user);
		return "user saved ";
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user, HttpSession session) {
        User validUser = userService.login(user.getUserEmail(), user.getUserPassword());
        if (validUser != null) {
            session.setAttribute("activeUser", validUser);
            return ResponseEntity.ok("Login Successful!");
        }
        return ResponseEntity.status(401).body("Invalid Credentials!");
    }
	  @GetMapping("/getsession")
	    public ResponseEntity<?> getSession(HttpSession session) {
	        User activeUser = (User)session.getAttribute("activeUser");
	        if (activeUser == null) {
	            return ResponseEntity.status(401).body("No active session");
	        }
	        return ResponseEntity.ok(activeUser);
	    }

	  @GetMapping("/logout")
	    public ResponseEntity<String> logout(HttpSession session) {
	        session.invalidate();
	        System.out.println("User logged out");
	        return ResponseEntity.ok("Logged out successfully");
	    }
	
	@GetMapping("/count")
	public Integer getUsersCount() {
		return 450;//sample checking
	}
	 @GetMapping("/all")
	    public List<Map<String, Object>> getAllUsers() {
	        List<Map<String, Object>> users = new ArrayList<>();

	        users.add(Map.of(
	            "id", 1,
	            "name", "Alice Johnson",
	            "email", "alice@mail.com",
	            "status", "active"
	        ));

	        users.add(Map.of(
	            "id", 2,
	            "name", "Bob Smith",
	            "email", "bob@mail.com",
	            "status", "blocked"
	        ));

	        users.add(Map.of(
	            "id", 3,
	            "name", "Charlie Kumar",
	            "email", "charlie@mail.com",
	            "status", "active"
	        ));

	        return users;
	    }
}
