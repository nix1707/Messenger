using Domain;
using Domain.Validation;

namespace Application.Profiles;

public class Profile
{
    public string Username { get; set; }
    public string DisplayName { get; set; }
    public string Bio { get; set; }

    [MediaTypeAllowed(MediaType.Image)]
    public Domain.Media Image { get; set; }
}
