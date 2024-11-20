using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ChatGroups;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public ChatGroup ChatGroup { get; set; }
    }

    public class Handler(DataContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context = context;
        private readonly IUserAccessor _userAccessor = userAccessor;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUsername());

            var chatGroupUser = new ChatGroupUser
            {
                AppUser = user,
                ChatGroup = request.ChatGroup,
                IsAdmin = true
            };

            request.ChatGroup.Members.Add(chatGroupUser);
            _context.ChatGroups.Add(request.ChatGroup);

            var success = await _context.SaveChangesAsync() > 0;

            if (success == false)
                return Result<Unit>.Failure("Error creating group");

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
