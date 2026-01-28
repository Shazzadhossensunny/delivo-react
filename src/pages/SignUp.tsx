import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import {
  NameInput,
  EmailInput,
  PasswordInput,
  PhoneInput,
} from "@/components/auth/AuthInput";
import { SocialButtons, OrDivider } from "@/components/auth/SocialButtons";
import { DelivoButton } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
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
    navigate("/verification", { state: { email } });
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
      <div className="px-6 pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Create Account 🚀
          </h1>
          <p className="text-muted-foreground mb-8">
            Sign up to get started with Delivo
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NameInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
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
            <PhoneInput
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              countryCode={countryCode}
              onCountryChange={setCountryCode}
              error={errors.phone}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              error={errors.password}
            />
          </motion.div>

          {/* Terms checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-3"
          >
            <button
              type="button"
              onClick={() => setAcceptTerms(!acceptTerms)}
              className={cn(
                "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                acceptTerms
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30 hover:border-muted-foreground",
              )}
            >
              {acceptTerms && (
                <Check className="w-4 h-4 text-primary-foreground" />
              )}
            </button>
            <p className="text-sm text-muted-foreground">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
          {errors.terms && (
            <p className="text-sm text-destructive">{errors.terms}</p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <DelivoButton
              type="submit"
              isLoading={isLoading}
              className="w-full h-14 mt-4"
            >
              Sign Up
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
            onGoogleClick={() => navigate("/account-setup")}
            onAppleClick={() => navigate("/account-setup")}
            onFacebookClick={() => navigate("/account-setup")}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </motion.p>
      </div>
    </motion.div>
  );
}
