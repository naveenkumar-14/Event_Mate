package com.eventmate.Service;

import java.util.List;

import com.eventmate.Entity.Event;

public interface EventService {

	public Event save(Event event);
	List<Event> getEventsByUserId(Integer id);
}
