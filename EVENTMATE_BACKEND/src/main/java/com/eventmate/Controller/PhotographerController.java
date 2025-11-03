package com.eventmate.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventmate.Entity.Photographer;
import com.eventmate.Service.PhotographerService;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/photographer")
public class PhotographerController {

	@Autowired
	PhotographerService photographerService;
	@PostMapping("/add")
	public Photographer save(@RequestBody Photographer photographer) {
		return photographerService.save(photographer);
	}
}
