using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using ticket_server.Data;






var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000", "http://lol.com");
             // (,) add deployed site here
        });
});





// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "tickets", Version = "v1" });
});

var app = builder.Build();


// swagger setup for testing endpoints
app.UseSwagger();
app.UseSwaggerUI(swaggerUIOptions => 
{
    swaggerUIOptions.DocumentTitle = "tickets";
    swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "web api serving a post model");
    swaggerUIOptions.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");


// -> all posts (tickets)
app.MapGet("/get-all-posts", async () => await PostsRepository.GetPostsAsync())
    .WithTags("Posts Endpoints");


// int -> post with matching id
app.MapGet("/get-post-by-id/{postId}", async (int postId) =>
{
    Post postToReturn = await PostsRepository.GetPostByIdAsync(postId);

    if (postToReturn != null)
    {
        return Results.Ok(postToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");


// int, int -> posts with matching project id (not using user id right now)
app.MapGet("/get-posts-by-project/{projectId}/{userId}", async (int projectId, int userId) =>
{
    List<Post> postsToReturn = await PostsRepository.GetPostsByProjectIdAsync(projectId);

    /*
        for each post:
            if userId == assignedDevUid
                set Read = true

        add check to see if read is set (might not be updated though)
    */

    //bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);

    
    /*
    foreach (var post in postsToReturn)
    {
        if (post.AsignedDevUid == userId)
        {
            post.Read = true;
            bool updateSuccessful = await PostsRepository.UpdatePostAsync(post);
        }
    }
    */
   
    if (postsToReturn != null)
    {
        return Results.Ok(postsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");




// int (project id) -> return posts with matching project id + mark read
app.MapGet("/get-posts-by-project-notifications/{projectId}", async (int projectId) =>
{
    List<Post> postsToReturn = await PostsRepository.GetPostsByProjectIdAsync(projectId);




    if (postsToReturn != null)
    {
        return Results.Ok(postsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");



// Project Actions -> create post (fill out with db info) + create action
app.MapPost("/create-post", async (ProjectActions postInfo) =>
{
    Post postToCreate = new Post
    {
        PostId = postInfo.PostId,
        Title = postInfo.Title,
        ProjectId = postInfo.ProjectId,
        AsignedDev = postInfo.AsignedDev,
        AsignedDevEmail = postInfo.AsignedDevEmail,
        AsignedDevUid = postInfo.AsignedDevUid,
        Description = postInfo.Description,
        Submitter = postInfo.Submitter,
        SubmitterEmail = postInfo.SubmitterEmail,
        SubmitterUid = postInfo.SubmitterUid,
        TicketPrio = postInfo.TicketPrio,
        TicketStatus = postInfo.TicketStatus,
        TicketType = postInfo.TicketType,
        TicketNumber = postInfo.TicketNumber,
        SubmitDate = postInfo.SubmitDate,//DateTime.UtcNow,
        ModifyDate = postInfo.ModifyDate,//DateTime.UtcNow
        Read = postInfo.Read
    };


    // returns postId on success or -1
    int createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);


    DateTime saveUtcNow = DateTime.UtcNow;


    ProjectActions p = new ProjectActions
    {
        ActionId = 0,
        //ProjectId = 1,
        Date = saveUtcNow,
        ActionString = postInfo.ActionString,
        UserName = postInfo.UserName,
        UserEmail = postInfo.UserEmail,
        UserId = postInfo.UserId,

        PostId = createSuccessful,
        Title = postToCreate.Title,
        ProjectId = postToCreate.ProjectId,
        AsignedDev = postToCreate.AsignedDev,
        AsignedDevEmail = postToCreate.AsignedDevEmail,
        AsignedDevUid = postToCreate.AsignedDevUid,
        Description = postToCreate.Description,
        Submitter = postToCreate.Submitter,
        SubmitterEmail = postToCreate.SubmitterEmail,
        SubmitterUid = postToCreate.SubmitterUid,
        TicketPrio = postToCreate.TicketPrio,
        TicketStatus = postToCreate.TicketStatus,
        TicketType = postToCreate.TicketType,
        TicketNumber = postToCreate.TicketNumber,
        SubmitDate = postToCreate.SubmitDate,
        ModifyDate = postToCreate.ModifyDate,
        Read = postInfo.Read

    };

    
    bool createActionSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(p);
   


    if (createActionSuccessful)
    {
        return Results.Ok("Create successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");



// ProjectAction -> update post with matching post id + create action
app.MapPut("/update-post", async (ProjectActions postInfo) =>
{

    Post postToUpdate = new Post
    {
        PostId = postInfo.PostId,
        Title = postInfo.Title,
        ProjectId = postInfo.ProjectId,
        AsignedDev = postInfo.AsignedDev,
        AsignedDevEmail = postInfo.AsignedDevEmail,
        AsignedDevUid = postInfo.AsignedDevUid,
        Description = postInfo.Description,
        Submitter = postInfo.Submitter,
        SubmitterEmail = postInfo.SubmitterEmail,
        SubmitterUid = postInfo.SubmitterUid,
        TicketPrio = postInfo.TicketPrio,
        TicketStatus = postInfo.TicketStatus,
        TicketType = postInfo.TicketType,
        TicketNumber = postInfo.TicketNumber,
        SubmitDate = postInfo.SubmitDate,
        ModifyDate = DateTime.UtcNow,
        Read = postInfo.Read
    };

    bool updateSuccessful = await PostsRepository.UpdatePostAsync(postToUpdate);



    DateTime saveUtcNow = DateTime.UtcNow;

    ProjectActions p = new ProjectActions
    {
        ActionId = 0,
        //ProjectId = 1,
        Date = saveUtcNow,
        ActionString = postInfo.ActionString,
        UserName = postInfo.UserName,
        UserEmail = postInfo.UserEmail,
        UserId = postInfo.UserId,

        PostId = postToUpdate.PostId,
        Title = postToUpdate.Title,
        ProjectId = postToUpdate.ProjectId,
        AsignedDev = postToUpdate.AsignedDev,
        AsignedDevEmail = postToUpdate.AsignedDevEmail,
        AsignedDevUid = postToUpdate.AsignedDevUid,
        Description = postToUpdate.Description,
        Submitter = postToUpdate.Submitter,
        SubmitterEmail = postToUpdate.SubmitterEmail,
        SubmitterUid = postToUpdate.SubmitterUid,
        TicketPrio = postToUpdate.TicketPrio,
        TicketStatus = postToUpdate.TicketStatus,
        TicketType = postToUpdate.TicketType,
        TicketNumber = postToUpdate.TicketNumber,
        SubmitDate = postToUpdate.SubmitDate,
        ModifyDate = DateTime.UtcNow,
        Read = postInfo.Read

    };

    bool createActionSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(p);

    if (createActionSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");




// create Project Action if not found, else update (notifications)
async static void CreateOrUpdateProjectAction(ProjectActions projectActionInfo)
{
    // Check if an action with the same Title and Description exists
    ProjectActions existingAction = await ProjectActionsRepository.GetProjectActionsByTitleAndDescriptionAsync(projectActionInfo.Title, projectActionInfo.Description, projectActionInfo.ProjectId);

    if (existingAction != null)
    {
        // Update the existing action
        existingAction.ActionId = existingAction.ActionId;
        existingAction.Date = DateTime.UtcNow;
        existingAction.ActionString = projectActionInfo.ActionString;
        existingAction.UserName = projectActionInfo.UserName;
        existingAction.UserEmail = projectActionInfo.UserEmail;
        existingAction.UserId = projectActionInfo.UserId;
        existingAction.Read = false;

        bool updateSuccessful = await ProjectActionsRepository.UpdateProjectActionsAsync(existingAction);

        /*
        if (updateSuccessful)
        {
            return Results.Ok("Update successful.");
        }
        else
        {
            return Results.BadRequest("Failed to update the project action.");
        }
        */
    }
    else
    {
        // Create a new action
        ProjectActions newAction = new ProjectActions
        {
            Title = projectActionInfo.Title,
            Description = projectActionInfo.Description,
            // Set other properties for the new action
            Date = DateTime.UtcNow,
            ActionString = projectActionInfo.ActionString,
            UserName = projectActionInfo.UserName,
            UserEmail = projectActionInfo.UserEmail,
            UserId = projectActionInfo.UserId
        };

        ProjectActions p = new ProjectActions
        {
            ActionId = 0,
            //ProjectId = 1,
            Date = DateTime.UtcNow,
            ActionString = projectActionInfo.ActionString,
            UserName = projectActionInfo.UserName,
            UserEmail = projectActionInfo.UserEmail,
            UserId = projectActionInfo.UserId,

            Title = projectActionInfo.Title,
            ProjectId = projectActionInfo.ProjectId,
            AsignedDev = projectActionInfo.AsignedDev,
            AsignedDevEmail = projectActionInfo.AsignedDevEmail,
            AsignedDevUid = projectActionInfo.AsignedDevUid,
            Description = projectActionInfo.Description,
            Submitter = projectActionInfo.Submitter,
            SubmitterEmail = projectActionInfo.SubmitterEmail,
            SubmitterUid = projectActionInfo.SubmitterUid,
            TicketPrio = projectActionInfo.TicketPrio,
            TicketStatus = projectActionInfo.TicketStatus,
            TicketType = projectActionInfo.TicketType,
            TicketNumber = projectActionInfo.TicketNumber,
            SubmitDate = projectActionInfo.SubmitDate,
            ModifyDate = projectActionInfo.ModifyDate,
            Read = false//postInfo.Read

        };

        bool createActionSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(projectActionInfo);

        /*
        if (createActionSuccessful)
        {
            return Results.Ok("Create successful.");
        }
        else
        {
            return Results.BadRequest("Failed to create the project action.");
        }
        */
    }

}


// create post if not found, else update (notifications)
app.MapPost("/create-or-update-post", async (ProjectActions postInfo) =>
{
    // Check if the post already exists
    Post existingPost = await PostsRepository.GetPostByTitleAndDescriptionAsync(postInfo.Title, postInfo.Description, postInfo.SubmitterUid);

    if (existingPost != null)
    {
        // Update the existing post
        existingPost.PostId = existingPost.PostId;
        existingPost.ProjectId = postInfo.ProjectId;
        existingPost.AsignedDev = postInfo.AsignedDev;
        existingPost.AsignedDevEmail = postInfo.AsignedDevEmail;
        existingPost.AsignedDevUid = postInfo.AsignedDevUid;
        existingPost.Submitter = postInfo.Submitter;
        existingPost.SubmitterEmail = postInfo.SubmitterEmail;
        existingPost.SubmitterUid = postInfo.SubmitterUid;
        existingPost.TicketPrio = postInfo.TicketPrio;
        existingPost.TicketStatus = postInfo.TicketStatus;
        existingPost.TicketType = postInfo.TicketType;
        existingPost.TicketNumber = postInfo.TicketNumber;
        existingPost.SubmitDate = postInfo.SubmitDate;
        existingPost.ModifyDate = postInfo.ModifyDate;
        existingPost.Read = false;//postInfo.Read;

        bool updateSuccessful = await PostsRepository.UpdatePostAsync(existingPost);


        
        DateTime saveUtcNow = DateTime.UtcNow;


        ProjectActions p = new ProjectActions
        {
            ActionId = 0,
            //ProjectId = 1,
            Date = saveUtcNow,
            ActionString = postInfo.ActionString,
            UserName = postInfo.UserName,
            UserEmail = postInfo.UserEmail,
            UserId = postInfo.UserId,

            Title = postInfo.Title,
            ProjectId = postInfo.ProjectId,
            AsignedDev = postInfo.AsignedDev,
            AsignedDevEmail = postInfo.AsignedDevEmail,
            AsignedDevUid = postInfo.AsignedDevUid,
            Description = postInfo.Description,
            Submitter = postInfo.Submitter,
            SubmitterEmail = postInfo.SubmitterEmail,
            SubmitterUid = postInfo.SubmitterUid,
            TicketPrio = postInfo.TicketPrio,
            TicketStatus = postInfo.TicketStatus,
            TicketType = postInfo.TicketType,
            TicketNumber = postInfo.TicketNumber,
            SubmitDate = postInfo.SubmitDate,
            ModifyDate = postInfo.ModifyDate,
            Read = false//postInfo.Read

        };


        CreateOrUpdateProjectAction(p);
        //bool createActionSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(p);




        if (updateSuccessful)
        {
            return Results.Ok("Update successful.");
        }
        else
        {
            return Results.BadRequest("Failed to update the post.");
        }
    }
    else
    {
        // Create a new post
        Post postToCreate = new Post
        {
            Title = postInfo.Title,
            ProjectId = postInfo.ProjectId,
            AsignedDev = postInfo.AsignedDev,
            AsignedDevEmail = postInfo.AsignedDevEmail,
            AsignedDevUid = postInfo.AsignedDevUid,
            Description = postInfo.Description,
            Submitter = postInfo.Submitter,
            SubmitterEmail = postInfo.SubmitterEmail,
            SubmitterUid = postInfo.SubmitterUid,
            TicketPrio = postInfo.TicketPrio,
            TicketStatus = postInfo.TicketStatus,
            TicketType = postInfo.TicketType,
            TicketNumber = postInfo.TicketNumber,
            SubmitDate = postInfo.SubmitDate,
            ModifyDate = postInfo.ModifyDate,
            Read = false//postInfo.Read
        };

        int createSuccessful = await PostsRepository.CreatePostAsync(postToCreate);


        DateTime saveUtcNow = DateTime.UtcNow;


        ProjectActions p = new ProjectActions
        {
            ActionId = 0,
            //ProjectId = 1,
            Date = saveUtcNow,
            ActionString = postInfo.ActionString,
            UserName = postInfo.UserName,
            UserEmail = postInfo.UserEmail,
            UserId = postInfo.UserId,

            Title = postInfo.Title,
            ProjectId = postInfo.ProjectId,
            AsignedDev = postInfo.AsignedDev,
            AsignedDevEmail = postInfo.AsignedDevEmail,
            AsignedDevUid = postInfo.AsignedDevUid,
            Description = postInfo.Description,
            Submitter = postInfo.Submitter,
            SubmitterEmail = postInfo.SubmitterEmail,
            SubmitterUid = postInfo.SubmitterUid,
            TicketPrio = postInfo.TicketPrio,
            TicketStatus = postInfo.TicketStatus,
            TicketType = postInfo.TicketType,
            TicketNumber = postInfo.TicketNumber,
            SubmitDate = postInfo.SubmitDate,
            ModifyDate = postInfo.ModifyDate,
            Read = false//postInfo.Read

        };


        CreateOrUpdateProjectAction(p);




        if (createSuccessful > 0)
        {
            return Results.Ok("Create successful.");
        }
        else
        {
            return Results.BadRequest("Failed to create the post.");
        }
    }
}).WithTags("Posts Endpoints");




// delete post if found + create action
app.MapPut("/delete-post-by-id", async (ProjectActions postInfo) =>
{
    
    Post postToDelete = new Post
    {
        PostId = postInfo.PostId,
        Title = postInfo.Title,
        ProjectId = postInfo.ProjectId,
        AsignedDev = postInfo.AsignedDev,
        AsignedDevEmail = postInfo.AsignedDevEmail,
        AsignedDevUid = postInfo.AsignedDevUid,
        Description = postInfo.Description,
        Submitter = postInfo.Submitter,
        SubmitterEmail = postInfo.SubmitterEmail,
        SubmitterUid = postInfo.SubmitterUid,
        TicketPrio = postInfo.TicketPrio,
        TicketStatus = postInfo.TicketStatus,
        TicketType = postInfo.TicketType,
        TicketNumber = postInfo.TicketNumber,
        SubmitDate = postInfo.SubmitDate,
        ModifyDate = postInfo.ModifyDate,
        Read = postInfo.Read
    };
    


    bool deleteSuccessful = await PostsRepository.DeletePostAsync(postInfo.PostId);

    DateTime saveUtcNow = DateTime.UtcNow;
    
    ProjectActions p = new ProjectActions
    {
        ActionId = 0,
        //ProjectId = 1,
        Date = saveUtcNow,
        ActionString = postInfo.ActionString,
        UserName = postInfo.UserName,
        UserEmail = postInfo.UserEmail,
        UserId = postInfo.UserId,

        PostId = postToDelete.PostId,
        Title = postToDelete.Title,
        ProjectId = postToDelete.ProjectId,
        AsignedDev = postToDelete.AsignedDev,
        AsignedDevEmail = postToDelete.AsignedDevEmail,
        AsignedDevUid = postToDelete.AsignedDevUid,
        Description = postToDelete.Description,
        Submitter = postToDelete.Submitter,
        SubmitterEmail = postToDelete.SubmitterEmail,
        SubmitterUid = postToDelete.SubmitterUid,
        TicketPrio = postToDelete.TicketPrio,
        TicketStatus = postToDelete.TicketStatus,
        TicketType = postToDelete.TicketType,
        TicketNumber = postToDelete.TicketNumber,
        SubmitDate = postToDelete.SubmitDate,
        ModifyDate = postToDelete.ModifyDate,
        Read = postInfo.Read

    };
    

    bool createActionSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(p);


    if (createActionSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Posts Endpoints");








// return projects (for testing only)
app.MapGet("/get-all-projects", async () => await ProjectsRepository.GetProjectsAsync())
    .WithTags("Projects Endpoints");


// project id -> return matching project
app.MapGet("/get-project-by-id/{projectId}", async (int projectId) =>
{
    Project projectToReturn = await ProjectsRepository.GetProjectByIdAsync(projectId);

    if (projectToReturn != null)
    {
        return Results.Ok(projectToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");



// user id -> return projects that contains uid
app.MapGet("/get-projects-by-user-id/{userId}", async (int userId) =>
{
    List<Project> projects = await ProjectsRepository.GetProjectsAsync();

    if (projects != null)
    {
        var filteredProjects = projects.Where(project => project.UserIdList.Contains(userId));

        return Results.Ok(filteredProjects);
    }
    else
    {
        return Results.BadRequest();
    }

  
}).WithTags("Projects Endpoints");



// create project
app.MapPost("/create-project", async (Project projectToCreate) =>
{
    int projectId = await ProjectsRepository.CreateProjectAsync(projectToCreate);

    if (projectId > 0)
    {
        return Results.Ok(projectId.ToString());
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");


// update project
app.MapPut("/update-project", async (Project projectToUpdate) =>
{
    bool updateSuccessful = await ProjectsRepository.UpdateProjectAsync(projectToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");


// add user to project
app.MapPut("/add-user-to-project/{userId}", async (Project projectToUpdate, int userId) =>
{
    projectToUpdate.UidString += ";";

    projectToUpdate.UidString += userId.ToString();

    bool updateSuccessful = await ProjectsRepository.UpdateProjectAsync(projectToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok(projectToUpdate);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");


// remove user from project if found
app.MapPut("/remove-user-from-project/{userId}", async (Project projectToUpdate, int userId) =>
{
    string uidString = ";" + userId.ToString();

    projectToUpdate.UidString = projectToUpdate.UidString.Replace(uidString, "");



    bool updateSuccessful = await ProjectsRepository.UpdateProjectAsync(projectToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok(projectToUpdate);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");


// delete project
app.MapDelete("/delete-project-by-id/{projectId}", async (int projectId) =>
{
    bool deleteSuccessful = await ProjectsRepository.DeleteProjectAsync(projectId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Projects Endpoints");






// get users (for testing only)
app.MapGet("/get-all-users", async () => await UsersRepository.GetUsersAsync())
    .WithTags("Users Endpoints");


// user id -> matching user
app.MapGet("/get-user-by-id/{userId}", async (int userId) =>
{
    User userToReturn = await UsersRepository.GetUserByIdAsync(userId);

    if (userToReturn != null)
    {
        return Results.Ok(userToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");



// get users by project id
app.MapGet("/get-users-by-project-id/{projectId}", async (int projectId) =>
{

    Project project = await ProjectsRepository.GetProjectByIdAsync(projectId);

    List<int> UserIdList = project.UserIdList;

    List<User> users = await UsersRepository.GetUsersByProjectAsync(UserIdList);

    if (users != null)
    {
        return Results.Ok(users);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");



// get user by email / password (login)
app.MapGet("/get-user-by-credentials/{email}/{password}", async (String email, String password) =>
{
    List<User> users = await UsersRepository.GetUsersAsync();

    


    if (users != null)
    {
        var filteredUsers = users.Where(user => user.Email == email && user.Password == password);

        if (filteredUsers.ToList().Count > 0)
        {
            User userToReturn = filteredUsers.ElementAt(0);

            return Results.Ok(userToReturn);

        }
        else
        {
            return Results.BadRequest();
        }
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");



// get user by email / username (forgot password)
app.MapGet("/get-user-by-name/{email}/{username}", async (String email, String username) =>
{
    List<User> users = await UsersRepository.GetUsersAsync();




    if (users != null)
    {
        var filteredUsers = users.Where(user => user.Email == email && user.Username == username);

        if (filteredUsers.ToList().Count > 0)
        {
            User userToReturn = filteredUsers.ElementAt(0);

            return Results.Ok(userToReturn);

        }
        else
        {
            return Results.BadRequest();
        }
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");



// add project id to user access list string
app.MapPut("/grantManagerAccess/{userId}/{projectId}", async (int userId, int projectId) =>
{

    User userToEdit = await UsersRepository.GetUserByIdAsync(userId);

    if (userToEdit.AccessIdList.Contains(projectId)) {
        return Results.Ok(userToEdit);
    }

    userToEdit.AccessIdString += ";";

    userToEdit.AccessIdString += projectId.ToString();

    bool updateSuccessful = await UsersRepository.UpdateUserAsync(userToEdit);

    if (updateSuccessful)
    {
        return Results.Ok(userToEdit);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");



// remove project from user access string
app.MapPut("/revokeManagerAccess/{userId}/{projectId}", async (int userId, int projectId) =>
{
    User userToEdit = await UsersRepository.GetUserByIdAsync(userId);

    if (!userToEdit.AccessIdList.Contains(projectId))
    {
        return Results.Ok(userToEdit);
    }

    userToEdit.AccessIdString = userToEdit.AccessIdString.Replace($";{projectId}", "");

    bool updateSuccessful = await UsersRepository.UpdateUserAsync(userToEdit);

    if (updateSuccessful)
    {
        return Results.Ok(userToEdit);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");


// create user
app.MapPost("/create-user", async (User userToCreate) =>
{
    bool createSuccessful = await UsersRepository.CreateUserAsync(userToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");


// update user
app.MapPut("/update-user", async (User userToUpdate) =>
{
    bool updateSuccessful = await UsersRepository.UpdateUserAsync(userToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");


// delete user
app.MapDelete("/delete-user-by-id/{userId}", async (int userId) =>
{
    bool deleteSuccessful = await UsersRepository.DeleteUserAsync(userId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Users Endpoints");







// get all project actions (for testing only)
app.MapGet("/get-all-projectActions", async () => await ProjectActionsRepository.GetProjectActionsAsync())
    .WithTags("Project Actions Endpoints");



// actions by project
app.MapGet("/get-actions-by-project-id/{projectId}/{userId}", async (int projectId, int userId) =>
{
    List <ProjectActions> projectActionsToReturn = await ProjectActionsRepository.GetProjectActionsByProjectIdAsync(projectId);


    foreach (var post in projectActionsToReturn)
    {
        if (post.AsignedDevUid == userId)
        {
            post.Read = true;
            bool updateSuccessful = await ProjectActionsRepository.UpdateProjectActionsAsync(post);
        }
    }


    if (projectActionsToReturn != null)
    {
        return Results.Ok(projectActionsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");



// get actions by project, do not update read
app.MapGet("/get-actions-by-project-id-notifications/{projectId}", async (int projectId) =>
{
    List<ProjectActions> projectActionsToReturn = await ProjectActionsRepository.GetProjectActionsByProjectIdAsync(projectId);


    if (projectActionsToReturn != null)
    {
        return Results.Ok(projectActionsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");


// get actions by user (profile)
app.MapGet("/get-actions-by-user-id/{userId}", async (int userId) =>
{
    List<ProjectActions> projectActionsToReturn = await ProjectActionsRepository.GetProjectActionsByUserIdAsync(userId);

    /*
    foreach (var post in projectActionsToReturn)
    {
        if (post.AsignedDevUid == userId)
        {
            post.Read = true;
            bool updateSuccessful = await ProjectActionsRepository.UpdateProjectActionsAsync(post);
        }
    }
    */


    if (projectActionsToReturn != null)
    {
        return Results.Ok(projectActionsToReturn);
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");


// get user action where read = false
app.MapGet("/get-unread-actions-by-user-id/{userId}", async (int userId) =>
{
    List<ProjectActions> projectActionsToReturn = await ProjectActionsRepository.GetAssignedProjectActionsByUserIdAsync(userId);




    if (projectActionsToReturn != null)
    {
        // Calculate the number of unread posts for each project
        Dictionary<int, int> unreadCounts = new Dictionary<int, int>();

        foreach (var projectAction in projectActionsToReturn)
        {
            int projectId = projectAction.ProjectId;

            if (projectAction.AsignedDevUid == userId && projectAction.Read == false)
            {
                if (unreadCounts.ContainsKey(projectId))
                {
                    unreadCounts[projectId]++;
                }
                else
                {
                    unreadCounts[projectId] = 1;
                }
            }
        }

        return Results.Ok(unreadCounts);
    }
    else
    {
        return Results.BadRequest();
    }


}).WithTags("Project Actions Endpoints");





// create action

app.MapPost("/create-projectAction", async (ProjectActions projectActionToCreate) =>
{
    bool createSuccessful = await ProjectActionsRepository.CreateProjectActionsAsync(projectActionToCreate);

    if (createSuccessful)
    {
        return Results.Ok("Create successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");


// update action

app.MapPut("/update-projectActions", async (ProjectActions projectActionToUpdate) =>
{
    bool updateSuccessful = await ProjectActionsRepository.UpdateProjectActionsAsync(projectActionToUpdate);

    if (updateSuccessful)
    {
        return Results.Ok("Update successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");




// delete action
app.MapDelete("/delete-projectAction-by-id/{projectActionId}", async (int projectActionId) =>
{
    bool deleteSuccessful = await ProjectActionsRepository.DeleteProjectActionsAsync(projectActionId);

    if (deleteSuccessful)
    {
        return Results.Ok("Delete successful.");
    }
    else
    {
        return Results.BadRequest();
    }
}).WithTags("Project Actions Endpoints");










app.Run();




