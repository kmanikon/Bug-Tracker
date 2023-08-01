using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ticket_server.Data.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDev = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDevEmail = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDevUid = table.Column<int>(type: "INTEGER", nullable: false),
                    Submitter = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SubmitterEmail = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SubmitterUid = table.Column<int>(type: "INTEGER", nullable: false),
                    TicketPrio = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketStatus = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketType = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    SubmitDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ReadString = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.CreateTable(
                name: "ProjectActions",
                columns: table => new
                {
                    ActionId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ActionString = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    UserEmail = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    PostId = table.Column<int>(type: "INTEGER", nullable: false),
                    Title = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDev = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDevEmail = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    AsignedDevUid = table.Column<int>(type: "INTEGER", nullable: false),
                    Submitter = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SubmitterEmail = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false),
                    SubmitterUid = table.Column<int>(type: "INTEGER", nullable: false),
                    TicketPrio = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketStatus = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketType = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    TicketNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    SubmitDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifyDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ReadString = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectActions", x => x.ActionId);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProjectName = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    UidString = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Email = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    AccessIdString = table.Column<string>(type: "TEXT", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "ProjectId", "Description", "ProjectName", "UidString" },
                values: new object[] { 1, "This is a Bug Tracker", "Bug Tracker", "1;2" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "AccessIdString", "Email", "Password", "Username" },
                values: new object[,]
                {
                    { 1, "0", "demoEmail1@gmail.com", "Password 1", "Demo Admin" },
                    { 2, "0", "demoEmail2@gmail.com", "Password 2", "Demo Developer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "ProjectActions");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
