using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MockReactRedux.Infrastructure;

namespace MockReactRedux.Api
{
    [Route("api/[controller]")]
    public class AlbumController : Controller
    {
        private DataContext _dataContext;

        public AlbumController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IActionResult> Create()
        {
            return Ok();
        }
    }
}   