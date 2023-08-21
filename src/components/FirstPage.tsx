import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";

const FirstPage:React.FC = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPhone(newVal)
        if(newVal.length !== 10) {
            setError("Enter a valid 10-digit number");
        }
        if(!/^\d+$/.test(newVal)) {
            setError("Input must contain only digits");
        } 
        else{
            setError("");
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userDetails = { name, phone, email };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/second");
    };

    return (
        <Box display="flex">
            <Box>
                <img style={{ width: "73vw", height: "97.5vh" }} src="./assets/login.jpg" alt="login image" />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" gap="10px" justifyContent="center" >
                <Typography variant="h4" color="#352F44">User Login</Typography>
                <form onSubmit={handleSubmit} style={{ width: "60%" }}>
                    <TextField required sx={{ marginBottom: "10px" }} label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField required sx={{ marginBottom: "10px" }} label="Phone" error={error !== ''} value={phone} onChange={handlePhoneChange} fullWidth />
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField required sx={{ marginBottom: "10px" }} label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    <Button type="submit" variant="contained" fullWidth>
                        Submit
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default FirstPage;
