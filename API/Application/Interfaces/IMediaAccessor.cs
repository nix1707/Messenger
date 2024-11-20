using Application.Media;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IMediaAccessor
{
    Task<MediaUploadResult> UploadMedia(IFormFile file, MediaType mediaType);
    Task<string> DeleteMedia(string publicId);
}
