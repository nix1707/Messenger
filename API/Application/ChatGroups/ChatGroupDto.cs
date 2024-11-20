using Application.Messages;

namespace Application.ChatGroups;

public class ChatGroupDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public string AdminUsername { get; set; }
    public Domain.Media Image { get; set; }
    public MessageDto LastMessage { get; set; }


    public ICollection<GroupMemberDto> Members { get; set; } = [];
}
