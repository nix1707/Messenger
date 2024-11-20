using Application.Interfaces;
using Application.Messages;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.Hubs;


public class ChatHub(IMediator mediator, ICacheService cacheService, IMapper mapper, ILogger<ChatHub> logger) : Hub
{
    private readonly IMediator _mediator = mediator;
    private readonly ICacheService _cache = cacheService;
    private readonly IMapper _mapper = mapper;

    public async Task SendMessage(Create.Command message)
    {
        var messages = await _cache.GetAsync<List<Create.Command>>($"chat_{message.ChatGroupId}_msg_cache") ?? [];

        messages.Add(message);
        await _cache.SetAsync($"chat_{message.ChatGroupId}_msg_cache", messages);

        await Clients
            .Group(message.ChatGroupId.ToString())
            .SendAsync("ReceiveMessage", _mapper.Map<MessageDto>(message));
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var chatGroupId = httpContext.Request.Query["chatGroupId"];
        await Groups.AddToGroupAsync(Context.ConnectionId, chatGroupId);
    }
}
