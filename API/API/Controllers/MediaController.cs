using Application.Media;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class MediaController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Add([FromForm] Add.Command command)
    {
        return HandleResult(await Mediator.Send(command));
    }
}
