﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int InStock { get; set; }
        public string Info { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }

        public ICollection<Category> Categories { get; set; }
    }
}