using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MockReactRedux.Infrastructure;
using MockReactRedux.Models;
using MockReactRedux.ViewModels;

namespace MockReactRedux.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private DataContext _dataContext;

        public ProductController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("[action]")]
        public IEnumerable<Product> GetAll()
        {
           return _dataContext.Products;
        }
        [HttpPost("[action]")]
        public IActionResult Create([FromBody]ProductViewModel model)
        {
            if (model != null)
            {
                _dataContext.Add(new Product
                {
                    ProdName = model.ProdName,
                    Price = model.Price
                });
                _dataContext.SaveChanges();
                return Ok("Product store successfully");
            }
            else
            {
                return BadRequest("Product not created");
            }
            
        }
        [HttpPost("[action]")]
        public IActionResult Delete(int? id)
        {
            return Ok();
        }
        [HttpPost("[action]")]
        public IActionResult Update(Product model)
        {

            return Ok();
        }
    }



}