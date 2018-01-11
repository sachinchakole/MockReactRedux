using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MockReactRedux.Models
{
    [JsonObject]
    public class CourseVM
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
