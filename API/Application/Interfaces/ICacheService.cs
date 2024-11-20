using Microsoft.Extensions.Caching.Distributed;

namespace Application.Interfaces;

public interface ICacheService
{
    Task SetAsync<T>(string key, T value);
    Task<T> GetAsync<T>(string key);
    Task RemoveAsync(string key);
    Task<List<string>> GetKeysAsync();
}
