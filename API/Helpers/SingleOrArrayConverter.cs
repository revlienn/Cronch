using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class SingleOrArrayConverter<T> : JsonConverter<List<T>>
    {
        public override List<T> Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var result = new List<T>();
            if (reader.TokenType == JsonTokenType.StartArray)
            {
                var items = JsonSerializer.Deserialize<List<T>>(ref reader, options);
                if (items != null)
                {
                    result.AddRange(items);
                }
            }
            else
            {
                var item = JsonSerializer.Deserialize<T>(ref reader, options);
                if (item != null)
                {
                    result.Add(item);
                }
            }
            return result;
        }

        public override void Write(Utf8JsonWriter writer, List<T> value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, options);
        }
    }
}