using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ChatGroups;

public class List
{
    public class Query : IRequest<Result<List<ChatGroupDto>>>
    {
        public bool JoinedOnly { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper, IUserAccessor accessor) : IRequestHandler<Query, Result<List<ChatGroupDto>>>
    {
        private readonly DataContext _context = context;
        private readonly IMapper _mapper = mapper;
        private readonly IUserAccessor _accessor = accessor;

        public async Task<Result<List<ChatGroupDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            IQueryable<ChatGroup> query = _context.ChatGroups;

            if (request.JoinedOnly)
            {
                var user = await _context.Users
                    .SingleOrDefaultAsync(u => u.UserName == _accessor.GetUsername(), cancellationToken);

                query = query.Where(g => g.Members.Any(m => m.AppUser.UserName == user.UserName));
            }

            var groups = await query
                .ProjectTo<ChatGroupDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result<List<ChatGroupDto>>.Success(groups);
        }
    }
}

