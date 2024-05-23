package com.example.CragMargAssignment.service;

import com.example.CragMargAssignment.entity.Vendor;
import com.example.CragMargAssignment.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorService {
    @Autowired
    private VendorRepository vendorRepository;

    public Vendor createVendor(Vendor vendor) {

        return vendorRepository.save(vendor);
    }

    public List<Vendor> getAllVendors() {

        return vendorRepository.findAll();
    }

    public void sendEmailToVendors(List<Vendor> vendors) {
        for (Vendor vendor : vendors) {
            String emailContent = String.format("Sending payments to vendor %s at upi %s", vendor.getName(), vendor.getUpi());
            System.out.println("Mock email sent: " + emailContent); // Mock email sending
        }
    }
}