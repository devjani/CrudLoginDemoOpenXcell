using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static OpenXcelDemo.Utility.Enums;

namespace OpenXcelDemo.Context
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public int Gender { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public string ContactNo { get; set; }
    }
}
