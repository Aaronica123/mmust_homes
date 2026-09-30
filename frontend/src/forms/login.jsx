import { Button, TextField } from "@radix-ui/themes";
import { client } from "../axios/supabase.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import house from "../assets/image_house_1.png";
 
const styles = `
.hf-page {
  --hf-900: #0f3d24;
  --hf-700: #166534;
  --hf-600: #15803d;
  --hf-500: #16a34a;
  --hf-100: #dcfce7;
  --hf-50: #f0fdf4;
  --hf-ink: #10251a;
  --hf-muted: #5b6f63;
  height: 100dvh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--hf-ink);
}
 
/* ---------- Form side ---------- */
.hf-form-side {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at 15% 10%, var(--hf-100) 0, transparent 45%),
    var(--hf-50);
  overflow-y: auto;
}
.hf-card {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border: 1px solid #d7ecdd;
  border-top: 4px solid var(--hf-600);
  border-radius: 16px;
  padding: 36px 32px 30px;
  box-shadow: 0 18px 40px -18px rgba(15, 61, 36, 0.35);
}
.hf-title {
  margin: 0 0 6px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--hf-900);
}
.hf-sub {
  margin: 0 0 26px;
  font-size: 15px;
  color: var(--hf-muted);
}
.hf-field { margin-bottom: 18px; }
.hf-label {
  display: block;
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 600;
  color: var(--hf-900);
}
.hf-input {
  width: 100%;
  background: #fbfefc;
  box-shadow: inset 0 0 0 1.5px #c6dfce;
  border-radius: 10px;
  transition: box-shadow 0.15s ease, background 0.15s ease;
}
.hf-input input {
  font-size: 16px;
  color: var(--hf-ink);
}
.hf-input input::placeholder { color: #8ea496; }
.hf-input:hover { box-shadow: inset 0 0 0 1.5px #8fc4a0; }
.hf-input:focus-within {
  outline: none;
  background: #fff;
  box-shadow: inset 0 0 0 2px var(--hf-500), 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hf-toggle {
  background: none;
  border: none;
  padding: 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--hf-700);
  cursor: pointer;
}
.hf-toggle:hover { text-decoration: underline; }
.hf-toggle:focus-visible { outline: 2px solid var(--hf-500); border-radius: 4px; }
.hf-error {
  margin: 0 0 14px;
  padding: 10px 12px;
  font-size: 14px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}
.hf-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 8px; }
.hf-actions button { width: 100%; height: 44px; font-size: 15px; font-weight: 600; cursor: pointer; }
.hf-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: var(--hf-muted);
}
.hf-divider::before, .hf-divider::after { content: ""; flex: 1; height: 1px; background: #d7ecdd; }
 
/* ---------- Image side ---------- */
.hf-hero {
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 48px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
}
.hf-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 61, 36, 0.25) 0%, rgba(15, 61, 36, 0.92) 100%);
}
.hf-hero-text { position: relative; max-width: 440px; color: #fff; }
.hf-hero-text h2 {
  margin: 0 0 12px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  line-height: 1.12;
  font-weight: 700;
}
.hf-hero-text p {
  margin: 0;
  font-size: 17px;
  line-height: 1.55;
  color: #d8f3e1;
}
 
@media (max-width: 860px) {
  .hf-page { grid-template-columns: 1fr; }
  .hf-hero { display: none; }
}
@media (max-width: 420px) {
  .hf-card { padding: 28px 20px 24px; }
}
`;
 
export default function Login() {
  const [form, setform] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
 
  const change = (e) => {
    const { name, value } = e.target;
    setform((data) => ({ ...data, [name]: value }));
  };
 
  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error } = await client.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);
 
    if (data?.user) {
      nav("/houses");
    } else {
      console.log(error);
      setError("We couldn't sign you in. Check your email and password and try again.");
    }
  };
 
  const move = () => nav("/create_user");
 
  return (
    <>
      <style>{styles}</style>
      <div className="hf-page">
        {/* Left: login card */}
        <div className="hf-form-side">
          <form className="hf-card" onSubmit={login}>
            <h1 className="hf-title">Welcome back</h1>
            <p className="hf-sub">Sign in to continue your house hunt.</p>
 
            {error && <p className="hf-error" role="alert">{error}</p>}
 
            <div className="hf-field">
              <label className="hf-label" htmlFor="email">Email</label>
              <TextField.Root
                id="email"
                className="hf-input"
                size="3"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={change}
                placeholder="you@example.com"
              />
            </div>
 
            <div className="hf-field">
              <label className="hf-label" htmlFor="password">Password</label>
              <TextField.Root
                id="password"
                className="hf-input"
                size="3"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={form.password}
                onChange={change}
                placeholder="Enter your password"
              >
                <TextField.Slot side="right">
                  <button
                    type="button"
                    className="hf-toggle"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </TextField.Slot>
              </TextField.Root>
            </div>
 
            <div className="hf-actions">
              <Button type="submit" color="green" variant="solid" size="3" loading={loading}>
                Log in
              </Button>
              <div className="hf-divider">New here?</div>
              <Button type="button" color="green" variant="outline" size="3" onClick={move}>
                Create an account
              </Button>
            </div>
          </form>
        </div>
 
        {/* Right: image + message */}
        <div className="hf-hero" style={{ backgroundImage: `url(${house})` }}>
          <div className="hf-hero-text">
            <h2>Your next home is closer than you think.</h2>
            <p>
              Browse listings, compare neighbourhoods and shortlist the places
              you love, all in one spot.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
 