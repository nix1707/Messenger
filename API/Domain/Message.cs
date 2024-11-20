namespace Domain;

public class Message
{
    public Guid Id { get; set; }
    public string Body { get; set; }
    public AppUser Sender { get; set; }
    public ChatGroup ChatGroup { get; set; }
    public Media Media { get; set; }
    public DateTime CreatedAt { get; set; }
}
