using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Messages;

public class Clear
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid ChatGroupId { get; set; }
    }

    public class Handler(DataContext context, ICacheService cache, ILogger<Handler> logger) : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context = context;
        private readonly ICacheService _cache = cache;
        private readonly ILogger<Handler> _logger = logger;

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var chatGroup = await _context.ChatGroups
                .Include(g => g.Messages)
                .FirstOrDefaultAsync(g => g.Id == request.ChatGroupId);

            if (chatGroup is null) return null;

            _context.Messages.RemoveRange(chatGroup.Messages);
            await _cache.RemoveAsync($"chat_{chatGroup.Id}_msg_cache");
            _logger.LogInformation("Messages cleared");
            var success = await _context.SaveChangesAsync() > 0;

            return success
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Error with clearing messages");
        }
    }

}
