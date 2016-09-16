using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string DeliveryOption { get; set; }
        public DateTime DeliveryDate { get; set; }
        public string DeliveryAddress { get; set; }
        public decimal TotalValue { get; set; }
        public ICollection<OrderItem> Items { get; set; }
    }
}