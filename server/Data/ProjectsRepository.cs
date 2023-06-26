using System;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
    internal static class ProjectsRepository
    {
        internal async static Task<List<Project>> GetProjectsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Projects.ToListAsync();
            }
        }

        internal async static Task<Project> GetProjectByIdAsync(int projectId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Projects.FirstOrDefaultAsync(project => project.ProjectId == projectId);
            }
        }

        internal static async Task<int> CreateProjectAsync(Project projectToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Projects.AddAsync(projectToCreate);

                    await db.SaveChangesAsync();

                    // Return the ID of the created project
                    return projectToCreate.ProjectId;
                }
                catch //(Exception e)
                {
                    return 0; // Return 0 to indicate failure
                }
            }
        }












        internal static async Task<bool> UpdateProjectAsync(Project projectToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Projects.Update(projectToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }



        internal static async Task<bool> DeleteProjectAsync(int projectId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Project projectToDelete = await GetProjectByIdAsync(projectId);

                    db.Remove(projectToDelete);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }


    }
}

