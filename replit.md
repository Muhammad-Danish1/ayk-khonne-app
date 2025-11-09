# Ayk Khoon - Blood Donation Platform

## Overview
Ayk Khoon is a **frontend-only** React Native + Expo mobile blood donation platform for Pakistan. The app connects blood donors with those in need and provides a complete blood bank management system.

## Project Status
**Current State:** Core authentication and user mode implemented with 5-tab navigation (Home, Chats, Alerts, History, Profile). Blood bank mode structure ready for implementation.

**Last Updated:** November 9, 2025

## Tech Stack (MANDATORY - No Deviations)
- **Framework:** React Native + Expo (latest)
- **Language:** TypeScript 5.0+
- **Navigation:** Expo Router (file-based routing)
- **Styling:** React Native StyleSheet
- **Icons:** @expo/vector-icons (Ionicons, MaterialIcons)
- **State Management:** React Context + useState
- **Forms:** React Hook Form
- **Animations:** React Native Reanimated
- **Toast:** react-native-toast-message
- **Modals:** React Native Modal
- **Date Picker:** @react-native-community/datetimepicker
- **Maps:** react-native-maps (with dummy data)
- **Vector Graphics:** react-native-svg

## Design System
- **Primary Color:** #E63946 (Blood Red) - All action buttons
- **Secondary Color:** #457B9D (Trust Blue) - Headers, links
- **Success:** #2A9D8F (Healthy Green)
- **Error:** #D62828 (Dark Red)
- **Background:** #FFFFFF (Clean white)
- **Cards:** #F1F1F1 background, 12px border radius, subtle shadow
- **Font:** Roboto (system default)
- **Spacing:** 8px base grid (8, 16, 24, 32px)
- **Border Radius:** 12px for buttons, cards, modals
- **Icons:** 24px standard size

## Project Structure
```
ayk-khoon/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication flow
│   ├── (onboarding)/      # Profile setup
│   ├── (user)/            # User mode (5 tabs)
│   └── (bloodbank)/       # Blood bank mode (4 tabs)
├── components/            # Reusable UI components
├── context/               # State management
├── hooks/                 # Custom hooks
├── types/                 # TypeScript types
├── utils/                 # Helpers, theme, dummy data
└── assets/               # Images, fonts
```

## Key Features Implemented
1. ✅ Splash screen with logo and auto-navigation
2. ✅ 3-slide onboarding carousel
3. ✅ Email/password signup and login
4. ✅ Profile setup modal (name, phone, blood group, **role selection**)
5. ✅ **Role-based navigation** - automatic bottom bar based on user role
6. ✅ User mode with 5-tab bottom navigation
7. ✅ Blood Bank mode with 4-tab bottom navigation
8. ✅ Home tab with Need Blood / Donate sub-tabs
9. ✅ Blood request cards with urgency badges
10. ✅ Design system with consistent colors and spacing
11. ✅ Toast notifications for all actions
12. ✅ Mode switching (User ↔ Blood Bank)
13. ✅ Dummy data for realistic demonstration

## Features Pending
- Complete blood request creation modal
- Request detail modal with map preview
- Chat system with message bubbles
- Alerts feed with categorized notifications
- History timeline with donation certificates
- Blood Bank mode (Dashboard, Stock, Requests, Reports)
- Profile editing with avatar upload
- Blood Bank registration and mode switching
- Additional modals for complex interactions

## Running the App
The Expo development server is configured as a workflow and starts automatically:
```bash
cd ayk-khoon
npm start
```

This will show a QR code that you can scan with:
- **Expo Go app** (Android/iOS) for testing
- **Web browser** at http://localhost:8081

## Development Workflow
1. Code changes are auto-reloaded via Metro Bundler
2. TypeScript compilation errors show in the console
3. Toast notifications provide user feedback
4. Context providers manage global state
5. All screens use consistent design system

## User Journey
1. Splash → Onboarding (first time)
2. Login / Signup
3. Profile Setup (collect phone, name, blood group, **select role**)
   - **Regular User** → User Home (5 tabs)
   - **Blood Bank Owner** → Blood Bank Home (4 tabs)

### Regular User Journey (5 tabs):
- **Home:** Need Blood / Donate with requests list
- **Chats:** Conversation list (pending)
- **Alerts:** Notifications feed (pending)
- **History:** Donation timeline (pending)
- **Profile:** Edit info + Switch to Blood Bank option

### Blood Bank Owner Journey (4 tabs):
- **Dashboard:** Stats, alerts, "Switch to User Mode" button
- **Stock:** Inventory management
- **Requests:** Nearby blood requests
- **Reports:** Analytics and charts

**Role Switching:** Users can switch between User and Blood Bank modes anytime from the Dashboard or Profile screen.

## Data Management
- **Frontend Only:** No backend/Firebase integration
- **Dummy Data:** Realistic mock data in `utils/dummyData.ts`
- **State:** React Context for Auth and Mode switching
- **Forms:** React Hook Form for validation

## Recent Changes
- Initialized Expo project with all required dependencies
- Created complete design system and TypeScript types
- Built reusable UI components (Button, Input, Card, etc.)
- Implemented authentication flow (Splash, Onboarding, Login, Signup)
- Set up User mode with 5-tab navigation
- Configured Expo development server workflow
- Added blood request cards with urgency indicators

## Next Steps
1. Complete all modals (Create Request, Request Detail, Blood Bank Setup)
2. Build remaining User mode screens (Chats, Alerts, History details)
3. Implement Blood Bank mode with 4-tab navigation
4. Add profile editing and mode switching
5. Integrate react-native-maps for location previews
6. Add animations with Reanimated for modal transitions
7. Implement full chat system with message persistence

## Architecture Notes
- **File-based routing:** Expo Router automatically creates routes from file structure
- **Type safety:** Full TypeScript coverage with strict mode
- **Component reusability:** All UI elements are modular and reusable
- **Offline-first:** Works completely without backend
- **Consistent UX:** Same design patterns across all screens

## Environment
- Node.js 20.19.3
- Expo SDK ~54
- React Native 0.81.5
- TypeScript 5.9.2
