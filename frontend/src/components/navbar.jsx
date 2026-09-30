import { useState, useEffect } from "react";
import { LayoutDashboard, Building2, Menu, ShoppingCart, LogOut, X, Home } from "lucide-react";
import { Avatar, Button, Text } from "@radix-ui/themes";
import { useNavigate, useLocation } from "react-router-dom";
import { client } from "../axios/supabase";
import Auth_parent from "../auth/auth";

const styles = `
.nb-root {
  --nb-900: #0f3d24;
  --nb-700: #166534;
  --nb-600: #15803d;
  --nb-500: #16a34a;
  --nb-100: #dcfce7;
  --nb-50: #f0fdf4;
  --nb-ink: #10251a;
  --nb-muted: #5b6f63;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  background: var(--nb-50);
  color: var(--nb-ink);
}

/* ---------- Sidebar ---------- */
.nb-side {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
  width: 270px;
  max-width: 85vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 14px;
  background: rgba(247, 253, 249, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-right: 1px solid #d7ecdd;
  box-shadow: 0 0 24px rgba(15, 61, 36, 0.18);
  transition: transform 300ms ease;
}
.nb-side-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  border-bottom: 1px solid #d7ecdd;
}
.nb-user { display: flex; align-items: center; gap: 10px; min-width: 0; }
.nb-role { font-size: 14px; font-weight: 600; color: var(--nb-900); }
.nb-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  color: var(--nb-700);
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.nb-icon-btn:hover { background: var(--nb-100); }
.nb-icon-btn:focus-visible { outline: 2px solid var(--nb-500); outline-offset: 2px; }

.nb-section { margin: 18px 6px 10px; font-size: 13px; font-weight: 600; color: var(--nb-muted); }
.nb-links { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.nb-link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  padding: 11px 14px;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  color: var(--nb-900);
  white-space: nowrap;
  text-align: left;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
.nb-link:hover { background: var(--nb-100); }
.nb-link:focus-visible { outline: 2px solid var(--nb-500); outline-offset: 2px; }
.nb-link.active {
  color: #fff;
  font-weight: 600;
  background: var(--nb-600);
  box-shadow: 0 6px 14px -6px rgba(21, 128, 61, 0.7);
}
.nb-link.active:hover { background: var(--nb-700); }

.nb-foot { padding-top: 14px; border-top: 1px solid #d7ecdd; }
.nb-foot button { width: 100%; height: 42px; font-size: 15px; font-weight: 600; cursor: pointer; }

/* ---------- Backdrop ---------- */
.nb-backdrop {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: rgba(15, 61, 36, 0.18);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: opacity 300ms ease;
}

/* ---------- Main ---------- */
.nb-main { flex: 1; min-width: 0; height: 100%; display: flex; flex-direction: column; }
.nb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: #fff;
  border-bottom: 1px solid #d7ecdd;
  border-top: 3px solid var(--nb-600);
  box-shadow: 0 6px 16px -12px rgba(15, 61, 36, 0.4);
}
.nb-brand { display: flex; align-items: center; gap: 10px; }
.nb-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px; height: 34px;
  color: #fff;
  background: var(--nb-600);
  border-radius: 9px;
}
.nb-brand-name {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  color: var(--nb-900);
  white-space: nowrap;
}
.nb-cart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px;
  color: var(--nb-700);
  background: var(--nb-100);
  border: 1px solid #b7e4c4;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.nb-cart:hover { background: #c6f2d3; }
.nb-cart:focus-visible { outline: 2px solid var(--nb-500); outline-offset: 2px; }
.nb-content { flex: 1; min-height: 0; padding: 14px 18px; overflow: auto; }

@media (max-width: 480px) {
  .nb-brand-name { font-size: 19px; }
  .nb-header { padding: 10px 12px; }
}
`;

export default function NavBar({ children }) {
  const { user } = Auth_parent();
  const [nav, setnav] = useState(true);
  const [wish, setwish] = useState({});
  const route = useNavigate();
  const { pathname } = useLocation();

  const handle_nav = () => setnav(!nav);

  const logout = async () => {
    await client.auth
      .signOut({ scope: "local" })
      .then(() => {
        alert("signed out successfuly");
        route("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const house = async () => {
    const { data, error } = await client
      .schema("mmust_homes")
      .from("profile")
      .select("house_data")
      .match({ user_id: Number(user.user_id) });
    const { data: da, error: er } = await client
      .schema("mmust_homes")
      .from("profile")
      .update({ house_data: { new: "new" } })
      .match({ user_id: Number(user.user_id) })
      .select();
    console.log("data is " + da);
    setwish(data);
    console.log(er);
  };

  useEffect(() => {
    house();
  }, []);

  const go = (path) => {
    setnav(false);
    route(path);
  };

  const role =
    user?.user_role === "provider"
      ? "House Provider"
      : user?.user_role === "finder"
      ? "House Finder"
      : "Welcome";

  return (
    <>
      <style>{styles}</style>
      <div className="nb-root">
        {/* Blurred backdrop: click outside to close */}
        <div
          className="nb-backdrop"
          onClick={handle_nav}
          style={{ opacity: nav ? 1 : 0, pointerEvents: nav ? "auto" : "none" }}
        />

        {/* Sidebar */}
        <aside
          className="nb-side"
          style={{ transform: nav ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="nb-side-head">
            <div className="nb-user">
              <Avatar fallback="MN" color="green" variant="solid" radius="full" />
              <span className="nb-role">{role}</span>
            </div>
            <button type="button" className="nb-icon-btn" onClick={handle_nav} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>

          <p className="nb-section">Main</p>
          <nav className="nb-links">
            <button
              type="button"
              className={`nb-link${pathname.startsWith("/houses") ? " active" : ""}`}
              onClick={() => go("/houses")}
            >
              <LayoutDashboard size={20} />
              <Text>Dashboard</Text>
            </button>

            {user?.user_role == "provider" && (
              <button
                type="button"
                className={`nb-link${pathname.startsWith("/register") ? " active" : ""}`}
                onClick={() => go("/register")}
              >
                <Building2 size={20} />
                <Text>Register</Text>
              </button>
            )}
          </nav>

          <div className="nb-foot">
            <Button type="button" color="red" variant="solid" size="3" onClick={logout}>
              <LogOut size={18} />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main area */}
        <div className="nb-main">
          <header className="nb-header">
            <button type="button" className="nb-icon-btn" onClick={handle_nav} aria-label="Open menu">
              <Menu size={30} />
            </button>

            <div className="nb-brand">
              <span className="nb-logo"><Home size={19} /></span>
              <span className="nb-brand-name">MMUST HOMES</span>
            </div>

            <button type="button" className="nb-cart" aria-label="Cart">
              <ShoppingCart size={26} />
            </button>
          </header>

          <div className="nb-content">{children}</div>
        </div>
      </div>
    </>
  );
}