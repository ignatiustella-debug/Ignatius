/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PathwayFinder } from './components/PathwayFinder';
import { ProgramsSection } from './components/ProgramsSection';
import { TimetableSection } from './components/TimetableSection';
import { StudiosSection } from './components/StudiosSection';
import { StudentShowcaseSection } from './components/StudentShowcaseSection';
import { TuitionCalculatorSection } from './components/TuitionCalculatorSection';
import { EventsSection } from './components/EventsSection';
import { CourseModal } from './components/CourseModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { ParentStudentPortalPreview } from './components/ParentStudentPortalPreview';
import { LiveAppModal } from './components/LiveAppModal';
import { TeamGraceApp } from './components/TeamGraceApp';
import { CodeRiseApp } from './components/CodeRiseApp';
import { AdvertClinicApp } from './components/AdvertClinicApp';
import { RoboMechApp } from './components/RoboMechApp';
import { BibleQuizApp } from './components/BibleQuizApp';
import { AuthGateScreen } from './components/AuthGateScreen';
import { InteractiveAppPlatform } from './components/InteractiveAppPlatform';
import { OfflineIndicator } from './components/OfflineIndicator';
import { FloatingDownloadSign } from './components/FloatingDownloadSign';
import { Footer } from './components/Footer';
import { Course } from './data/educareData';
import { EducareUser } from './types/auth';

