using Application.ChatGroups;
using Domain;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class GroupsController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> CreateGroup([FromBody] ChatGroup chatGroup)
    {
        return HandleResult(await Mediator.Send(new Create.Command { ChatGroup = chatGroup }));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChatGroupById(Guid id)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }


    [HttpGet]
    public async Task<IActionResult> GetGroups([FromQuery] bool joinedOnly = false)
    {
        return HandleResult(await Mediator.Send(new List.Query { JoinedOnly = joinedOnly }));
    }

    [HttpPost("{id}/join")]
    public async Task<IActionResult> Attend(Guid id)
    {
        return HandleResult(await Mediator.Send(new UpdateMembership.Command { Id = id }));
    }
}
