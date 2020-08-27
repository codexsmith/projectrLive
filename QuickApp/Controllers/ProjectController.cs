using DAL;
using DAL.Models;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;


        public ProjectController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<Project[]> GetAllProjects()
        {
            return _unitOfWork.Project.GetAll().ToArray();
        }

        [HttpGet("{projectId}")]
        public ActionResult<Project> GetProject(int projectId)
        {
            var project = _unitOfWork.Project.Get(projectId);

            if (project == null)
            {
                return NotFound();
            } 

            return project;
        }
    }
}