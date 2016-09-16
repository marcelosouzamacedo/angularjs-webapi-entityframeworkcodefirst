using System.Collections.Generic;

namespace Api.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Category Parent { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}