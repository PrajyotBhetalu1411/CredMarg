package com.example.CragMargAssignment.controller;

import com.example.CragMargAssignment.entity.Vendor;
import com.example.CragMargAssignment.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@CrossOrigin("*")
public class VendorController {
    @Autowired
    private VendorService vendorService;

    @PostMapping
    public ResponseEntity<Vendor> createVendor(@RequestBody Vendor vendor) {
        Vendor createdVendor = vendorService.createVendor(vendor);
        return new ResponseEntity<>(createdVendor, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Vendor>> getAllVendors() {
        List<Vendor> vendors = vendorService.getAllVendors();
        return new ResponseEntity<>(vendors, HttpStatus.OK);
    }

    @PostMapping("/send-emails")
    public ResponseEntity<Void> sendEmailsToVendors(@RequestBody List<Vendor> vendors) {
        vendorService.sendEmailToVendors(vendors);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}