using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Api.Models;

namespace Api.Controllers
{
    public class ProductsController : ApiController
    {
        private ShoppingCartContext db = new ShoppingCartContext();

        // GET api/Category/5/Products
        [Route("api/Category/{id}/Products")]
        public IQueryable<Product> GetProducts(int id)
        {
            return db.Products.Where(p => p.Categories.All(c => new[] { id }.Contains(c.Id)));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}