package com.mayank.CampusCloudUniversityCampusSystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class QRCode {

    @Id
    private long id;

    private String randomId;
    private long timeStampsInSeconds;

}
