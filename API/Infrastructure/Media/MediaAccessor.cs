using Application.Interfaces;
using Application.Media;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Domain;

namespace Infrastructure.Media;

public class MediaAccessor : IMediaAccessor
{
    private readonly Cloudinary _cloudinary;

    public MediaAccessor(IOptions<CloudinarySettings> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );

        _cloudinary = new Cloudinary(account);
    }

    public async Task<MediaUploadResult> UploadMedia(IFormFile file, MediaType mediaType)
    {
        if (file.Length > 0)
        {
            await using var stream = file.OpenReadStream();
            UploadResult uploadResult = null;

            switch (mediaType)
            {
                case MediaType.Image:
                    var imageUploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };
                    uploadResult = await _cloudinary.UploadAsync(imageUploadParams);
                    break;

                case MediaType.Video:
                    var videoUploadParams = new VideoUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };
                    uploadResult = await _cloudinary.UploadAsync(videoUploadParams);
                    break;

                case MediaType.Audio:
                    var rawUploadParams = new RawUploadParams
                    {
                        File = new FileDescription(file.FileName, stream)
                    };
                    uploadResult = await _cloudinary.UploadAsync(rawUploadParams);
                    break;

                default:
                    throw new ArgumentException("Unsupported media type");
            }

            if (uploadResult?.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);
            }

            return new MediaUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUrl.ToString()
            };
        }

        return null;
    }



    public async Task<string> DeleteMedia(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        return result.Result == "ok" ? result.Result : null;
    }
}
