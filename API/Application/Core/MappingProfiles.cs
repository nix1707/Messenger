using Application.ChatGroups;
using Application.Messages;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<ChatGroup, ChatGroup>();
        CreateMap<ChatGroup, ChatGroupDto>()
            .ForMember(d => d.AdminUsername, o => o.MapFrom(s => s.Members
                .FirstOrDefault(x => x.IsAdmin).AppUser.UserName))
            .ForMember(d => d.LastMessage, o => o.MapFrom(s => s.Messages
                .OrderByDescending(m => m.CreatedAt)
                 .FirstOrDefault()));


        CreateMap<ChatGroupUser, GroupMemberDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));

        CreateMap<Message, MessageDto>()
            .ForMember(d => d.Username, o => o.MapFrom(s => s.Sender.UserName));

        CreateMap<Messages.Create.Command, MessageDto>()
            .ForMember(d => d.Media, o => o.MapFrom(s => s.Media))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.MessageId));

        CreateMap<AppUser, Profiles.Profile>();
    }
}
