using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ChatGroups;

public class Details
{
    public class Query : IRequest<Result<ChatGroupDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<ChatGroupDto>>
    {
        private readonly DataContext _context = context;
        private readonly IMapper _mapper = mapper;

        public async Task<Result<ChatGroupDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var chatGroup = await _context.ChatGroups
                .ProjectTo<ChatGroupDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            return Result<ChatGroupDto>.Success(chatGroup);
        }
    }
}
