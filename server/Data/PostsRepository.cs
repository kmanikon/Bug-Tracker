using System;
using Microsoft.EntityFrameworkCore;

namespace ticket_server.Data
{
	internal static class PostsRepository
	{
		internal async static Task<List<Post>> GetPostsAsync()
		{
			using (var db = new AppDBContext())
			{
				return await db.Posts.ToListAsync();
			}
		}

        
        internal async static Task<List<Post>> GetPostsByProjectIdAsync(int projectId)
        {
            using (var db = new AppDBContext())
            {
                List<Post> postsToReturn = await db.Posts.Where(t => t.ProjectId == projectId).ToListAsync();
                return postsToReturn;
            }
        }



        internal async static Task<List<Post>> GetPostsByUserAsync(int userId)
        {
            using (var db = new AppDBContext())
            {
                List<Post> postsToReturn = await db.Posts.Where(t => t.AsignedDevUid == userId).ToListAsync();
                return postsToReturn;
            }
        }





        internal async static Task<Post> GetPostByIdAsync(int postId)
		{
			using (var db = new AppDBContext())
			{
				return await db.Posts.FirstOrDefaultAsync(post => post.PostId == postId);
			}
		}


        internal async static Task<Post> GetPostByTitleAndDescriptionAsync(string title, string description, int submitterId)
        {
            List<Post> posts = await PostsRepository.GetPostsAsync();

            Post matchingPost = posts.FirstOrDefault(post => post.Title == title && post.Description == description && post.SubmitterUid == submitterId);

            return matchingPost;
        }




        internal static async Task<int> CreatePostAsync(Post postToCreate)
		{
			using (var db = new AppDBContext())
			{
				try
				{
					await db.Posts.AddAsync(postToCreate);

					await db.SaveChangesAsync();

                    postToCreate.PostId = postToCreate.PostId;

                    return postToCreate.PostId;

                }
				catch //(Exception e)
				{
					return -1;
				}
			}
		}


        internal static async Task<bool> UpdatePostAsync(Post postToUpdate)
        {
            using (var db = new AppDBContext())
            {
                try
                {
					db.Posts.Update(postToUpdate);

                    return await db.SaveChangesAsync() >= 1;
                }
                catch //(Exception e)
                {
                    return false;
                }
            }
        }



        internal static async Task<bool> DeletePostAsync(int postId)
        {
            using (var db = new AppDBContext())
            {
                try
                {
					Post postToDelete = await GetPostByIdAsync(postId);

					db.Remove(postToDelete);

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

