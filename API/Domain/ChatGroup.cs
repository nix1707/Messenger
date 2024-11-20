using Domain.Validation;

namespace Domain;

public class ChatGroup
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }

    [MediaTypeAllowed(MediaType.Image)]
    public Media Image { get; set; }

    public DateTime CreatedAt { get; set; }
    public ICollection<ChatGroupUser> Members { get; set; } = [];
    public ICollection<Message> Messages { get; set; } = [];
}
