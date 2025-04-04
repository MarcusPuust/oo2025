package ee.marcus.veebipood.repository;

import ee.marcus.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Repository tagastab ainult kas Product, List<Product>
    // on juba sissekirjutatud:
    // .findAll() --> SELECT * FROM products
    // .save() ---> INSERT values() INTO products
    // .deleteById() --> DELETE FROM products WHERE id =
    //.findById() --> SELECT product FROM products

    //List<Product> find

    Page<Product> findByCategory_Id(Long id, Pageable pageable);
}
