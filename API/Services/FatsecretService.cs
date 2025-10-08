using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Services
{
    public class FatsecretService : IFatsecretService
    {
        private readonly HttpClient _http;
        private readonly string _clientId=string.Empty;
        private readonly string _clientSecret=string.Empty;

        public FatsecretService(IConfiguration config, HttpClient http)
        {
            _clientId = config["FatSecret:ClientId"]?? string.Empty;
            _clientSecret = config["FatSecret:ClientSecret"]?? string.Empty;
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
    }
}