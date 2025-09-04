package hiq.leapproject;

import hiq.leapproject.model.QualityForm;
import hiq.leapproject.repository.QualityFormRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class QualityFormControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private QualityFormRepository repository;

    @Test
    void testCreateAndFetchQualityForm() {
        // Skapa ett komplett QualityForm-objekt
        QualityForm form = new QualityForm();
        form.setCustomer("Acme AB");
        form.setConsultant("Anna");
        form.setSeller("Björn");
        form.setDate(LocalDate.now());
        form.setConsultantInformedDate(LocalDate.now().minusDays(1));
        form.setStartup("Uppstarten gick smidigt");
        form.setResult("Bra resultat");
        form.setResponsibility("Tydligt ansvar");
        form.setSimplicity("Enkelt att förstå");
        form.setJoy("Höjd motivation");
        form.setInnovation("Nya idéer implementerades");
        form.setSatisfactionConsult(8);
        form.setSatisfactionCompany(9);
        form.setImprovements("Förbättra dokumentation");
        form.setValueAssessmentPositive("Högt kundvärde");
        form.setValueAssessmentNegative("Lite lång leveranstid");
        form.setOther("Inga övriga kommentarer");
        form.setNextFollowUp(LocalDate.now().plusMonths(1));

        // Spara via repository
        repository.save(form);

        // Hämta alla från repository för att verifiera att posten sparats
        var allForms = repository.findAll();
        assertThat(allForms).isNotEmpty();
        assertThat(allForms.get(0).getCustomer()).isEqualTo("Acme AB");

        // Testa GET via controller
        ResponseEntity<String> response = restTemplate.getForEntity("/qualityForm", String.class);
        assertThat(response.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(response.getBody()).contains("Kund"); // kollar att formuläret renderas med svenska etiketter
    }
}
