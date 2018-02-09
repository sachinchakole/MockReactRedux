using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MockReactRedux.Models
{
    public class Genre
    {
        public Genre()
        {
            Albums = new List<Album>();
        }

        public int GenreId { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        [JsonIgnore]
        public virtual ICollection<Album> Albums { get; set; }
    }
}