export default function App() {
  // Authentication State: Strict access gate until signed in
  const [currentUser, setCurrentUser] = useState<EducareUser | null>(() => {
    try {
      const saved = localStorage.getItem('educare_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved user:', e);
    }
    return null;
  });

  const [viewMode, setViewMode] = useState<'educare' | 'team-grace' | 'code-rise' | 'advert-clinic' | 'robo-mech' | 'bible-quiz'>('educare');
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState<boolean>(false);
  const [enrollmentCourseId, setEnrollmentCourseId] = useState<string | undefined>(undefined);
  const [portalDemoOpen, setPortalDemoOpen] = useState<boolean>(false);
  const [liveAppModalOpen, setLiveAppModalOpen] = useState<boolean>(false);
  const [liveAppUrl, setLiveAppUrl] = useState<string>('https://team-grace.aistudio.app');
  const [liveAppTitle, setLiveAppTitle] = useState<string>('Team Grace Web App');

  const handleSignIn = (user: EducareUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('educare_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to persist user session:', e);
    }
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('educare_user');
    } catch (e) {
      console.warn('Failed to clear user session:', e);
    }
    setViewMode('educare');
    setSelectedCourseForDetails(null);
    setEnrollmentModalOpen(false);
    setPortalDemoOpen(false);
    setLiveAppModalOpen(false);
  };

  const handleOpenEnrollment = (courseId?: string) => {
    setEnrollmentCourseId(courseId);
    setEnrollmentModalOpen(true);
  };

  const handleOpenCourseDetails = (course: Course) => {
    setSelectedCourseForDetails(course);
  };

  const handleOpenLiveApp = (url: string, title: string) => {
    // Open directly as an interactive application in AI Studio
    if (url === 'internal-code-rise' || url.includes('code-rise')) {
      setViewMode('code-rise');
    } else if (url === 'internal-advert-clinic' || url.includes('advert')) {
      setViewMode('advert-clinic');
    } else if (url === 'internal-robo-mech' || url.includes('robo-mech')) {
      setViewMode('robo-mech');
    } else if (url === 'internal-bible-quiz' || url.includes('bible')) {
      setViewMode('bible-quiz');
    } else {
      setViewMode('team-grace');
    }
  };

  const handleScrollToPrograms = () => {
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToPathway = () => {
    const el = document.getElementById('pathfinder');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // STRICT ACCESS GATE: Visitors must sign in or register before accessing Educare
  if (!currentUser) {
    return <AuthGateScreen onSignIn={handleSignIn} />;
  }

  // If in Team Grace App mode, render the full interactive application directly
  if (viewMode === 'team-grace') {
    return (
      <TeamGraceApp
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBackToEducare={() => setViewMode('educare')}
        onEnrollInTrack={() => {
          setViewMode('educare');
          handleOpenEnrollment('team-grace-web-studio');
        }}
      />
    );
  }

  // If in Code Rise App mode, render the full interactive application directly
  if (viewMode === 'code-rise') {
    return (
      <CodeRiseApp
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBackToEducare={() => setViewMode('educare')}
      />
    );
  }

  // If in Advert Clinic App mode, render the full interactive application directly
  if (viewMode === 'advert-clinic') {
    return (
      <AdvertClinicApp
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBackToEducare={() => setViewMode('educare')}
      />
    );
  }

  // If in Robo Mech App mode, render the full interactive application directly
  if (viewMode === 'robo-mech') {
    return (
      <RoboMechApp
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBackToEducare={() => setViewMode('educare')}
      />
    );
  }

  // If in Bible Quiz App mode, render the full interactive application directly
  if (viewMode === 'bible-quiz') {
    return (
      <BibleQuizApp
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onBackToEducare={() => setViewMode('educare')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
      {/* Strict Top Bar Contract Navigation with Profile & Sign Out */}
      <Navbar
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenEnrollment={handleOpenEnrollment}
        onOpenPortalDemo={() => setPortalDemoOpen(true)}
        onOpenTeamGraceApp={() => setViewMode('team-grace')}
        onOpenCodeRiseApp={() => setViewMode('code-rise')}
        onOpenAdvertClinicApp={() => setViewMode('advert-clinic')}
        onOpenRoboMechApp={() => setViewMode('robo-mech')}
        onOpenBibleQuizApp={() => setViewMode('bible-quiz')}
      />

      <main className="flex-1">
        {/* Hero with Claim-to-Proof adjacency and generated photography */}
        <Hero
          onOpenEnrollment={() => handleOpenEnrollment()}
          onExplorePrograms={handleScrollToPrograms}
          onStartQuiz={handleScrollToPathway}
        />

        {/* Interactive App Platform: Study & Practise any Course App with Beautiful Icons */}
        <InteractiveAppPlatform
          onSelectCourseForStudy={handleOpenCourseDetails}
          onOpenLiveApp={handleOpenLiveApp}
        />

        {/* Interactive Youth Pathway Finder Diagnostic */}
        <PathwayFinder
          onSelectCourse={handleOpenCourseDetails}
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Comprehensive Programs Catalog with zero-pill metadata */}
        <ProgramsSection
          onSelectCourse={handleOpenCourseDetails}
          onOpenEnrollment={handleOpenEnrollment}
          onOpenLiveApp={handleOpenLiveApp}
        />

        {/* Weekly Cohort Timetable & Capacity Tracker */}
        <TimetableSection onOpenEnrollment={handleOpenEnrollment} />

        {/* High-Resolution Studios & Prototyping Labs Showcase */}
        <StudiosSection onBookVisit={() => handleOpenEnrollment()} />

        {/* Student Hall of Fame & Attributable Testimonials */}
        <StudentShowcaseSection onOpenLiveApp={handleOpenLiveApp} />

        {/* Interactive Tuition & Scholarship Estimator */}
        <TuitionCalculatorSection onOpenEnrollment={() => handleOpenEnrollment()} />

        {/* Free Weekend Community Workshops & Hackathons with RSVP */}
        <EventsSection />
      </main>

      {/* Offline Mode Status Banner */}
      <OfflineIndicator />

      {/* Floating Download Sign for Phone & Computer */}
      <FloatingDownloadSign />

      {/* Quiet, anti-slop Footer */}
      <Footer
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenPortalDemo={() => setPortalDemoOpen(true)}
      />

      {/* Course Syllabus & Interactive Practice Modal */}
      <CourseModal
        course={selectedCourseForDetails}
        onClose={() => setSelectedCourseForDetails(null)}
        onOpenLiveApp={handleOpenLiveApp}
        currentUser={currentUser}
      />

      {/* Enrollment & Trial Class Modal */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
        initialCourseId={enrollmentCourseId}
        currentUser={currentUser}
      />

      {/* Parent & Student Portal Simulation Modal */}
      <ParentStudentPortalPreview
        isOpen={portalDemoOpen}
        onClose={() => setPortalDemoOpen(false)}
      />

      {/* Live App Case Study Modal for Team Grace (AI Studio) */}
      <LiveAppModal
        isOpen={liveAppModalOpen}
        onClose={() => setLiveAppModalOpen(false)}
        onEnroll={handleOpenEnrollment}
        onLaunchInApp={() => {
          setLiveAppModalOpen(false);
          setViewMode('team-grace');
        }}
        appUrl={liveAppUrl}
        appTitle={liveAppTitle}
      />
    </div>
  );
}
