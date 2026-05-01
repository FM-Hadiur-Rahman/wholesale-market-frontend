import { Link, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { APP_NAME } from "../../lib/constants";
import { loginUser } from "../../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "retailer1@bazaarlink.com",
    password: "123456",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(form);

      if (data.user.role === "supplier") navigate("/supplier/dashboard");
      else if (data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/retailer/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[75vh] max-w-7xl items-center px-4 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <Store size={26} />
          </div>

          <h1 className="mt-4 text-3xl font-black text-slate-950">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your {APP_NAME} account.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="shop@email.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs font-semibold text-slate-500">
          Demo: retailer1@bazaarlink.com / 123456
        </p>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link to="/register" className="font-bold text-emerald-700">
            Create account
          </Link>
        </p>
      </div>
    </section>
  );
}
