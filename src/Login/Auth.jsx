import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Navbar from "../Hero/Navbar";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // SEND OTP
  const sendOTP = async () => {
    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://egoss.onrender.com/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to send OTP");
        return;
      }

      setStep(2);
      setMessage("OTP sent to your email ✅");
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const verifyOTP = async () => {
    if (!otp.trim()) {
      setMessage("OTP is required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://egoss.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            otp: otp.trim(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Invalid OTP");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ SAVE LOGGED-IN USER EMAIL
      localStorage.setItem("userEmail", email.trim());

      setMessage("Login successful ✅");

      // ✅ REDIRECT AFTER LOGIN
      setTimeout(() => {
        navigate("/Orders");
      }, 1000);

    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-wrapper">
        <div className="auth-box">
          <h2>OTP Login</h2>

          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={sendOTP} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOTP} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

          {message && <p className="msg">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Auth;
