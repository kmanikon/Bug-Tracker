using System;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
    internal static class UsersRepository
    {
        internal async static Task<List<User>> GetUsersAsync()
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.ToListAsync();
            }
        }

        internal async static Task<List<User>> GetUsersByProjectAsync(List<int> UserIdList)
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.Where(user => UserIdList.Contains(user.UserId)).ToListAsync();
            }
        }

        internal async static Task<User> GetUserByIdAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                return await db.Users.FirstOrDefaultAsync(user => user.UserId == userId);
            }
        }

        internal static async Task<bool> CreateUserAsync(User userToCreate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    await db.Users.AddAsync(userToCreate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }


        internal static async Task<bool> UpdateUserAsync(User userToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    db.Users.Update(userToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }



        internal static async Task<bool> DeleteUserAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
                    User userToDelete = await GetUserByIdAsync(userId);

                    db.Remove(userToDelete);

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

