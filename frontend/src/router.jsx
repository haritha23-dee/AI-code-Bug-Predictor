import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import AdminRoute from './routes/AdminRoute';
import Spinner from './components/ui/Spinner';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/AdminLayout';

const Landing = lazy(() => import('./pages/Landing'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const UseCases = lazy(() => import('./pages/UseCases'));
const Terms = lazy(() => import('./pages/Terms'));
const Tools = lazy(() => import('./pages/Tools'));
const Privacy = lazy(() => import('./pages/Privacy'));

const SignInPage = lazy(() => import('./pages/auth/SignInPage'));
const SignUpPage = lazy(() => import('./pages/auth/SignUpPage'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const AdminLoginPage = lazy(() => import('./pages/auth/AdminLoginPage'));
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback'));

const UserDashboard = lazy(() => import('./pages/user/UserDashboard'));
const ProjectDetail = lazy(() => import('./pages/user/ProjectDetail'));
const FileAnalysisView = lazy(() => import('./pages/user/FileAnalysisView'));
const UserProfile = lazy(() => import('./pages/user/UserProfile'));
const UserHistory = lazy(() => import('./pages/user/UserHistory'));

const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner full />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/files/:fileId" element={<FileAnalysisView />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/history" element={<UserHistory />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Navigate to="/admin/overview" replace />} />
            <Route path="/admin/overview" element={<AdminOverview />} />
            <Route path="/admin/profile" element={<UserProfile />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<div>Not authorized</div>} />
        <Route path="*" element={<div>404 — Page not found</div>} />
      </Routes>
    </Suspense>
  );
}