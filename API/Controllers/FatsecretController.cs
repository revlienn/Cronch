using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/food")]
    public class FatsecretController : ControllerBase
    {
        private readonly IFatsecretRepository _fatsecretService;

        public FatsecretController(IFatsecretRepository fatsecretService)
        {
            _fatsecretService = fatsecretService;
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var tokenJson = await _fatsecretService.GetTokenAsync();
            return Content(tokenJson, "application/json");
        }

        [HttpGet("{foodId:long}")]
        public async Task<ActionResult<FoodDto>> GetFoodByIdAsync(long foodId)
        {
            var food = await _fatsecretService.GetFoodByIdAsync(foodId);
            return food;
        }
    }
}