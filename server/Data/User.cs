using System.ComponentModel.DataAnnotations;
namespace ticket_server.Data
{
	internal sealed class User
	{
		
		[Key]
		public int UserId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string AccessIdString { get; set; } = "0";

        public List<int> AccessIdList { get { return (this.AccessIdString.Split(';').ToList()).Select(int.Parse).ToList(); ; } }
    }
}

