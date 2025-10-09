using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FoodBaseDto
    {
        public string food_id { get; set; } = string.Empty;
        public string food_name { get; set; } = string.Empty;
        public string food_type { get; set; } = string.Empty;
        public string food_url { get; set; } = string.Empty;
    }
}