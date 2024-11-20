namespace Domain;

public enum MediaType
{
    Image,
    Video,
    Audio,
}

public class Media
{
    public string Id { get; set; }
    public MediaType Type { get; set; }
    public string Url { get; set; }
}
