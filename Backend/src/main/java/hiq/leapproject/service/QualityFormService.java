package hiq.leapproject.service;

import hiq.leapproject.exception.QualityFormNotFoundException;
import hiq.leapproject.exception.QualityFormValidationException;
import hiq.leapproject.model.QualityForm;
import hiq.leapproject.repository.QualityFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class QualityFormService {

    private final QualityFormRepository repository;

    @Autowired
    public QualityFormService(QualityFormRepository repository) {
        this.repository = repository;
    }

    // Hämta alla formulär
    public List<QualityForm> getAllForms() {
        return repository.findAll();
    }

    // Hämta ett formulär baserat på ID
    public QualityForm getFormById(Long id) throws QualityFormNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new QualityFormNotFoundException(id));
    }

    // Hämta formulär baserat på kund
    public List<QualityForm> getFormsByCustomer(String customer) {
        return repository.findByCustomerContainingIgnoreCase(customer);
    }

    // Hämta formulär baserat på konsult
    public List<QualityForm> getFormsByConsultant(String consultant) {
        return repository.findByConsultantContainingIgnoreCase(consultant);
    }

    // Hämta formulär baserat på säljare
    public List<QualityForm> getFormsBySeller(String seller) {
        return repository.findBySellerContainingIgnoreCase(seller);
    }

    // Hämta formulär sorterat på datum
    public List<QualityForm> getAllFormsSortedByDateAsc() {
        return repository.findAllByOrderByDateAsc();
    }

    public List<QualityForm> getAllFormsSortedByDateDesc() {
        return repository.findAllByOrderByDateDesc();
    }

    // Skapa eller uppdatera ett formulär
    public QualityForm createForm(QualityForm form) throws QualityFormValidationException {
        validateForm(form); // validering av QualityForm
        return repository.save(form);
    }

    // Skapa eller uppdatera ett formulär
    public QualityForm updateForm(Long id, QualityForm form) throws QualityFormNotFoundException, QualityFormValidationException {
        form.setId(id); // Säkerställ att det är samma id i den uppdaterade formen
        if (!repository.existsById(id)) throw new QualityFormNotFoundException(id);

        validateForm(form); // validering av QualityForm
        return repository.save(form);
    }

    // Radera ett formulär baserat på ID
    public void deleteForm(Long id) throws QualityFormNotFoundException{
        if (!repository.existsById(id)) throw new QualityFormNotFoundException(id);

        repository.deleteById(id);
    }

    // Hjälpmetod för validering av form
    private void validateForm(QualityForm form) throws QualityFormValidationException {
        // String
        String[][] stringFields = {
                {form.getCustomer(), "Customer"},
                {form.getConsultant(), "Consultant"},
                {form.getSeller(), "Seller"},
                {form.getStartup(), "Startup"},
                {form.getResult(), "Result"},
                {form.getResponsibility(), "Responsibility"},
                {form.getSimplicity(), "Simplicity"},
                {form.getJoy(), "Joy"},
                {form.getInnovation(), "Innovation"},
                {form.getImprovements(), "Improvements"},
                {form.getValueAssessmentPositive(), "ValueAssessmentPositive"},
                {form.getValueAssessmentNegative(), "ValueAssessmentNegative"}
        };

        for (String[] field : stringFields) {
            String value = field[0];
            String name = field[1];

            // Tomma fält
            if (value == null || value.isBlank()) {
                throw new QualityFormValidationException(name + " cannot be empty");
            }

            // Längd på fält
            if (value.length() < 2 || value.length() > 100) {
                throw new QualityFormValidationException(name + " must be between 2 and 100 characters");
            }
        }

        // Datum
        LocalDate today = LocalDate.now();

        if (form.getDate() == null) throw new QualityFormValidationException("Date cannot be empty");
        if (form.getDate().isAfter(today)) throw new QualityFormValidationException("Date cannot be in the future");

        if (form.getConsultantInformedDate() == null) throw new QualityFormValidationException("ConsultantInformedDate cannot be empty");
        if (form.getConsultantInformedDate().isAfter(today)) throw new QualityFormValidationException("ConsultantInformedDate cannot be in the future");
        if (form.getConsultantInformedDate().isBefore(form.getDate())) throw new QualityFormValidationException("ConsultantInformedDate must be after or equal to Date");

        if (form.getNextFollowUp() == null) throw new QualityFormValidationException("NextFollowUp cannot be empty");
        if (form.getNextFollowUp().isBefore(form.getDate()) || form.getNextFollowUp().isBefore(form.getConsultantInformedDate()))
            throw new QualityFormValidationException("NextFollowUp must be after Date and ConsultantInformedDate");

        // Integer
        if (form.getSatisfactionConsult() == null) throw new QualityFormValidationException("SatisfactionConsult cannot be empty");
        if (form.getSatisfactionConsult() < 1 || form.getSatisfactionConsult() > 10) throw new QualityFormValidationException("SatisfactionConsult must be between 1 and 10");

        if (form.getSatisfactionCompany() == null) throw new QualityFormValidationException("SatisfactionCompany cannot be empty");
        if (form.getSatisfactionCompany() < 1 || form.getSatisfactionCompany() > 10) throw new QualityFormValidationException("SatisfactionCompany must be between 1 and 10");
    }


}
