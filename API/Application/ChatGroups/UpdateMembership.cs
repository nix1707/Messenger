using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ChatGroups;

public class UpdateMembership
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context, IUserAccessor accessor) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context = context;
        private readonly IUserAccessor _accessor = accessor;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var chatGroup = await _context.ChatGroups
                 .Include(m => m.Members)
                 .ThenInclude(u => u.AppUser)
                 .SingleOrDefaultAsync(x => x.Id == request.Id);

            if (chatGroup is null) return null;

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName == _accessor.GetUsername());

            if (user is null) return null;

            var membership = chatGroup.Members.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

            if (membership is not null)
                chatGroup.Members.Remove(membership);

            if (membership is null)
            {
                membership = new ChatGroupUser()
                {
                    AppUser = user,
                    ChatGroup = chatGroup,
                    IsAdmin = false
                };
                chatGroup.Members.Add(membership);
            }

            var result = await _context.SaveChangesAsync() > 0;

            return result
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Problem updating membership");
        }
    }
}
