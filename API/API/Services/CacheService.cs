using Application.Interfaces;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace API.Services;

public class CacheService(IDistributedCache cache) : ICacheService
{
    private readonly IDistributedCache _cache = cache;

    public async Task<T> GetAsync<T>(string key)
    {
        var cacheString = await _cache.GetStringAsync(key);
       
        return cacheString is null 
            ? default
            : JsonSerializer.Deserialize<T>(cacheString);
    }

    public async Task SetAsync<T>(string key, T value)
    {
        var keys = await GetKeysAsync();
        if (keys != default)
            keys.Add(key);
        else
           keys = [key];
        
        await _cache.SetStringAsync("keys", JsonSerializer.Serialize(keys));

        var jsonData = JsonSerializer.Serialize(value);
        await _cache.SetStringAsync(key, jsonData);
    }

    public async Task RemoveAsync(string key) => await _cache.RemoveAsync(key);

    public async Task<List<string>> GetKeysAsync()
    {
        var cacheString = await _cache.GetStringAsync("keys");

        return cacheString is null
            ? default
            : JsonSerializer.Deserialize<List<string>>(cacheString);
    }
}
