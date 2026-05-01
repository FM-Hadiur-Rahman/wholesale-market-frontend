import { Link, useNavigate } from "react-router-dom";
import { Building2, Store } from "lucide-react";
import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { registerUser } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("retailer");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    businessName: "",
    area: "",
    email: "",
    password: "",
    businessType: "pharmacy",
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

      const data = await registerUser({
        ...form,
        role,
      });

      if (data.user.role === "supplier") navigate("/supplier/dashboard");
      else navigate("/retailer/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto grid min-h-[75vh] max-w-7xl items-center px-4 py-12 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-slate-950">
            Join BazaarLink
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create an account as a retailer shop or wholesale supplier.
          </p>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setRole("retailer")}
            className={`rounded-3xl border-2 p-5 text-left ${
              role === "retailer"
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <Store className="text-emerald-700" size={26} />
            <h3 className="mt-3 font-black text-slate-950">Retailer</h3>
            <p className="mt-1 text-sm text-slate-500">
              I want to order wholesale products.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setRole("supplier")}
            className={`rounded-3xl border-2 p-5 text-left ${
              role === "supplier"
                ? "border-emerald-500 bg-emerald-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <Building2 className="text-slate-700" size={26} />
            <h3 className="mt-3 font-black text-slate-950">Supplier</h3>
            <p className="mt-1 text-sm text-slate-500">
              I want to sell wholesale products.
            </p>
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
          />

          <Input
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+880 17..."
          />

          <Input
            label="Business name"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Rahman Pharmacy"
          />

          <Input
            label="Business area"
            name="area"
            value={form.area}
            onChange={handleChange}
            placeholder="Mirpur, Dhaka"
          />

          <Input
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />

          <Button className="sm:col-span-2" size="lg" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-emerald-700">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
