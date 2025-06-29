import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { BriefcaseMedical, Clock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/doctors')
            .then(r => r.json())
            .then(setDoctors)
            .catch(err => console.error('Fetch doctors failed:', err));
    }, []);
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5">Doctors</Typography>
                <Button 
                    variant="contained" 
                    startIcon={<Plus size={20} />}
                    component={Link}
                    to="/doctors/add"
                >
                    Add Doctor
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctors.map(doc => (
                    <Card key={doc.id} sx={{ '&:hover': { boxShadow: 6 }, transition: '0.3s' }}>
                        <CardHeader
                            avatar={<BriefcaseMedical />}
                            title={doc.name}
                            subheader={doc.specialty}
                        />
                        <CardContent>
                            <Typography variant="body2">
                                <Clock size={16} /> Available slots: {doc.availableSlots.length}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small"   component={Link} to={`/doctors/${doc?._id}`}>View Profile</Button>
                            <Button size="small" component={Link} to={`/appointments/new?doctorId=${doc.id}`}>
                                Book Appointment
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DoctorsList;