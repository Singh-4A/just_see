
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  Avatar, 
  Box, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Chip,
  Paper
} from '@mui/material';
import { 
  BriefcaseMedical, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  ArrowLeft 
} from 'lucide-react';

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error('Doctor not found');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch doctor');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!doctor) {
    return <Typography>Doctor not found</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button 
        component={Link} 
        to="/doctors" 
        startIcon={<ArrowLeft />}
        sx={{ mb: 3 }}
      >
        Back to Doctors
      </Button>

      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120, 
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {doctor.name.charAt(0)}
              </Avatar>
              
              <Typography variant="h5" gutterBottom>
                {doctor.name}
              </Typography>
              
              <Chip 
                label={doctor.specialty} 
                color="primary" 
                sx={{ mb: 2 }} 
                icon={<BriefcaseMedical size={16} />}
              />
              
              <List sx={{ width: '100%' }}>
                <ListItem>
                  <ListItemIcon>
                    <Phone size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary={doctor.phone || 'Not provided'} 
                  />
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <Mail size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary={doctor.email || 'Not provided'} 
                  />
                </ListItem>
                
                <Divider component="li" />
                
                <ListItem>
                  <ListItemIcon>
                    <MapPin size={20} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Location" 
                    secondary={doctor.location || 'Not provided'} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Details and Appointments */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardHeader
              title="About"
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
              <Typography>
                {doctor.bio || 'No biography available.'}
              </Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Available Slots"
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Button 
                  variant="outlined" 
                  startIcon={<Calendar />}
                  component={Link}
                  to={`/appointments/new?doctorId=${doctor.id}`}
                >
                  Book Appointment
                </Button>
              }
            />
            <CardContent>
              {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
                <Grid container spacing={2}>
                  {doctor.availableSlots.map((slot, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 2, 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <Clock size={18} style={{ marginRight: 8 }} />
                          <Typography>
                            {new Date(slot).toLocaleString([], {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                        <Button 
                          size="small" 
                          variant="contained"
                          component={Link}
                          to={`/appointments/new?doctorId=${doctor.id}&slot=${slot}`}
                        >
                          Book
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="textSecondary">
                  No available slots at the moment.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorProfile;