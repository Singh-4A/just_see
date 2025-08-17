

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export function GoogleAuthLogin() {
    const clientId = process.env.CLIENT_ID
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            // Send Google ID token to backend
            const res = await axios.post(`${process.env.API_END_POINT}google`, {
                token: credentialResponse.credential,
            });

            localStorage.setItem("token", JSON.stringify(res?.data))
            enqueueSnackbar(res?.data?.message, { variant: "success" });
            navigate("/home");
            console.log("Backend JWT:", res);
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div style={{ marginTop: "50px" }}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Login Failed")}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

