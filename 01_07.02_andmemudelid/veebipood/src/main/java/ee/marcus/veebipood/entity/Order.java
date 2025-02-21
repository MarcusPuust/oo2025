package ee.marcus.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.cache.spi.support.AbstractReadWriteAccess;

import java.util.Date;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders") //andmebaasis tuleb tabeli nimi "orders"
public class Order { //PSQLException: ERROR: syntax error at or near "order"
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created; // date importida --> java.util.date

    @ManyToOne // Personil võib olla mitu tellimust
    private Person person;

    @ManyToMany
    private List<Product> products; // List importida --> java.uti.list

    private double totalSum;
}
