using Microsoft.AspNetCore.Mvc;
using Application.Messages;

namespace API.Controllers;

public class MessagesController(ILogger<MessagesController> logger) : BaseApiController
{
    private readonly ILogger<MessagesController> _logger = logger;

    [HttpGet("chatGroup/{id}")]
    public async Task<IActionResult> GetMessages(Guid id)
    {
        _logger.LogInformation("Accessed to the api end point");
        return HandleResult(await Mediator.Send(new List.Query { ChatGroupId = id }));
    }

    [HttpDelete("chatGroup/{id}")]
    public async Task<IActionResult> Clear(Guid id)
    {
        return HandleResult(await Mediator.Send(new Clear.Command { ChatGroupId = id }));
    }
}
