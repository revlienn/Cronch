using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class FoodDto
    {
        public string food_id { get; set; } = string.Empty;
        public string food_name { get; set; } = string.Empty;
        public string food_type { get; set; } = string.Empty;
        public string food_url { get; set; } = string.Empty;
        public ServingsDto servings { get; set; } = new();
    }

    public class ServingsDto
    {
        public List<ServingDto> serving { get; set; } = new();
    }

    public class ServingDto
    {
        public string serving_id { get; set; } = string.Empty;
        public string serving_description { get; set; } = string.Empty;
        public string serving_url { get; set; } = string.Empty;
        public string metric_serving_amount { get; set; } = string.Empty;
        public string metric_serving_unit { get; set; } = string.Empty;
        public string number_of_units { get; set; } = string.Empty;
        public string measurement_description { get; set; } = string.Empty;
        public string calories { get; set; } = string.Empty;
        public string carbohydrate { get; set; } = string.Empty;
        public string protein { get; set; } = string.Empty;
        public string fat { get; set; } = string.Empty;
        public string saturated_fat { get; set; } = string.Empty;
        public string polyunsaturated_fat { get; set; } = string.Empty;
        public string monounsaturated_fat { get; set; } = string.Empty;
        public string cholesterol { get; set; } = string.Empty;
        public string sodium { get; set; } = string.Empty;
        public string potassium { get; set; } = string.Empty;
        public string fiber { get; set; } = string.Empty;
        public string sugar { get; set; } = string.Empty;
        public string vitamin_a { get; set; } = string.Empty;
        public string vitamin_c { get; set; } = string.Empty;
        public string calcium { get; set; } = string.Empty;
        public string iron { get; set; } = string.Empty;
    }
}