import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([{ name: "arjun", specialty: "hjhg", _id: '7hjguykyuf' }]);
    const [patients, setPatients] = useState([{ name: 'sa' }]);
    const [data, setData] = useState({ doctorId: '', patientId: '', dateTime: '', notes: '' });
    useEffect(() => {
        let isMounted = true;

        const getDoc = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/doctors');
                const data = await res.json();
                if (isMounted) setDoctors(data);
            } catch (err) {
                console.error('Failed to fetch doctors', err);
            }
        };

        const getPatients = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/patients');
                const data = await res.json();
                if (isMounted) setPatients(data);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            }
        };

        getDoc();
        getPatients();

        return () => {
            isMounted = false;
        };
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e, "hhi")
        fetch('http://localhost:5000/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(r => r.json()).then(() => {
            alert('Appointment scheduled successfully!');
            setData({ doctorId: '', patientId: '', dateTime: '', notes: '' });
        });
    };

    return (
        <Card>
            <CardHeader title="New Appointment" />
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Typography variant="subtitle2">Doctor</Typography>
                        <select
                            className="w-full p-2 border rounded"
                            value={data.doctorId}
                            onChange={e => setData({ ...data, doctorId: e.target.value })}
                            required>
                            <option value="">Select Doctor</option>
                            {doctors.map(d => (
                                <option key={d._id} value={d._id}>Dr. {d.name} ({d.specialty})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Typography variant="subtitle2">Patient</Typography>
                        <select
                            className="w-full p-2 border rounded"
                            value={data.patientId}
                            onChange={e => setData({ ...data, patientId: e.target.value })}
                            required>
                            <option value="">Select Patient</option>
                            {patients.map(p => (
                                <option key={p._id} value={p._id}>{p.name} ({p.phone})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Typography variant="subtitle2">Date & Time</Typography>
                        <input
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                            value={data.dateTime}
                            onChange={e => setData({ ...data, dateTime: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <Typography variant="subtitle2">Notes</Typography>
                        <textarea
                            className="w-full p-2 border rounded"
                            rows={3}
                            value={data.notes}
                            onChange={e => setData({ ...data, notes: e.target.value })}
                        />
                    </div>
                    <Button variant="contained" type="submit">Schedule Appointment</Button>
                </form>
            </CardContent>
        </Card>
    );
};


export default AppointmentForm