using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MockReactRedux.Infrastructure;
using MockReactRedux.Models;
using MockReactRedux.ViewModels;

namespace MockReactRedux.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private DataContext _dataContext;

        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<Product> GetAll()
        {
           return _dataContext.Products;
        }
        [HttpPost("[action]")]
        [AllowAnonymous]
        public IActionResult Create([FromBody]ProductViewModel model)
        {
            if (model != null)
            {
                var vm = new Product
                {
                    ProdName = model.ProdName,
                    Price = model.Price
                };
                _dataContext.Add(vm);
                _dataContext.SaveChanges();
                return Ok(vm);
            }
            else
            {
                return BadRequest("Product not created");
            }
            
        }
        [HttpDelete("[action]/{id}")]
        [AllowAnonymous]
        public IActionResult Delete(int id)
        {
            var prod = _dataContext.Products.SingleOrDefault(x => x.Id == id);
            if (prod != null)
            {
                _dataContext.Products.Remove(prod);
                _dataContext.SaveChanges();

                return Ok("Product delete success");
            }
            else
            {
                return BadRequest("Bad request");
            }
            
        }
        [HttpPost("[action]")]
        public IActionResult Update(int id, [FromBody]Product model)
        {
            if (model != null)
            {
                var prod = _dataContext.Products.Find(model.Id);
                _dataContext.Entry(prod).State = EntityState.Modified;
                _dataContext.SaveChanges();
                return Ok(prod);
            }
            return Ok();
        }
    }



}