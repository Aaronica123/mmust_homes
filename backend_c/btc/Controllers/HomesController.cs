using btc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/Homes")]
    [ApiController]
    public class HomesController : ControllerBase
    {
        private readonly IHomesInterface client;

        public HomesController(IHomesInterface cl)
        {
            client=cl;
        }
        [HttpGet("fetch")]
        public async Task<IActionResult> GetHomes()
        {
            var da=await client.GetHomes();
            return Ok(da);
        }


    }
}
