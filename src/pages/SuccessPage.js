import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const SuccessPage = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (data) {
                    setUserDetails({
                        name: data.name,
                        email: data.email,
                        role: data.role
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (token) {
            fetchUserData();
        }
    }, [token]);

    const handleDashboardClick = () => {
        if (userDetails?.role === 'admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    if (!userDetails) {
        return null;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography 
                        variant="h5" 
                        color="primary" 
                        gutterBottom 
                        sx={{ fontWeight: 'bold' }}
                    >
                        Logged in Successfully!
                    </Typography>
                    
                    <Box sx={{ my: 3, textAlign: 'left' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#333' }}>
                            User Details:
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Name:</strong> {userDetails.name}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>Email:</strong> {userDetails.email}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDashboardClick}
                        sx={{ mt: 2 }}
                    >
                        Go to Dashboard
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
};

export default SuccessPage;