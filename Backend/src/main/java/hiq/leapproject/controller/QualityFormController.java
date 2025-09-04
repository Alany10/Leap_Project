package hiq.leapproject.controller;

import hiq.leapproject.exception.QualityFormNotFoundException;
import hiq.leapproject.exception.QualityFormValidationException;
import hiq.leapproject.model.QualityForm;
import hiq.leapproject.service.QualityFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/qualityFollowUp")
public class QualityFormController {

    private final QualityFormService service;

    @Autowired
    public QualityFormController(QualityFormService service) {
        this.service = service;
    }

    // Hämta alla formulär
    @GetMapping
    public List<QualityForm> getAllForms() {
        return service.getAllForms();
    }

    // Hämta formulär baserat på ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getFormById(@PathVariable Long id) {
        try {
            QualityForm form = service.getFormById(id);
            return ResponseEntity.ok(form);
        } catch (QualityFormNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    // Hämta formulär baserat på kund
    @GetMapping("/search/customer")
    public List<QualityForm> getFormsByCustomer(@RequestParam String customer) {
        return service.getFormsByCustomer(customer);
    }

    // Hämta formulär baserat på konsult
    @GetMapping("/search/consultant")
    public List<QualityForm> getFormsByConsultant(@RequestParam String consultant) {
        return service.getFormsByConsultant(consultant);
    }

    // Hämta formulär baserat på säljare
    @GetMapping("/search/seller")
    public List<QualityForm> getFormsBySeller(@RequestParam String seller) {
        return service.getFormsBySeller(seller);
    }

    // Hämta formulär sorterat på datum (stigande)
    @GetMapping("/sort/date/asc")
    public List<QualityForm> getFormsSortedByDateAsc() {
        return service.getAllFormsSortedByDateAsc();
    }

    // Hämta formulär sorterat på datum (fallande)
    @GetMapping("/sort/date/desc")
    public List<QualityForm> getFormsSortedByDateDesc() {
        return service.getAllFormsSortedByDateDesc();
    }

    // Skapa nytt formulär
    @PostMapping
    public ResponseEntity<?> createForm(@RequestBody QualityForm form) {
        try {
            QualityForm savedForm = service.createForm(form);
            return ResponseEntity
                    .created(URI.create("/qualityFollowUp/" + savedForm.getId()))
                    .body(savedForm);
        } catch (QualityFormValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Uppdatera ett formulär
    @PutMapping("/{id}")
    public ResponseEntity<?> updateForm(@PathVariable Long id, @RequestBody QualityForm form) {
        try {
            QualityForm updatedForm = service.updateForm(id, form);
            return ResponseEntity.ok(updatedForm);
        } catch (QualityFormNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (QualityFormValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Radera ett formulär baserat på ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteForm(@PathVariable Long id) {
        try {
            service.deleteForm(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (QualityFormNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage()); // 404 Not Found
        }
    }

}
