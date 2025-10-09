using API.DTOs;

namespace API.Interfaces
{
    public interface IFatsecretRepository
    {
        Task<string> GetTokenAsync();
        Task<FoodDto> GetFoodByIdAsync(long foodId);
        Task<FoodSearchResponseDto> SearchFoodAsync(string searchTerm, int pageNumber=0, int maxResults=20);
 
    }
}