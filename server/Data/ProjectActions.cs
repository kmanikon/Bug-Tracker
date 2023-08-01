using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ticket_server.Data
{
    internal sealed class ProjectActions
    {
        [Required]
        [Key]
        public int ActionId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [MaxLength(100)]
        public string ActionString { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string UserName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string UserEmail { get; set; } = string.Empty;

        [Required]
        public int UserId { get; set; }



        // ticket info
        [Required]
        public int PostId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public int ProjectId { get; set; }


        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;




        [Required]
        [MaxLength(1000)]
        public string AsignedDev { get; set; } = string.Empty;


        [Required]
        [MaxLength(1000)]
        public string AsignedDevEmail { get; set; } = string.Empty;

        [Required]
        public int AsignedDevUid { get; set; }



        [Required]
        [MaxLength(1000)]
        public string Submitter { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string SubmitterEmail { get; set; } = string.Empty;

        [Required]
        public int SubmitterUid { get; set; }



        [Required]
        [MaxLength(100)]
        public string TicketPrio { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string TicketStatus { get; set; } = string.Empty;


        [Required]
        [MaxLength(100)]
        public string TicketType { get; set; } = string.Empty;

        [Required]
        public int TicketNumber { get; set; }



        [Required]
        public DateTime SubmitDate { get; set; }

        [Required]
        public DateTime ModifyDate { get; set; }

        [Required]
        [MaxLength(1000)]
        public string ReadString { get; set; } = "0F";


    }
    
}

