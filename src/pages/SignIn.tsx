import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EmailInput, PasswordInput } from "@/components/auth/AuthInput";
import { SocialButtons, OrDivider } from "@/components/auth/SocialButtons";
import { DelivoButton } from "@/components/common/Button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function SignIn() {
  const navigate = useNavigate();
  const [, setIsLoggedIn] = useLocalStorage("delivo_logged_in", false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsLoggedIn(true);
    navigate("/home", { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="p-5 pt-12">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-card flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Welcome Back! 👋
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign in to continue with Delivo
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex justify-end"
          >
            <Link
              to="/forgot-password"
              className="text-sm text-primary font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DelivoButton
              type="submit"
              isLoading={isLoading}
              className="w-full h-14 mt-4"
            >
              Sign In
            </DelivoButton>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <OrDivider className="mb-6" />
          <SocialButtons
            onGoogleClick={() => {
              setIsLoggedIn(true);
              navigate("/home");
            }}
            onAppleClick={() => {
              setIsLoggedIn(true);
              navigate("/home");
            }}
            onFacebookClick={() => {
              setIsLoggedIn(true);
              navigate("/home");
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8 pb-8"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
