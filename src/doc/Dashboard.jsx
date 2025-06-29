import { Calendar, Stethoscope, User } from "lucide-react";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <DashboardCard
                icon={<User className="h-6 w-6" />}
                title="Patients"
                value="24"
                link="/patients"
            />
            <DashboardCard
                icon={<Stethoscope className="h-6 w-6" />}
                title="Doctors"
                value="8"
                link="/doctors"
            />
            <DashboardCard
                icon={<Calendar className="h-6 w-6" />}
                title="Appointments"
                value="15"
                link="/appointments"
            />
        </div>
    );
};


export default Dashboard