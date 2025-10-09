using API.DTOs;

namespace API.Interfaces
{
    public interface IFatsecretRepository
    {
        Task<string> GetTokenAsync();
        Task<FoodDto> GetFoodByIdAsync(long foodId);

    }
}