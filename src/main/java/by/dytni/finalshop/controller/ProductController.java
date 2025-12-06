    package by.dytni.finalshop.controller;


    import by.dytni.finalshop.domain.product.Product;
    import by.dytni.finalshop.service.ProductService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.security.access.prepost.PreAuthorize;

    import org.springframework.stereotype.Controller;
    import org.springframework.ui.Model;
    import org.springframework.web.bind.annotation.*;

    @Controller
    @RequiredArgsConstructor
//    @RestController
    public class ProductController {
        private final ProductService productService;

        @GetMapping("/products")
        public String products(@RequestParam(name = "name", required = false)String name,
                              @RequestParam(name = "sort", required = false)String sort,
                              Model model) {
            model.addAttribute("products", productService.getProducts(name, sort));
            model.addAttribute("currentName", name != null ? name : "");
            model.addAttribute("currentSort", sort != null ? sort : "");
            return "products";
        }

        /*@GetMapping("/products/type/{type}")
        public String productsByType(@PathVariable String type, Model model) {
            model.addAttribute("products", productService.getAllProductsOfType(type));
            model.addAttribute("newProduct", new Product());
            return "products";
        }*/

        @GetMapping("/products/add")
        public String addProduct(@RequestParam(name = "sort", required = false)String sort, Model model) {
            model.addAttribute("products", productService.getProducts(null, sort));
            model.addAttribute("currentSort", sort != null ? sort : "");
            return "addproduct";
        }
        @PostMapping("/products/create")
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        public String saveProduct(@ModelAttribute Product product) {
            productService.saveProduct(product);
            return "redirect:/products/add";
        }

        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        @PostMapping("/products/delete/{id}")
        public String deleteProduct(@PathVariable Integer id) {
            productService.deleteProductById(id);
            return "redirect:/products/add";
        }
        
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        @GetMapping("/products/edit/{id}")
        public String editProduct(@PathVariable Integer id, Model model) {
            Product product = productService.getProductById(id);
            if (product == null) {
                return "redirect:/products/add";
            }
            model.addAttribute("product", product);
            return "editproduct";
        }
        
        @PreAuthorize("hasAuthority('ROLE_ADMIN')")
        @PostMapping("/products/update/{id}")
        public String updateProduct(@PathVariable Integer id, @ModelAttribute Product product) {
            productService.updateProduct(id, product);
            return "redirect:/products/add";
        }
        
        @GetMapping("/products/info/{id}")
        public String viewProduct(@PathVariable Integer id, Model model) {
            Product product = productService.getProductById(id);
            model.addAttribute("product", product);
            return "productInfo";
        }
    }
