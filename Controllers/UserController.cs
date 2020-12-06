using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OpenXcelDemo.ViewModel;

namespace OpenXcelDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        public UserController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        [HttpPost]
        public async Task<UserViewModel> AddUser([FromBody] UserViewModel userViewModel)
        {
            var user = new IdentityUser { UserName = userViewModel.UserName, Email = userViewModel.UserName, PhoneNumber = userViewModel.ContactNo,EmailConfirmed=true, PhoneNumberConfirmed = true };
            var result = await _userManager.CreateAsync(user, userViewModel.Password);
            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, false);
                return userViewModel;
            }
            return null;
        }
    }
}
