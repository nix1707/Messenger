using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages;

public class List
{
    public class Query : IRequest<Result<List<MessageDto>>>
    {
        public Guid ChatGroupId { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper, ICacheService cache) : IRequestHandler<Query, Result<List<MessageDto>>>
    {
        private readonly DataContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly ICacheService _cache = cache;

        public async Task<Result<List<MessageDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var cachedMessages = await _cache.GetAsync<List<Create.Command>>($"chat_{request.ChatGroupId}_msg_cache") ?? [];

            var cachedMessageDtos = cachedMessages
                .AsQueryable()
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .ToList();

            var messages = await _context.Messages
                .Where(g => g.ChatGroup.Id == request.ChatGroupId)
                .Include(m => m.ChatGroup)
                .ThenInclude(u => u.Members)
                .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            var allMessages = messages.Concat(cachedMessageDtos).ToList();

            return Result<List<MessageDto>>.Success(allMessages);
        }
    }
}
