using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Security;

public class UserAccessor(IHttpContextAccessor httpContextAccessor) : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;

    public string GetUsername() =>
        _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
    
    public string GetUserId() =>
         _httpContextAccessor.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);

}
