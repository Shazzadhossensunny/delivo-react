import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SplashSkeleton,
  HomeSkeleton,
  AuthFormSkeleton,
} from "@/components/common/LoadingSkeleton";

// Lazy load pages for code splitting
const Splash = lazy(() => import("./pages/Splash"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
// const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
// const Verification = lazy(() => import("./pages/Verification"));
// const CreatePassword = lazy(() => import("./pages/CreatePassword"));
// const AccountSetup = lazy(() => import("./pages/AccountSetup"));
const Home = lazy(() => import("./pages/Home"));
// const MenuDetail = lazy(() => import("./pages/MenuDetail"));
// const Search = lazy(() => import("./pages/Search"));
// const Filter = lazy(() => import("./pages/Filter"));
// const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-hidden shadow-2xl">
          <Suspense fallback={<SplashSkeleton />}>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route
                path="/signin"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <SignIn />
                  </Suspense>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <SignUp />
                  </Suspense>
                }
              />
              {/* <Route
                path="/forgot-password"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <ForgotPassword />
                  </Suspense>
                }
              /> */}
              {/* <Route
                path="/verification"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <Verification />
                  </Suspense>
                }
              />
              <Route
                path="/create-password"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <CreatePassword />
                  </Suspense>
                }
              />
              <Route
                path="/account-setup"
                element={
                  <Suspense fallback={<AuthFormSkeleton />}>
                    <AccountSetup />
                  </Suspense>
                }
              /> */}
              <Route
                path="/home"
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              {/* <Route path="/menu/:id" element={<MenuDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/filter" element={<Filter />} /> */}
              <Route
                path="/favorites"
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/orders"
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="/profile"
                element={
                  <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                  </Suspense>
                }
              />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
