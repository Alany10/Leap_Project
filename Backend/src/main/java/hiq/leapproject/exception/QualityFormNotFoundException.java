package hiq.leapproject.exception;

public class QualityFormNotFoundException extends RuntimeException {

    public QualityFormNotFoundException(Long id) {
        super("QualityForm with ID " + id + " not found");
    }
}
