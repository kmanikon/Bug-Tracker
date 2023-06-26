using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ticket_server.Data
{
	internal sealed class Project
	{
		[Key]
		public int ProjectId { get; set; }

        [Required]
        [MaxLength(100)]
        public string ProjectName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string UidString { get; set; } = "0";

        public List<int> UserIdList { get { return (this.UidString.Split(';').ToList()).Select(int.Parse).ToList(); ; } }

    }
}

