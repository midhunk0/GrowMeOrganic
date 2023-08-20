import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, Checkbox, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface Department {
  department: string;
  sub_departments: string[];
}

const departmentsData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList: React.FC = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const handleDepartmentIconClick = (department: string) => {
    if (expandedDepartments.includes(department)) {
      setExpandedDepartments(expandedDepartments.filter((dept) => dept !== department));
    } else {
      setExpandedDepartments([...expandedDepartments, department]);
    }
  };

  const handleDepartmentCheckboxChange = (department: string) => {
    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(selectedDepartments.filter((dept) => dept !== department));
      setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => !departmentsData.find((dept) => dept.department === department)?.sub_departments.includes(subDept)));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
      setSelectedSubDepartments([
        ...selectedSubDepartments,
        ...(departmentsData.find((dept) => dept.department === department)?.sub_departments || []),
      ]);
    }
  };

  const handleSubDepartmentClick = (subDepartment: string, department: string) => {
    const selectedIdx = selectedSubDepartments.indexOf(subDepartment);
    let updatedSelected: string[] = [];

    if (selectedIdx === -1) {
      updatedSelected = [...selectedSubDepartments, subDepartment];
    } else {
      updatedSelected = selectedSubDepartments.filter((item) => item !== subDepartment);
    }

    setSelectedSubDepartments(updatedSelected);

    const departmentSubDepartments = departmentsData.find((item) => item.department === department)?.sub_departments;
    if (departmentSubDepartments && updatedSelected.length === departmentSubDepartments.length) {
      setSelectedDepartments((prevSelected) => [...prevSelected, department]);
    } else {
      setSelectedDepartments((prevSelected) => prevSelected.filter((item) => item !== department));
    }
  };

  return (
    <Box>
      <List>
        {departmentsData.map((dept) => (
          <Accordion key={dept.department} expanded={expandedDepartments.includes(dept.department)}>
            <AccordionSummary
              expandIcon={<ExpandMore style={{ cursor: "pointer" }} onClick={() => handleDepartmentIconClick(dept.department)} />}
              aria-controls={`${dept.department}-content`}
              id={`${dept.department}-header`}
            >
              <Checkbox
                style={{ cursor: "pointer" }}
                checked={selectedDepartments.includes(dept.department)}
                onChange={() => handleDepartmentCheckboxChange(dept.department)}
                onClick={(e) => e.stopPropagation()} // Prevent checkbox click from expanding accordion
              />
              <ListItemText primary={dept.department} style={{cursor:"default"}}/>
            </AccordionSummary>
            <AccordionDetails>
              <List component="div" disablePadding>
                {dept.sub_departments.map((subDept) => (
                  <ListItem key={subDept} sx={{ pl: 4 }} style={{cursor:"default"}}>
                    <Checkbox
                      style={{ cursor: "pointer" }}
                      checked={selectedSubDepartments.includes(subDept)}
                      onChange={() => handleSubDepartmentClick(subDept, dept.department)}
                    />
                    <ListItemText primary={subDept} style={{cursor:"default"}}/>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
