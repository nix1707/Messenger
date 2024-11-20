using System.ComponentModel.DataAnnotations;


namespace Domain.Validation;

public class MediaTypeAllowedAttribute(params MediaType[] allowed) : ValidationAttribute
{
    private readonly MediaType[] _allowed = allowed;

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null) return ValidationResult.Success;
        
        if (value is Media media)
        {
            return _allowed.Contains(media.Type)
                ? ValidationResult.Success
                : new ValidationResult($"Media type '{media.Type}' is not allowed. Allowed types are: {string.Join(", ", _allowed)}.");
        }

        return new ValidationResult("Invalid media object.");
    }
}
