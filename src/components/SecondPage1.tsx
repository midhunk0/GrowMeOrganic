import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Character {
    name: string;
    house: string;
    dateOfBirth: string;
    wand: {
        core: string;
    };
    gender: string;
    eyeColour: string;
    hairColour: string;
    patronus: string;
    species: string;
    actor: string;
}

const SecondPage1: React.FC = () => {
    const [data, setData] = useState<Character[]>([]);

    useEffect(() => {
        fetchData();
        async function fetchData() {
            const url = "https://hp-api.onrender.com/api/characters";
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
                console.log(result);
            } 
            catch (error) {
                console.error(error);
            }
        }
    }, []);

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", width: 150 },
        { field: "house", headerName: "House", width: 150 },
        { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
        {
            field: "wand",
            headerName: "Wand",
            width: 200,
            renderCell: (params) => {
                const wand = params.value;
                return <div>{wand.core}</div>;
            },
        },
        { field: "gender", headerName: "Gender", width: 150 },
        { field: "eyeColour", headerName: "Eye Colour", width: 100 },
        { field: "hairColour", headerName: "Hair Colour", width: 100 },
        { field: "patronus", headerName: "Patronus", width: 150 },
        { field: "species", headerName: "Species", width: 150 },
        { field: "actor", headerName: "Actor", width: 150 },
    ];

    if (!data) return <div>Loading...</div>;

    return (
        <Box
            height="780px" width= "100%"                  
            sx={{
                "& .MuiDataGrid-columnHeaders":{
                    backgroundColor:"#B9B4C7",
                },
                "& .MuiDataGrid-virtualScroller":{
                    backgroundColor:"#FAF0E6"
                },
                "& .MuiDataGrid-footerContainer":{
                    backgroundColor:"#B9B4C7",
                }
            }}
        >
            <DataGrid rows={data} columns={columns} />
        </Box>
    );
};

export default SecondPage1;
