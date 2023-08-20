import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";

const FirstPage = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPhone(newVal)
        if(newVal.length !== 10) {
            setErrorMessage('Enter a valid 10-digit number');
        }
        if(!/^\d+$/.test(newVal)) {
            setErrorMessage('Input must contain only digits');
        } 
        else{
            setErrorMessage('');
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));
        navigate("/second");
    };

    return (
        <Box display="flex">
            <Box width="100%" height="100%">
                <img style={{ width: "73vw", height: "97.5vh" }} src="./assets/login.jpg" alt="login image" />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" gap="10px" justifyContent="center" width="100%">
                <Typography variant="h4" color="#352F44">User Login</Typography>
                <form onSubmit={handleSubmit} style={{ width: "60%" }}>
                    <TextField required sx={{ marginBottom: "10px" }} label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField required sx={{ marginBottom: "10px" }} label="Phone" error={errorMessage !== ''} value={phone} onChange={handlePhoneChange} fullWidth />
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
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
