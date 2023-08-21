import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText, Checkbox, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import departmentsData from "./data.json"; 

const DepartmentList: React.FC = () => {
    const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

    useEffect(() => {
        const updatedSelectedDepartments: string[] = [];

        for (const dept of departmentsData) {
            const subDepartments = dept.sub_departments;
            if (subDepartments.every((subDept) => selectedSubDepartments.includes(subDept))) {
                updatedSelectedDepartments.push(dept.department);
            }
        }

        setSelectedDepartments(updatedSelectedDepartments);
    }, [selectedSubDepartments]);

    const handleDepartmentIconClick = (department: string) => {
        if (expandedDepartments.includes(department)) {
            setExpandedDepartments(expandedDepartments.filter((dept) => dept !== department));
        } 
        else {
            setExpandedDepartments([...expandedDepartments, department]);
        }
    };

    const handleDepartmentCheckboxChange = (department: string) => {
        const departmentSubDepartments = departmentsData.find((dept) => dept.department === department)?.sub_departments;

        if (!departmentSubDepartments) return;

        if (selectedDepartments.includes(department)) {
            setSelectedDepartments(selectedDepartments.filter((dept) => dept !== department));
            setSelectedSubDepartments(selectedSubDepartments.filter((subDept) => !departmentSubDepartments.includes(subDept)));
        } 
        else {
            setSelectedDepartments([...selectedDepartments, department]);
            setSelectedSubDepartments([...selectedSubDepartments, ...departmentSubDepartments]);
        }
    };

    const handleSubDepartmentClick = (subDepartment: string, department: string) => {
        const selectedIdx = selectedSubDepartments.indexOf(subDepartment);
        let updatedSelected: string[] = [];

        if (selectedIdx === -1) {
            updatedSelected = [...selectedSubDepartments, subDepartment];
        } 
        else {
            updatedSelected = selectedSubDepartments.filter((item) => item !== subDepartment);
        }
        setSelectedSubDepartments(updatedSelected);

        const departmentSubDepartments = departmentsData.find((item) => item.department === department)?.sub_departments;
        if (departmentSubDepartments && updatedSelected.length === departmentSubDepartments.length) {
            setSelectedDepartments((prevSelected) => [...prevSelected, department]);
        } 
        else {
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
                                onClick={(e) => e.stopPropagation()} 
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
