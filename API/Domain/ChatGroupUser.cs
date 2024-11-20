namespace Domain;

public class ChatGroupUser
{
    public string AppUserId { get; set; }
    public Guid ChatGroupId { get; set; }
    public AppUser AppUser { get; set; }
    public ChatGroup ChatGroup { get; set; }
    public bool IsAdmin { get; set; }
}


