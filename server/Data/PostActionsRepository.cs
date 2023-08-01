using System;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
    internal static class ProjectActionsRepository
    {
        internal async static Task<List<ProjectActions>> GetProjectActionsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.ProjectActions.ToListAsync();
            }
        }


        internal async static Task<ProjectActions> GetProjectActionsByTitleAndDescriptionAsync(string title, string description, int projectId)
        {
            List<ProjectActions> posts = await ProjectActionsRepository.GetProjectActionsAsync();

            ProjectActions matchingPost = posts.FirstOrDefault(post => post.Title == title && post.Description == description && post.ProjectId == projectId);

            return matchingPost;
        }


        internal async static Task<List<ProjectActions>> GetProjectActionsByProjectIdAsync(int projectId)
        {
            using (var db = new AppDBContext())
            {
                //Func<Post, bool> ProjectTickets = t => t.ProjectId == projectId;
                List<ProjectActions> actionsToReturn = await db.ProjectActions.Where(t => t.ProjectId == projectId).ToListAsync();
                return actionsToReturn;
            }
        }

        internal async static Task<List<ProjectActions>> GetProjectActionsByUserIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                //Func<Post, bool> ProjectTickets = t => t.ProjectId == projectId;
                List<ProjectActions> actionsToReturn = await db.ProjectActions.Where(t => t.UserId == userId).ToListAsync();
                return actionsToReturn;
            }
        }

        internal async static Task<List<ProjectActions>> GetNotificationProjectActionsAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                String userIDStr = userId.ToString();
                //Func<Post, bool> ProjectTickets = t => t.ProjectId == projectId;
                List<ProjectActions> actionsToReturn = await db.ProjectActions.Where(t => t.ReadString.Contains(userIDStr)).ToListAsync();
                return actionsToReturn;
            }
        }

        internal async static Task<List<ProjectActions>> GetAssignedProjectActionsByUserIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                //Func<Post, bool> ProjectTickets = t => t.ProjectId == projectId;
                List<ProjectActions> actionsToReturn = await db.ProjectActions.Where(t => t.AsignedDevUid == userId).ToListAsync();
                return actionsToReturn;
            }
        }




        internal async static Task<ProjectActions> GetProjectActionsByIdAsync(int actionId)
        {
            using (var db = new AppDBContext())
            {
                return await db.ProjectActions.FirstOrDefaultAsync(projectActions => projectActions.ActionId == actionId);
            }
        }

        internal static async Task<bool> CreateProjectActionsAsync(ProjectActions projectActions)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.ProjectActions.AddAsync(projectActions);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }


        internal static async Task<bool> UpdateProjectActionsAsync(ProjectActions projectActionsToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.ProjectActions.Update(projectActionsToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }



        internal static async Task<bool> DeleteProjectActionsAsync(int projectActionsId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    ProjectActions projectActionsToDelete = await GetProjectActionsByIdAsync(projectActionsId);

                    db.Remove(projectActionsToDelete);

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

