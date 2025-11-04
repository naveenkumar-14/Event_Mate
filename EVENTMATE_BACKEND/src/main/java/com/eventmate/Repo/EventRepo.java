package com.eventmate.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventmate.Entity.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer>{

}
