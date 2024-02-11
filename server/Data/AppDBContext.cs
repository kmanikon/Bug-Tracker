using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.EntityFrameworkCore;

using System;
using System.IO;

namespace ticket_server.Data
{


	internal sealed class AppDBContext : DbContext
	{
		public DbSet<Post> Posts { get; set; }

        public DbSet<User> Users { get; set; }

		public DbSet<Project> Projects { get; set;  }

        public DbSet<ProjectActions> ProjectActions { get; set; }

        public DbSet<Workflow> Workflows { get; set; }

        // Gets the current path (executing assembly)
        //static string currentPath = Directory.GetCurrentDirectory();//Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        //static string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        // Your DB filename    
        //static string dbFileName = "AppDB.db"; 
        // Creates a full path that contains your DB file
        //string absolutePath = Path.Combine(currentPath, dbFileName);

        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite($"Data Source={"./Data/AppDB.db"}");
        //protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlServer("Data Source=./Data/AppDB.db");
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

             // Gets the current path (executing assembly)
            //string currentPath = Directory.GetCurrentDirectory();//Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);  
            //string currentPath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            //string dbFileName = "Data/AppDB.db"; 
            //string absolutePath = Path.Combine(currentPath, dbFileName);
            
            //string dbPath = Path.Combine("./Data", "AppDB.db");
            //string dbPath = absolutePath;
            string dbPath = "./Data/AppDB.db";

            //Console.WriteLine(Directory.GetFiles("AppDB.db"));

            /*
            string currentDirectory = "./" ; //Directory.GetCurrentDirectory();
            Console.WriteLine("Current working directory: " + currentDirectory);

            string[] files = Directory.GetFiles(currentDirectory);
            Console.WriteLine("Files in the current working directory:");

            foreach (string file in files)
            {
                Console.WriteLine(file);
            }

            string[] subdirectories = Directory.GetDirectories(currentDirectory);
            Console.WriteLine("Subdirectories in the current working directory:");

            foreach (string subdirectory in subdirectories)
            {
                Console.WriteLine(subdirectory);
            }
            */
            

            //optionsBuilder.UseSqlite("Data Source=./Data/AppDB.db");
            optionsBuilder.UseSqlite($"Data Source={dbPath}");
        }

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

            


            
            Workflow[] workflowsToSeed = new Workflow[1];

            workflowsToSeed[0] = new Workflow
            {
                WorkflowId = 1,
                NodesJSON = "Example JSON",
                EdgesJSON = "Example JSON"
            };

            modelBuilder.Entity<Workflow>().HasData(workflowsToSeed);
            
        }
	}
}

