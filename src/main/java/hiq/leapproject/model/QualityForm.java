package hiq.leapproject.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class QualityForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customer;
    private String consultant;
    private String seller;

    private LocalDate date;
    private LocalDate consultantInformedDate;

    private String startup;
    private String result;

    private String responsibility;
    private String simplicity;
    private String joy;
    private String innovation;

    private Integer satisfactionConsult;
    private Integer satisfactionCompany;

    private String improvements;
    private String valueAssessmentPositive;
    private String valueAssessmentNegative;

    private String other;
    private LocalDate nextFollowUp;

    public QualityForm() {}
}
