import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const DashboardCard = ({ icon, title, value, link }) => (
    <Card sx={{ '&:hover': { boxShadow: 6 }, transition: '0.3s' }}>
        <CardHeader
            avatar={icon}
            title={<Typography variant="body2" color="textSecondary">{title}</Typography>}
            sx={{ pb: 0 }}
        />
        <CardContent>
            <Typography variant="h4">{value}</Typography>
        </CardContent>
        <CardActions>
            <Button size="small" component={Link} to={link}>View all</Button>
        </CardActions>
    </Card>
);


export default DashboardCard