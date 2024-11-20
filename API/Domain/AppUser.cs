using Domain.Validation;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; }
    public string Bio { get; set; }

    [MediaTypeAllowed(MediaType.Image)]
    public Media Image { get; set; }
    public ICollection<ChatGroupUser> ChatGroups { get; set; } = [];
    public ICollection<Message> Messages { get; set; } = [];
}
