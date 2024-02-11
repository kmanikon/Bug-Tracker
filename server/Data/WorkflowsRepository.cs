using System;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
    internal static class WorkflowsRepository
    {
        internal async static Task<List<Workflow>> GetWorkflowsAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Workflows.ToListAsync();
            }
        }

        internal async static Task<Workflow> GetWorkflowByIdAsync(int workflowId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Workflows.FirstOrDefaultAsync(workflow => workflow.WorkflowId == workflowId);
            }
        }

        internal async static Task<Workflow> GetWorkflowByProjectIdAsync(int projectId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Workflows.FirstOrDefaultAsync(workflow => workflow.ProjectId == projectId);
            }
        }

        internal static async Task<bool> CreateWorkflowAsync(Workflow workflowToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Workflows.AddAsync(workflowToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }


        internal static async Task<bool> UpdateWorkflowAsync(Workflow workflowToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Workflows.Update(workflowToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }



        internal static async Task<bool> DeleteWorkflowAsync(int workflowId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    Workflow workflowToDelete = await GetWorkflowByIdAsync(workflowId);

                    db.Remove(workflowToDelete);

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


