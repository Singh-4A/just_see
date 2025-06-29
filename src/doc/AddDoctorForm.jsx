import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BriefcaseMedical, Plus } from "lucide-react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddDoctorForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        phone: '',
        availableSlots: []// initialize properly
    });
    const [newSlot, setNewSlot] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSlot = () => {
        if (!newSlot) return;
        setFormData(prev => ({
            ...prev,
            availableSlots: [...prev.availableSlots, newSlot]
        }));
        setNewSlot(null);
    };

    const handleRemoveSlot = (index) => {
        setFormData(prev => ({
            ...prev,
            availableSlots: prev.availableSlots.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.specialty) {
            setError('Name and specialty are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/doctors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    availableSlots: formData.availableSlots.map(slot => slot.toISOString())
                }),
            });

            if (!response.ok) throw new Error('Failed to add doctor');
            navigate('/doctors');
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <CardHeader
                title={
                    <Box display="flex" alignItems="center">
                        <BriefcaseMedical style={{ marginRight: 8 }} />
                        <Typography variant="h6">Add New Doctor</Typography>
                    </Box>
                }
            />
            <form onSubmit={handleSubmit}>
                <CardContent>
                    {error && <Typography color="error" paragraph>{error}</Typography>}

                    <TextField
                        fullWidth label="Name" name="name" value={formData.name}
                        onChange={handleInputChange} margin="normal" required
                    />
                    <TextField
                        fullWidth label="Specialty" name="specialty" value={formData.specialty}
                        onChange={handleInputChange} margin="normal" required
                    />
                    <TextField
                        fullWidth label="Phone Number" name="phone" value={formData.phone}
                        onChange={handleInputChange} margin="normal"
                    />

                    <Typography variant="subtitle1" sx={{ mt: 2 }}>Available Slots</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box display="flex" alignItems="center" gap={2} mt={2}>
                            <DateTimePicker
                                label="New Slot"
                                value={newSlot}
                                onChange={slot => setNewSlot(slot)}
                                renderInput={params => <TextField {...params} fullWidth />}
                            />
                            <Button
                                variant="outlined"
                                onClick={handleAddSlot}
                                disabled={!newSlot}
                            >
                                Add Slot
                            </Button>
                        </Box>
                    </LocalizationProvider>

                    {formData.availableSlots.length > 0 && (
                        <Box mt={2}>
                            {formData.availableSlots.map((slot, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    p={1}
                                    sx={{ borderBottom: '1px solid #eee' }}
                                >
                                    <Typography>{slot.toLocaleString()}</Typography>
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={() => handleRemoveSlot(index)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        startIcon={<Plus />}
                    >
                        Add Doctor
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

export default AddDoctorForm;
