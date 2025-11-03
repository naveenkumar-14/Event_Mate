package com.eventmate.Service;

import com.eventmate.Entity.User;

public interface UserService {

	User save(User user);
	User login(String userEmail,String userPassword);
}
