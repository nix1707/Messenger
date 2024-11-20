namespace Application.Messages;

public class MessageDto
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string Body { get; set; }
    public string Username { get; set; }
#nullable enable
    public Domain.Media? Media { get; set; }
#nullable disable
}
