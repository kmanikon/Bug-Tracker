using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
	internal sealed class AppDBContext : DbContext
	{
		public DbSet<Post> Posts { get; set; }

        public DbSet<User> Users { get; set; }

		public DbSet<Project> Projects { get; set;  }

        public DbSet<ProjectActions> ProjectActions { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");
        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlServer("Data Source=./Data/AppDB.db");


        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

            // initial demo users
            User[] usersToSeed = new User[2];

            usersToSeed[0] = new User
            {
                UserId = 1,
                Username = $"Demo Admin",
                Password = $"Password 1",
                Email = $"demoEmail1@gmail.com",
                AccessIdString = "0",
            };

            usersToSeed[1] = new User
            {
                UserId = 2,
                Username = $"Demo Developer",
                Password = $"Password 2",
                Email = $"demoEmail2@gmail.com",
                AccessIdString = "0",
            };

            modelBuilder.Entity<User>().HasData(usersToSeed);


            // initial project, update later
            Project[] projectsToSeed = new Project[1];

            projectsToSeed[0] = new Project
            {
                ProjectId = 1,
                ProjectName = "Bug Tracker",
                Description = "This is a Bug Tracker",
                UidString = "1;2"
            };


            modelBuilder.Entity<Project>().HasData(projectsToSeed);
            


        }
	}
}

