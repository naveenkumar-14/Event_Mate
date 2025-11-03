package com.eventmate.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer eventId;
	private String eventName;
	private String eventType;
	private String eventDescription;
	private LocalDate eventDate;
	private LocalTime eventTime;
	private Integer eventDuration;
	private Double eventBudget;
	private String eventDecoration;
	private String eventFood;
	private String eventNotes;
	@ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;  
	
	@ManyToOne
	 @JoinColumn(name = "music_system_id")
    private MusicSystem musicSystem; 
	
	@ManyToOne
    @JoinColumn(name = "photographer_id")
    private Photographer photographer;
}
