package com.mayank.CampusCloudUniversityCampusSystem.service;

import com.mayank.CampusCloudUniversityCampusSystem.model.Announcement;
import com.mayank.CampusCloudUniversityCampusSystem.repository.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    @Autowired
    AnnouncementRepo repo;

    public Announcement sendAnnouncement(Announcement announcement) {

        repo.deleteAll();
        return repo.save(announcement);
    }

    public Announcement getCurrentAnnouncement() {

        return repo.findFirstByOrderByIdAsc().orElse(null);
    }
}
