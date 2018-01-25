using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MockReactRedux.Infrastructure;
using MockReactRedux.Models;
using Newtonsoft.Json;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace MockReactRedux.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountController(IUserService userService, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet("[action]")]
        public IActionResult Index()
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody]UserDto form)
        {
            // map dto to entity
            var user = _mapper.Map<User>(form);

            try
            {
                // save 
                _userService.Create(user, form.Password);
                return Ok(form);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
          
        }
        
        
    }
}