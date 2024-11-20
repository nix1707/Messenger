using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Messages;

public class Create
{
    public class Command : IRequest<Result<MessageDto>>
    {
        public string Username { get; set; }
        public Guid MessageId { get; set; }
        public Guid ChatGroupId { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public Domain.Media Media { get; set; }
    }


    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x).Must(x => !string.IsNullOrEmpty(x.Body) || x.Media != null)
                .WithMessage("Either Body or Media must be provided.");

            RuleFor(x => x.Body).NotEmpty().When(x => x.Media == null)
                .WithMessage("Body cannot be empty if Media is not provided.");
        }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<MessageDto>>
    {
        private readonly IMapper _mapper = mapper;
        private readonly DataContext _context = context;

        public async Task<Result<MessageDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var chatGroup = await _context.ChatGroups.FindAsync(request.ChatGroupId);

            if (chatGroup == null) return null;

            var user = await _context.Users
                .SingleOrDefaultAsync(x => x.UserName == request.Username);

            var message = new Message
            {
                Sender = user,
                ChatGroup = chatGroup,
                Body = request.Body,
                CreatedAt = request.CreatedAt,
                Media = request.Media
            };

            chatGroup.Messages.Add(message);

            var success = await _context.SaveChangesAsync() > 0;

            if (success) return Result<MessageDto>.Success(_mapper.Map<MessageDto>(message));

            return Result<MessageDto>.Failure("Failed to add message");
        }
    }
}