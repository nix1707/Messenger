using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;

namespace Application.Media;

public class Add
{
    public class Command : IRequest<Result<Domain.Media>>
    {
        public IFormFile File { get; set; }
    }

    public class Handler(IMediaAccessor mediaAccessor) : IRequestHandler<Command, Result<Domain.Media>>
    {
        private readonly IMediaAccessor _mediaAccessor = mediaAccessor;

        private static readonly Dictionary<string, MediaType> MediaTypeMappings = new()
        {
            { @"image/(jpeg|jpg|png|gif|bmp)", MediaType.Image },
            { @"video/(mp4|avi|mpeg|quicktime)", MediaType.Video },
            { @"audio/(mp3|wav|aac|flac)", MediaType.Audio }
        };


        public async Task<Result<Domain.Media>> Handle(Command request, CancellationToken cancellationToken)
        {
            var mediaType = DetermineMediaType(request.File);

            if (mediaType == null)
            {
                return Result<Domain.Media>.Failure("Unsupported file type");
            }

            var mediaUploadResult = await _mediaAccessor.UploadMedia(request.File, mediaType.Value);

            var media = new Domain.Media
            {
                Url = mediaUploadResult.Url,
                Id = mediaUploadResult.PublicId,
                Type = mediaType.Value
            };

            return Result<Domain.Media>.Success(media);
        }

        private static MediaType? DetermineMediaType(IFormFile file)
        {
            var contentType = file.ContentType.ToLower();

            foreach (var mapping in MediaTypeMappings)
            {
                if (Regex.IsMatch(contentType, mapping.Key))
                {
                    return mapping.Value;
                }
            }
            return null;
        }
    }
}
