package com.mayank.CampusCloudUniversityCampusSystem.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.mayank.CampusCloudUniversityCampusSystem.model.QRCode;
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class FacultyController {

    @Autowired
    private QRCode qrCode;

    @GetMapping("/generate-qr")
    public ResponseEntity<byte[]> generateQR(@RequestParam String course) throws WriterException, IOException {

        long timestampInSeconds = Instant.now().getEpochSecond();
        String randomId = UUID.randomUUID().toString().substring(0, 6);

        String qrData = String.format("%d_%s_%s",timestampInSeconds, randomId,course);

        qrCode.setRandomId(randomId);
        qrCode.setTimeStampsInSeconds(timestampInSeconds);

        QRCodeWriter writer = new QRCodeWriter();
        BitMatrix matrix = writer.encode(qrData, BarcodeFormat.QR_CODE, 200, 200);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(matrix, "PNG", out);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(out.toByteArray());
    }


}
