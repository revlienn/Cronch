using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FatsecretController : ControllerBase
    {
        private readonly IFatsecretService _fatsecretService;

        public FatsecretController(IFatsecretService fatsecretService)
        {
            _fatsecretService = fatsecretService;
        }

        [HttpGet("token")]
        public async Task<IActionResult> GetToken()
        {
            var tokenJson = await _fatsecretService.GetTokenAsync();
            return Content(tokenJson, "application/json");
        }
    }
}