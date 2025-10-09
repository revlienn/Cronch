using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using API.Helpers;

namespace API.DTOs
{
    public class FoodSearchResponseDto
    {
        public FoodsDto foods { get; set; } = new();
    }

    public class FoodsDto
    {
        [JsonConverter(typeof(SingleOrArrayConverter<FoodSummaryDto>))]
        public List<FoodSummaryDto> food { get; set; } = new();
        public string max_results { get; set; } = string.Empty;
        public string page_number { get; set; } = string.Empty;
        public string total_results { get; set; } = string.Empty;
    }

    public class FoodSummaryDto : FoodBaseDto
    {
        public string? brand_name { get; set; } = string.Empty;
        public string? food_description { get; set; } = string.Empty;
    }
}