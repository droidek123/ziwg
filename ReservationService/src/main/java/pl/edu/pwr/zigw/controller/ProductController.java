package pl.edu.pwr.zigw.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.edu.pwr.zigw.model.Movie;
import pl.edu.pwr.zigw.model.Product;
import pl.edu.pwr.zigw.service.ProductService;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final Path uploadDir = Paths.get("product_uploads");

    {
        try {
            Files.createDirectories(uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Nie udało się utworzyć katalogu product_uploads", e);
        }
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PostMapping("/{id}/upload-image")
    @Operation(summary = "Upload product image", description = "Upload image file and assign it to the product")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Product product = productService.findById(id);
            if (product == null) return ResponseEntity.notFound().build();

            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            file.transferTo(filePath);

            product.setImageFilename(filename);
            productService.save(product);

            return ResponseEntity.ok("Image uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while uploading image.");
        }
    }

    @GetMapping("/{id}/image")
    @Operation(summary = "Get product image", description = "Returns the product image file")
    public ResponseEntity<Resource> getImage(@PathVariable Long id) throws MalformedURLException {
        Product product = productService.findById(id);
        if (product == null || product.getImageFilename() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = uploadDir.resolve(product.getImageFilename());
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + product.getImageFilename() + "\"")
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @DeleteMapping("/{id}/image")
    @Operation(summary = "Delete product image", description = "Deletes the image file and clears the reference")
    public ResponseEntity<String> deleteImage(@PathVariable Long id) {
        Product product = productService.findById(id);
        if (product == null || product.getImageFilename() == null) {
            return ResponseEntity.notFound().build();
        }

        Path filePath = uploadDir.resolve(product.getImageFilename());

        try {
            Files.deleteIfExists(filePath);
            product.setImageFilename(null);
            productService.save(product);
            return ResponseEntity.ok("Image deleted.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Could not delete image.");
        }
    }
}
