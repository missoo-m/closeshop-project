package by.dytni.finalshop.service;

import by.dytni.finalshop.domain.product.Product;
import by.dytni.finalshop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.Collator;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {
    private final ProductRepository productRepository;
    private final Collator russianCollator = Collator.getInstance(Locale.forLanguageTag("ru-RU"));

    public List<Product> getProducts(String name, String sortBy) {
        boolean hasSearch = name != null && !name.isEmpty();
        List<Product> products;
        
        // Получаем продукты
        if (hasSearch) {
            products = productRepository.findByNameContainingIgnoreCase(name);
        } else {
            products = productRepository.findAll();
        }
        
        // Применяем сортировку
        if (sortBy != null && !sortBy.isEmpty()) {
            switch (sortBy) {
                case "name_asc":
                    products = products.stream()
                            .sorted(Comparator.comparing(Product::getName, russianCollator))
                            .collect(Collectors.toList());
                    break;
                case "name_desc":
                    products = products.stream()
                            .sorted(Comparator.comparing(Product::getName, russianCollator).reversed())
                            .collect(Collectors.toList());
                    break;
                case "price_asc":
                    products = products.stream()
                            .sorted(Comparator.comparing(Product::getCoast))
                            .collect(Collectors.toList());
                    break;
                case "price_desc":
                    products = products.stream()
                            .sorted(Comparator.comparing(Product::getCoast).reversed())
                            .collect(Collectors.toList());
                    break;
            }
        }
        
        return products;
    }

    public Product getProductById(Integer id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);
    }

    List<Product> getAllProductsOfType(String type) {
        return productRepository.findByType(type);
    }

    public void saveProduct(Product product) {
        log.info("Saving new {}", product);
        productRepository.save(product);
    }

    public void deleteProductById(Integer id) {
        log.info("Delete product {}", id);
        productRepository.deleteById(id);
    }

    public void updateProduct(Integer id, Product updatedProduct) {
        log.info("Updating product {}", id);
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setType(updatedProduct.getType());
        existingProduct.setCoast(updatedProduct.getCoast());
        existingProduct.setSize(updatedProduct.getSize());
        
        productRepository.save(existingProduct);
        log.info("Product {} updated successfully", id);
    }


}
