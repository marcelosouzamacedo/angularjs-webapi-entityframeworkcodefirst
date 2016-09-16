using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class Category
    {
        public Category()
        {
            Products = new List<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public Category Parent { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<Category> ChildrenCategories { get; set; }
    }
}