import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const WhatsAppContact = () => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <Card>
      <CardHeader
        // avatar={<Message />}
        title="WhatsApp Contact"
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Typography variant="subtitle2">Phone Number</Typography>
            <input
              type="tel" placeholder="+1234567890"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Typography variant="subtitle2">Message</Typography>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>
          <Button variant="contained" type="submit">Send WhatsApp Message</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WhatsAppContact