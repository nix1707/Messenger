using Application.Interfaces;
using Application.Messages;
using MediatR;

namespace API.Services;

public class CacheFlushingService : BackgroundService
{
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<CacheFlushingService> _logger;
    
    private readonly TimeSpan _flushInterval = TimeSpan.FromMinutes(30);

    public CacheFlushingService(IServiceProvider serviceProvider, ILogger<CacheFlushingService> logger, IHostApplicationLifetime appLifetime)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
        appLifetime.ApplicationStopping.Register(OnApplicationStopping);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(_flushInterval, stoppingToken);
            await FlushCacheAsync();
        }
    }

    private async Task FlushCacheAsync()
    {
        using var scope = _serviceProvider.CreateScope();
        var cache = scope.ServiceProvider.GetRequiredService<ICacheService>();
        var keys = (await cache.GetKeysAsync())?.Where(k => k.Contains("_msg_cache"));

        if (keys is null || !keys.Any()) return;

        foreach (var key in keys)
        {
            using var messageScope = _serviceProvider.CreateScope();
            var mediator = messageScope.ServiceProvider.GetRequiredService<IMediator>();
            var messages = await cache.GetAsync<List<Create.Command>>(key);

            if (messages != null && messages.Count > 0)
            {
                var tasks = messages.Select(m => mediator.Send(m));
                await Task.WhenAll(tasks);
                await cache.RemoveAsync(key);
                _logger.LogInformation($"Message in the chatgroup: {key} were flushed to db");
            }
        }
    }


    private void OnApplicationStopping()
    {
        _logger.LogInformation("Application is stopping, flushing cache...");
        FlushCacheAsync().GetAwaiter().GetResult();
        _logger.LogInformation("Cache flush on shutdown complete.");
    }
}
