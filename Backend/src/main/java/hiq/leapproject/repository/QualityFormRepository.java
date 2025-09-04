package hiq.leapproject.repository;

import hiq.leapproject.model.QualityForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface QualityFormRepository extends JpaRepository<QualityForm, Long> {

    // Sök baserat på kund
    List<QualityForm> findByCustomer(String customer);

    // Sök baserat på konsult
    List<QualityForm> findByConsultant(String consultant);

    // Sök baserat på säljare
    List<QualityForm> findBySeller(String seller);

    // Sök baserat på datum
    List<QualityForm> findByDate(LocalDate date);

    // Sortera alla formulär baserat på datum (stigande)
    List<QualityForm> findAllByOrderByDateAsc();

    // Sortera alla formulär baserat på datum (fallande)
    List<QualityForm> findAllByOrderByDateDesc();

    // Sök med delsträng (t.ex. namn innehåller)
    List<QualityForm> findByCustomerContainingIgnoreCase(String customer);

    List<QualityForm> findByConsultantContainingIgnoreCase(String consultant);

    List<QualityForm> findBySellerContainingIgnoreCase(String seller);
}
