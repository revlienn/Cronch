using System.Net.Http.Headers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Web;
using API.DTOs;
using API.Interfaces;

namespace API.Services
{
    public class FatsecretService : IFatsecretRepository
    {
        private readonly HttpClient _http;
        private readonly string _clientId = string.Empty;
        private readonly string _clientSecret = string.Empty;
        private string? _cachedToken;
        private DateTime _tokenExpiry;

        public FatsecretService(IConfiguration config, HttpClient http)
        {
            _clientId = config["FatSecret:ClientId"] ?? string.Empty;
            _clientSecret = config["FatSecret:ClientSecret"] ?? string.Empty;
            _http = http;
        }
        public async Task<string> GetTokenAsync()
        {
            var credentials = Convert.ToBase64String(
                Encoding.ASCII.GetBytes($"{_clientId}:{_clientSecret}")
            );

            var request = new HttpRequestMessage(HttpMethod.Post, "https://oauth.fatsecret.com/connect/token");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            request.Content = new FormUrlEncodedContent(new Dictionary<string, string>
            {
                 { "grant_type", "client_credentials" },
                { "scope", "basic" }
            });

            var response = await _http.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsStringAsync();

        }

        public async Task<string> GetAccessTokenAsync()
      {
        if(!string.IsNullOrEmpty(_cachedToken) && DateTime.UtcNow < _tokenExpiry)
         {
                return _cachedToken;
         }
            var tokenResponse = await GetTokenAsync();
            using var jsonDoc = JsonDocument.Parse(tokenResponse);
            var root = jsonDoc.RootElement;

            var token = root.GetProperty("access_token").GetString();
            var expiresIn = root.TryGetProperty("expires_in", out var expProp) ? expProp.GetInt32()
                : 86400;

            if (string.IsNullOrEmpty(token))
            {
                throw new InvalidOperationException("Unable to retrieve token");
            }

            _cachedToken = token;
            _tokenExpiry = DateTime.UtcNow.AddSeconds(expiresIn - 60);

            return _cachedToken;
      }

        public async Task<FoodDto> GetFoodByIdAsync(long foodId)
        {
            var token = await GetAccessTokenAsync();

            var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"https://platform.fatsecret.com/rest/food/v4?method=food.get.v4&food_id={foodId}&format=json"
                );
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _http.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonRes = await response.Content.ReadAsStringAsync();
            using var foodJson = JsonDocument.Parse(jsonRes);
            var foodEl = foodJson.RootElement.GetProperty("food");

            var food = JsonSerializer.Deserialize<FoodDto>(
                foodEl.GetRawText(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            )!;

            return food;

        }

        public async Task<FoodSearchResponseDto> SearchFoodAsync(string searchTerm,int pageNumber=0, int maxResults=20)
        {
            var token = await GetAccessTokenAsync();

            var encodedQuery = HttpUtility.UrlEncode(searchTerm);
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"https://platform.fatsecret.com/rest/foods/search/v1?search_expression={encodedQuery}&format=json");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _http.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var jsonRes = await response.Content.ReadAsStringAsync();
            var searchResult = JsonSerializer.Deserialize<FoodSearchResponseDto>(jsonRes,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
            )!;

            return searchResult;

        }
    }
}