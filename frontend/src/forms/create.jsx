import { Button, TextField } from "@radix-ui/themes";
import { useState } from "react";
import axios_client from "../axios/axios";
import { useNavigate } from "react-router-dom";
 
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
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--hf-ink);
  background:
    radial-gradient(circle at 10% 8%, var(--hf-100) 0, transparent 42%),
    radial-gradient(circle at 92% 95%, var(--hf-100) 0, transparent 38%),
    var(--hf-50);
}
.hf-card {
  width: 100%;
  max-width: 580px;
  background: #fff;
  border: 1px solid #d7ecdd;
  border-top: 4px solid var(--hf-600);
  border-radius: 16px;
  padding: 44px 44px 36px;
  box-sizing: border-box;
  box-shadow: 0 18px 40px -18px rgba(15, 61, 36, 0.35);
}
.hf-title {
  margin: 0 0 6px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.15;
  color: var(--hf-900);
}
.hf-sub {
  margin: 0 0 30px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--hf-muted);
}
.hf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 18px;
}
.hf-full { grid-column: 1 / -1; }
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
.hf-input input { font-size: 16px; color: var(--hf-ink); }
.hf-input input::placeholder { color: #8ea496; }
.hf-input:hover { box-shadow: inset 0 0 0 1.5px #8fc4a0; }
.hf-input:focus-within {
  outline: none;
  background: #fff;
  box-shadow: inset 0 0 0 2px var(--hf-500), 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hf-select {
  width: 100%;
  height: var(--space-7, 44px);
  min-height: 44px;
  padding: 0 40px 0 12px;
  font: inherit;
  font-size: 16px;
  color: var(--hf-ink);
  background: #fbfefc url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23166534' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center;
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 0 0 1.5px #c6dfce;
  appearance: none;
  cursor: pointer;
  transition: box-shadow 0.15s ease, background-color 0.15s ease;
}
.hf-select:hover { box-shadow: inset 0 0 0 1.5px #8fc4a0; }
.hf-select:focus {
  outline: none;
  background-color: #fff;
  box-shadow: inset 0 0 0 2px var(--hf-500), 0 0 0 4px rgba(22, 163, 74, 0.18);
}
.hf-select:invalid { color: #8ea496; }
.hf-select option { color: var(--hf-ink); }
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
  margin: 0 0 20px;
  padding: 10px 12px;
  font-size: 14px;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
}
.hf-actions { margin-top: 30px; }
.hf-actions button { width: 100%; height: 46px; font-size: 15px; font-weight: 600; cursor: pointer; }
.hf-foot {
  margin: 22px 0 0;
  text-align: center;
  font-size: 14px;
  color: var(--hf-muted);
}
.hf-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-weight: 600;
  color: var(--hf-700);
  cursor: pointer;
}
.hf-link:hover { text-decoration: underline; }
.hf-link:focus-visible { outline: 2px solid var(--hf-500); border-radius: 4px; }
 
@media (max-width: 560px) {
  .hf-page { padding: 20px 14px; }
  .hf-card { padding: 30px 22px 26px; }
  .hf-grid { grid-template-columns: 1fr; }
}
`;
 
export default function Create_user() {
  const [form, setform] = useState({
    user_id: "",
    user_email: "",
    first_name: "",
    last_name: "",
    user_role: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
 
  const changeform = (e) => {
    const { name, value } = e.target;
    setform((data) => ({ ...data, [name]: value }));
  };
 
  const create = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await axios_client.post("/api/register", {
        user_id: form.user_id,
        user_email: form.user_email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
        user_role: form.user_role,
      });
      if (data.status == 200 || data.status == 201) {
        nav("/");
      } else {
        console.log(data.data);
        setError("We couldn't create your account. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.message ||
          "We couldn't create your account. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="hf-page">
        <form className="hf-card" onSubmit={create}>
          <h1 className="hf-title">Create your account</h1>
          <p className="hf-sub">
            Join to find a home you love, or to list your property for people
            who are looking.
          </p>
 
          {error && <p className="hf-error" role="alert">{error}</p>}
 
          <div className="hf-grid">
            <div>
              <label className="hf-label" htmlFor="first_name">First name</label>
              <TextField.Root
                id="first_name"
                className="hf-input"
                size="3"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                value={form.first_name}
                onChange={changeform}
                placeholder="Jane"
              />
            </div>
 
            <div>
              <label className="hf-label" htmlFor="last_name">Last name</label>
              <TextField.Root
                id="last_name"
                className="hf-input"
                size="3"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                value={form.last_name}
                onChange={changeform}
                placeholder="Doe"
              />
            </div>
 
            <div className="hf-full">
              <label className="hf-label" htmlFor="user_email">Email</label>
              <TextField.Root
                id="user_email"
                className="hf-input"
                size="3"
                name="user_email"
                type="email"
                autoComplete="email"
                required
                value={form.user_email}
                onChange={changeform}
                placeholder="you@example.com"
              />
            </div>
 
            <div>
              <label className="hf-label" htmlFor="user_id">User ID</label>
              <TextField.Root
                id="user_id"
                className="hf-input"
                size="3"
                name="user_id"
                type="number"
                required
                value={form.user_id}
                onChange={changeform}
                placeholder="Enter your ID number"
              />
            </div>
 
            <div>
              <label className="hf-label" htmlFor="user_role">I am a</label>
              <select
                id="user_role"
                className="hf-select"
                name="user_role"
                required
                value={form.user_role}
                onChange={changeform}
              >
                <option value="" disabled>Choose a role</option>
                <option value="finder">House Finder</option>
                <option value="provider">House Provider</option>
              </select>
            </div>
 
            <div className="hf-full">
              <label className="hf-label" htmlFor="password">Password</label>
              <TextField.Root
                id="password"
                className="hf-input"
                size="3"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={form.password}
                onChange={changeform}
                placeholder="Create a password"
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
          </div>
 
          <div className="hf-actions">
            <Button type="submit" color="green" variant="solid" size="3" loading={loading}>
              Create account
            </Button>
          </div>
 
          <p className="hf-foot">
            Already have an account?{" "}
            <button type="button" className="hf-link" onClick={() => nav("/")}>
              Log in
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
 