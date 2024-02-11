using System.ComponentModel.DataAnnotations;
namespace ticket_server.Data
{
    internal sealed class Workflow
    {

        [Key]
        public int WorkflowId { get; set; }

        public int ProjectId { get; set; }

        [MaxLength(10000)]
        public string NodesJSON { get; set; } = string.Empty;

        [MaxLength(10000)]
        public string EdgesJSON { get; set; } = string.Empty;
    }
}
