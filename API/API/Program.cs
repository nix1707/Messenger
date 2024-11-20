using API.Middleware;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;
using Application.Interfaces;
using Infrastructure.Security;
using Application.Core;
using Application.ChatGroups;
using FluentValidation.AspNetCore;
using FluentValidation;
using API.Hubs;
using Infrastructure.Media;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddCors(opt =>
{
    opt.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddSignalR();

builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddIdentityCore<AppUser>(opt =>
{
    opt.Password.RequireNonAlphanumeric = false;
    opt.User.RequireUniqueEmail = true;

})
.AddEntityFrameworkStores<DataContext>()
.AddSignInManager<SignInManager<AppUser>>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey"]));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false
        };
        opt.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];
                var path = context.HttpContext.Request.Path;
                if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                {
                    context.Token = accessToken;
                }
                return Task.CompletedTask;
            }
        };
    });

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Application.ChatGroups.Create.Handler).Assembly));
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddSingleton<ICacheService, CacheService>();
builder.Services.AddSignalR(options => { options.EnableDetailedErrors = true; });
builder.Services.AddLogging();
builder.Services.AddHostedService<CacheFlushingService>();
builder.Services.AddScoped<IMediaAccessor, MediaAccessor>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Create>();
builder.Services.AddScoped<TokenService>();
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("Cloudinary"));


var app = builder.Build();

app.MapHub<ChatHub>("/chat");
app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();
