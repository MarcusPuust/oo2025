package ee.marcusp.kontrolltoo1.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Conversion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conversionType;

    private String convertedValue;

    @ManyToOne
    @JoinColumn(name = "number_id")
    private Number number;

    @Column(name = "original_number", nullable = false)  // Veenduge, et see on nõutav
    private int originalNumber;

    // Getterid ja setterid
    public int getOriginalNumber() {
        return originalNumber;
    }

    public void setOriginalNumber(int originalNumber) {
        this.originalNumber = originalNumber;
    }

    public Number getNumber() {
        return number;
    }

    public void setNumber(Number number) {
        this.number = number;
    }

    // Lisage muud getterid ja setterid
}

