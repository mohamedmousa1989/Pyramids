import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',

























































































































































































































































        vc 
















        password: '',
        password2: '',  // Changed from confirmPassword to password2 to match Django
        first_name: '', // Added to match Django User model
        last_name: ''   // Added to match Django User model
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        if (!formData.username || !formData.email || !formData.password || !formData.password2) {
            setError('All fields are required');
            return false;
        }
        if (formData.password !== formData.password2) {
            setError('Passwords do not match');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password2: formData.password2,
                first_name: formData.first_name,
                last_name: formData.last_name
            });

            if (response.status === 'success' || response.id) {  // Adjust based on your API response
                navigate('/login');
            }
        } catch (err) {
            // Handle different types of errors
            if (err.response?.data) {
                // Handle validation errors from Django
                const serverErrors = err.response.data;
                let errorMessage = '';
                
                // Convert Django validation errors to readable format
                Object.keys(serverErrors).forEach(key => {
                    if (Array.isArray(serverErrors[key])) {
                        errorMessage += `${key}: ${serverErrors[key].join(', ')}\n`;
                    } else {
                        errorMessage += `${key}: ${serverErrors[key]}\n`;
                    }
                });
                
                setError(errorMessage || 'Registration failed. Please try again.');
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                {error && (
                    <Typography 
                        color="error" 
                        align="center" 
                        gutterBottom 
                        style={{ whiteSpace: 'pre-line' }}
                    >
                        {error}
                    </Typography>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        label="Username"
                        fullWidth
                        margin="normal"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="first_name"
                        label="First Name"
                        fullWidth
                        margin="normal"
                        value={formData.first_name}
                        onChange={handleChange}
                    />
                    <TextField
                        name="last_name"
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        value={formData.last_name}
                        onChange={handleChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        helperText="Password must be at least 8 characters long"
                    />
                    <TextField
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={formData.password2}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Register'}
                    </Button>

                    <Typography align="center" style={{ marginTop: '20px' }}>
                        Already have an account? <Link to="/login">Login here</Link>
                    </Typography>
                </form>
            </Paper>
        </Container>
    );
}

export default Register;