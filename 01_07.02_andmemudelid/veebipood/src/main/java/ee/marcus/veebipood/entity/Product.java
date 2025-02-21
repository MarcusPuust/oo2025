package ee.marcus.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//Hibernate
//Automaatselt tekib andmebaasi tabel, mis on klassi nimega

//File -->settings --> plugins --> jpa buddy --> install

// Boolean

//String

//char

//Long ->
//int--> 2.1milj
//short --> 128
//byte -> 32

//float -> . kaheksa kohta peale koma
//double -> . 16 kohta peale koma

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // int
    private String name;
    private double price;
    private String image; // .jpg
    private boolean active;

}

// public void setPrice(Double price) {
//      this.price = price;
//      System.out.printIn("Kasutaja xxx muutis hinda. ID: " + this.id);
//  }

// kui on väikse tähega:
//long
//char
//double
//boolean
//primitiivsed väärtused, ainult väärtuse hoidmiseks

//kui on suure tähega:
// Long
//String
//Character
//Double
//Boolean
//klassiväärtused, nende sees on ka funktsioonid.