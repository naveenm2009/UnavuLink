import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { LandingPage } from '../pages/public/LandingPage';
import { ExploreFoodPage } from '../pages/public/ExploreFoodPage';
import { CommunityMapPage } from '../pages/public/CommunityMapPage';
import { LiveImpactPage } from '../pages/public/LiveImpactPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { LoginPage } from '../pages/public/LoginPage';
import { RegisterPage } from '../pages/public/RegisterPage';
import { FoodPassportPage } from '../pages/public/FoodPassportPage';

// Role Dashboards
import { AdminCommandCentre } from '../pages/admin/AdminCommandCentre';
import { DigitalTwinPage } from '../pages/admin/DigitalTwinPage';
import { SafetyIncidentsPage } from '../pages/admin/SafetyIncidentsPage';
import { DonorDashboard } from '../pages/donor/DonorDashboard';
import { DonateFoodForm } from '../components/forms/DonateFoodForm';
import { AcceptorDashboard } from '../pages/acceptor/AcceptorDashboard';
import { NgoDashboard } from '../pages/ngo/NgoDashboard';
import { VolunteerTasksPage } from '../pages/volunteer/VolunteerTasksPage';
import { CommunityHomePage } from '../pages/common-people/CommunityHomePage';

export const AppRouter: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore-food" element={<ExploreFoodPage />} />
        <Route path="/community-map" element={<CommunityMapPage />} />
        <Route path="/live-impact" element={<LiveImpactPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/passport/:batchId" element={<FoodPassportPage />} />
        <Route path="/passport" element={<FoodPassportPage />} />

        {/* Admin Routes */}
        <Route path="/admin/command-centre" element={<AdminCommandCentre />} />
        <Route path="/admin/verifications" element={<AdminCommandCentre />} />
        <Route path="/admin/food-listings" element={<ExploreFoodPage />} />
        <Route path="/admin/rescue-operations" element={<AdminCommandCentre />} />
        <Route path="/admin/safety-incidents" element={<SafetyIncidentsPage />} />
        <Route path="/admin/emergency-mode" element={<AdminCommandCentre />} />
        <Route path="/admin/hotspots" element={<CommunityMapPage />} />
        <Route path="/admin/digital-twin" element={<DigitalTwinPage />} />
        <Route path="/admin/analytics" element={<LiveImpactPage />} />
        <Route path="/admin/audit-logs" element={<AdminCommandCentre />} />

        {/* Donor Routes */}
        <Route path="/donor/dashboard" element={<DonorDashboard />} />
        <Route path="/donor/donate" element={<DonateFoodForm />} />
        <Route path="/donor/listings" element={<DonorDashboard />} />
        <Route path="/donor/requests" element={<DonorDashboard />} />
        <Route path="/donor/rescue-tracking" element={<DonorDashboard />} />
        <Route path="/donor/passports" element={<DonorDashboard />} />
        <Route path="/donor/predictive-surplus" element={<DonorDashboard />} />
        <Route path="/donor/impact-rewards" element={<LiveImpactPage />} />

        {/* Acceptor Routes */}
        <Route path="/acceptor/dashboard" element={<AcceptorDashboard />} />
        <Route path="/acceptor/available-food" element={<ExploreFoodPage />} />
        <Route path="/acceptor/my-requests" element={<AcceptorDashboard />} />
        <Route path="/acceptor/incoming-deliveries" element={<AcceptorDashboard />} />
        <Route path="/acceptor/receipt-confirmation" element={<AcceptorDashboard />} />
        <Route path="/acceptor/food-history" element={<AcceptorDashboard />} />

        {/* NGO Routes */}
        <Route path="/ngo/dashboard" element={<NgoDashboard />} />
        <Route path="/ngo/available-food" element={<ExploreFoodPage />} />
        <Route path="/ngo/my-requests" element={<NgoDashboard />} />
        <Route path="/ngo/rescue-missions" element={<NgoDashboard />} />
        <Route path="/ngo/volunteers" element={<NgoDashboard />} />
        <Route path="/ngo/capacity" element={<NgoDashboard />} />
        <Route path="/ngo/beneficiaries" element={<NgoDashboard />} />
        <Route path="/ngo/distribution" element={<NgoDashboard />} />
        <Route path="/ngo/impact-reports" element={<LiveImpactPage />} />

        {/* Common People & Volunteer Routes */}
        <Route path="/community/home" element={<CommunityHomePage />} />
        <Route path="/community/nearby-food" element={<ExploreFoodPage />} />
        <Route path="/community/map" element={<CommunityMapPage />} />
        <Route path="/community/report-waste" element={<CommunityHomePage />} />
        <Route path="/community/report-need" element={<CommunityHomePage />} />
        <Route path="/community/volunteer-register" element={<CommunityHomePage />} />
        <Route path="/volunteer/tasks" element={<VolunteerTasksPage />} />
        <Route path="/volunteer/history" element={<VolunteerTasksPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};
