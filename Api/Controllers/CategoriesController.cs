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
    public class CategoriesController : ApiController
    {
        private ShoppingCartContext db = new ShoppingCartContext();

        // GET: api/Categories
        public IQueryable<Category> GetCategories()
        {
            return db.Categories;
        }

        // GET api/Category/5/Categories
        [Route("api/Category/{id}/Categories")]
        public IQueryable<Category> GetChildren(int id)
        {
            return db.Categories.Where(c => c.Parent.Id == id);
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