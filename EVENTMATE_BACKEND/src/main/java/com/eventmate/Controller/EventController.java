package com.eventmate.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/event")
public class EventController {

	@GetMapping("/count")
	public Integer getEventsCount() {
		return 100;//sample
	}
	@GetMapping("/upcomingcount")
	public Integer getUpcomingEventsCount() {
		return 87;//sample
	}
	@GetMapping("/all")
    public List<Map<String, Object>> getAllBookings() {
        List<Map<String, Object>> bookings = new ArrayList<>();

        bookings.add(Map.of(
            "id", 1,
            "hall", "Grand Palace Hall",
            "bookedBy", "Alice Johnson",
            "date", "2025-12-15"
        ));
        bookings.add(Map.of(
            "id", 2,
            "hall", "Sunset Banquet",
            "bookedBy", "Bob Williams",
            "date", "2025-11-10"
        ));
        bookings.add(Map.of(
            "id", 3,
            "hall", "Grand Palace Hall",
            "bookedBy", "Charlie Brown",
            "date", "2025-12-15"
        ));

        return bookings;
    }

}
