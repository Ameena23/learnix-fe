# School Management System Frontend - Project Overview

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Main Features](#main-features)
5. [Architecture & Data Flow](#architecture--data-flow)
6. [Routing Structure](#routing-structure)
7. [Key Configuration](#key-configuration)
8. [Styling & UI](#styling--ui)
9. [Backend Integration](#backend-integration)
10. [Dependencies](#dependencies)

---

## Project Overview

**School Management System Frontend** - A comprehensive web application for managing students, attendance, exam marks, and generating report cards.

- **Framework**: React 19 + Vite 7
- **Location**: `/home/user/learn/learning_fe`
- **Backend**: Node.js/Express on `http://localhost:4000`
- **Key Features**: Role-based access, analytics dashboard, attendance tracking, mark management, report generation

---

## Technology Stack

### Core Technologies
- **React** 19.2.0 - UI framework
- **Vite** 7.2.4 - Build tool and dev server
- **React Router DOM** 7.11.0 - Client-side routing
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **Axios** 1.13.2 - HTTP client

### Data Visualization
- **Chart.js** 4.5.1 - Charting library
- **React ChartJS-2** 5.3.1 - React wrapper
- **Highcharts React** 3.2.3 - Alternative charting

### UI Components
- **Lucide React** 0.562.0 - Modern icons
- **React Icons** 5.5.0 - Icon library (Font Awesome, Feather, etc.)

---

## Project Structure

```
learning_fe/
├── src/
│   ├── pages/                          # Page components
│   │   ├── auth/
│   │   │   ├── login.jsx               # Login with role-based redirect
│   │   │   └── register.jsx            # Registration page
│   │   ├── students/                   # Student management
│   │   │   ├── studenttable.jsx        # Student summary table
│   │   │   ├── studentMarkEntrypage.jsx # Mark entry (627 lines)
│   │   │   ├── studentReportCard.jsx   # Report card view (629 lines)
│   │   │   ├── reportCardGenerator.jsx # Report selector (322 lines)
│   │   │   └── examMarkEntriesPage.jsx # Exam marks (424 lines)
│   │   ├── attendance/
│   │   │   └── Attendance.jsx          # Attendance tracking
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx           # Analytics dashboard
│   │   └── UserRegistration/
│   │       ├── UserCreate.jsx          # User creation orchestrator
│   │       ├── StudentForm.jsx         # Student form
│   │       └── TeacherForm.jsx         # Teacher form
│   ├── components/
│   │   ├── NavBar.jsx                  # Top navbar + profile dropdown
│   │   ├── confirmPopup.jsx            # Confirmation modal
│   │   └── *.css files
│   ├── layouts/
│   │   ├── MainLayout.jsx              # Sidebar + main content
│   │   └── MainLayout.css
│   ├── assets/
│   │   ├── dummyfemale.png
│   │   ├── dummymale.png
│   │   └── react.svg
│   ├── api.js                          # Axios client (baseURL: localhost:4000)
│   ├── App.jsx                         # Main routing
│   ├── main.jsx                        # React entry point
│   └── index.css                       # Global styles
├── public/
│   └── vite.svg
├── index.html                          # HTML entry
├── package.json
├── vite.config.js                      # Vite config
├── eslint.config.js
├── serverapis.md                       # API endpoints documentation
└── README.md
```

---

## Main Features

### 1. Authentication
- **Login Page** (`login.jsx`)
  - Email/password authentication
  - Role-based access (Admin, Teacher, Student)
  - LocalStorage session management
  - Automatic role-based redirects

### 2. Dashboard (Analytics)
- Real-time student performance analytics
- Multiple chart types:
  - Performance distribution (bar charts)
  - Pass/Fail statistics
  - Subject averages
  - Term comparisons
  - Report-based analytics
- Leaderboards and top student rankings
- Dynamic filtering by class and batch
- Uses 9 different API endpoints

### 3. Attendance Management
- Class and batch selection
- Date-based tracking
- Present/Absent toggle switches
- Create/Update/Delete attendance sessions
- Confirmation modals for actions
- Success/error notifications

### 4. Exam Marks Management
- Mark entry interface with filtering
- Search by exam name, class, division, subject
- Status tracking (completed, pending, draft)
- Filter by class and term
- Dynamic entry count display

### 5. Report Card Generation
- Multi-step access flow:
  - Class selection → Batch selection → Student list
- Individual report card viewer (PDF capable)
- Student listing with admission numbers

### 6. User Management
- Student registration form
- Teacher registration form
- Role-based form handling
- Dynamic UI based on user type

### 7. Navigation & Layout
- **Collapsible Sidebar**:
  - Dashboard
  - Students Mark Entry
  - Exam Marks View/Edit
  - Attendance
  - Reports (Report Cards)
  - User Management
- **Top Navbar**:
  - Menu toggle
  - Title display
  - Profile dropdown with user info
  - Logout functionality

### 8. User Profile Dropdown
- Split-screen design
- Left: Personal info, contact, member since, action buttons
- Right: Stats grid, subjects, department, qualifications
- Role toggle (demo feature)
- Edit profile & logout

---

## Architecture & Data Flow

### API Communication
1. **API Client**: `src/api.js` - Axios instance with baseURL
2. **Direct Fetch**: Some components use direct `axios.get()`
3. **Base URL**: `http://localhost:4000` (hardcoded)

### State Management
- **Local Component State** (useState) - No Redux/Context
- **LocalStorage** - Authentication and session data
- Multiple state variables per component

### Data Flow
1. User logs in → credentials to `/users/login`
2. User data stored in localStorage
3. Navigation based on user role
4. Components fetch data via API
5. Data displayed with charts/tables
6. User actions trigger API calls with confirmations

---

## Routing Structure

```
/                                    → Login/Auth page
/dashboard                           → Analytics dashboard
/studentss                           → Student mark entry
/exam-mark-entries                   → Exam marks view/edit
/attendance                          → Attendance management
/reports/report-card                 → Report card generator
/reports/report-card/:admission_no   → Individual report card
/user-create                         → User registration
```

---

## Key Configuration

### vite.config.js
```javascript
plugins: [react(), tailwindcss()]
```
- React Fast Refresh enabled
- Tailwind CSS v4 integration

### package.json Scripts
```bash
npm run dev      # Vite development server
npm run build    # Production build
npm run lint     # ESLint checking
npm run preview  # Preview production build
```

### API Endpoints (serverapis.md)
**Base URL**: `http://localhost:4000`

**44+ endpoints** organized by modules:
- **Charts**: `/charts/performance-distribution`, `/charts/subject-pass-fail`, etc.
- **Tables**: `/table/top-students-overall`, `/table/leaderboard`, etc.
- **Reports**: `/reports/report-card/data`, `/reports/report-card/pdf`
- **Attendance**: `/attendance/save`, `/attendance/update/:sessionId`
- **Filters**: `/filters/classes`, `/filters/batches`

---

## Styling & UI

### CSS Approach
- **Tailwind CSS v4** - Primary framework
- **Inline Styles** - Used in components
- **CSS Modules** - Some `.css` files

### Design Characteristics
- Modern, clean aesthetic
- Gradient backgrounds (purple, indigo, blue)
- Shadow-based depth
- Responsive grid layouts
- Mobile-first approach
- Icons throughout (Lucide, React Icons, Font Awesome)

### Fonts
- **Inter** - Body text
- **Poppins** - Headlines, large text

### Notable UI Patterns
1. Confirmation modals for actions
2. Loading skeletons
3. Error handling with "Try Again" buttons
4. Empty states with custom messages
5. Color-coded status badges
6. Real-time filtering
7. Toggle components
8. Split-screen designs
9. Modal overlays
10. Responsive tables

---

## Backend Integration

The frontend expects a Node.js/Express backend on `http://localhost:4000` with:

- RESTful API endpoints
- JSON request/response format
- Query parameters (class_number, batch, date, etc.)
- User authentication system
- Student database (marks, attendance, reports)
- CSV import functionality
- PDF report generation

---

## Dependencies

| Category | Packages |
|----------|----------|
| **UI/Framework** | react@19.2, react-dom@19.2, react-router-dom@7.11 |
| **Build** | vite@7.2.4, @vitejs/plugin-react@5.1 |
| **Styling** | tailwindcss@4.1, @tailwindcss/vite@4.1, postcss@8.5, autoprefixer@10.4 |
| **Charts** | chart.js@4.5, react-chartjs-2@5.3, highcharts-react-official@3.2 |
| **Icons** | lucide-react@0.562, react-icons@5.5 |
| **API** | axios@1.13.2 |
| **Linting** | eslint@9.39, @eslint/js@9.39, eslint-plugin-react-hooks@7.0 |

---

## Key Observations

### Strengths
- Modern tech stack (React 19, Vite 7, Tailwind 4)
- Comprehensive feature set
- Clean component architecture
- Good UI/UX with charts and visualizations
- Role-based access control

### Potential Improvements
1. **No TypeScript** - Could benefit from type safety
2. **Hardcoded API URLs** - Should use environment variables
3. **No State Management Library** - Could cause prop drilling
4. **Mixed Styling Approaches** - Inline, CSS files, and Tailwind
5. **No Error Boundaries** - Missing React error boundary component
6. **Limited Form Validation** - Could be more robust
7. **No Request Interceptors** - No centralized API error handling

---

## API Documentation

### Base Configuration

**Base URL**: `http://localhost:4000`
**API Client**: `src/api.js` - Axios instance

```javascript
import API from './api';
// All requests use: API.get(), API.post(), API.put(), API.delete()
```

---

### API Endpoints by Category

#### 1. Authentication APIs

**POST `/api/auth/login`**
- **Purpose**: User authentication
- **Used in**: `src/pages/auth/login.jsx:63`
- **Request**: `{ email, password }`
- **Response**: `{ success, user: { id, email, role, ... } }`
- **Storage**: Saves to localStorage: `userId`, `isLoggedIn`, `userRole`, `userData`

---

#### 2. User Management APIs

**POST `/api/users/create`**
- **Purpose**: Create new user (student/teacher)
- **Used in**: `src/pages/UserRegistration/StudentForm.jsx:59`
- **Request**: Full user details (name, email, phone, role, gender, DOB, address, etc.)

---

#### 3. Student Management APIs

**GET `/api/students/filters`**
- **Purpose**: Load available classes for filtering
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:58`
- **Response**: `{ classes: ["1", "2", "3", ...] }`

**GET `/api/students/divisions`**
- **Purpose**: Get divisions for selected class
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:66`
- **Query**: `class` (class number)
- **Response**: `["A", "B", "C"]`

**GET `/api/students/students`**
- **Purpose**: Get student list by class and division
- **Used in**: `studentMarkEntrypage.jsx:75`, `Attendance.jsx:87`
- **Query**: `class`, `division`, `batch` (optional)
- **Response**: Array of students with admission_no, roll_no, name, gender, profile_picture

**GET `/api/students/exams/entries`**
- **Purpose**: Get all exam mark entries
- **Used in**: `src/pages/students/examMarkEntriesPage.jsx:31`
- **Response**: Array of exam entries with id, exam_name, class, division, subject, term, status, max_mark

**GET `/api/students/exams/entries/:entryId`**
- **Purpose**: Get specific exam entry details
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:110`
- **Response**: Complete exam entry details

**GET `/api/students/exams/marks/:entryId`**
- **Purpose**: Get marks for specific exam entry
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:87`
- **Query**: `term` (e.g., "Term 1")
- **Response**: `{ marks: [{ admission_no, scored_mark, is_absent }] }`

**POST `/api/students/exams/marks`**
- **Purpose**: Create new exam marks entry
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:164`
- **Request**: `{ exam_name, class, division, subject, term, max_mark, academic_year, school_name, marks: [...] }`

**PUT `/api/students/exams/marks`**
- **Purpose**: Update existing exam marks
- **Used in**: `src/pages/students/studentMarkEntrypage.jsx:220`
- **Request**: `{ entry_id, marks: [...] }`

---

#### 4. Attendance APIs

**GET `/api/filters/classes`**
- **Purpose**: Get available classes for attendance
- **Used in**: `src/pages/attendance/Attendance.jsx:46`
- **Response**: `{ classes: [...] }`

**GET `/api/filters/batches`**
- **Purpose**: Get available batches for selected class
- **Used in**: `src/pages/attendance/Attendance.jsx:58`
- **Response**: `{ batches: [...] }`

**GET `/api/attendance/by-date`**
- **Purpose**: Get attendance by date
- **Used in**: `src/pages/attendance/Attendance.jsx:70`
- **Query**: `class_number`, `batch`, `date`
- **Response**: `{ success, records: [...], sessionId }`

**POST `/api/attendance/save`**
- **Purpose**: Save new attendance session
- **Used in**: `src/pages/attendance/Attendance.jsx:156`
- **Request**: `{ class_number, batch, date, records: [{ admission_no, student_name, status }] }`

**PUT `/api/attendance/update/:sessionId`**
- **Purpose**: Update existing attendance session
- **Used in**: `src/pages/attendance/Attendance.jsx:108`
- **Request**: `{ records: [{ admission_no, student_name, status }] }`

**DELETE `/api/attendance/delete/:sessionId`**
- **Purpose**: Delete attendance session
- **Used in**: `Attendance.jsx:129`, `Attendance.jsx:297`

---

#### 5. Dashboard & Analytics APIs (9 endpoints)

All dashboard APIs use direct axios calls with `http://localhost:4000` base URL.

**GET `/api/charts/performance-distribution`**
- **Used in**: `Dashboard.jsx:92`
- **Query**: `class_number`, `batch`

**GET `/api/charts/subject-pass-fail`**
- **Used in**: `Dashboard.jsx:93`
- **Query**: `class_number`, `batch`

**GET `/api/charts/subject-average`**
- **Used in**: `Dashboard.jsx:94`
- **Query**: `class_number`, `batch`

**GET `/api/charts/term-comparison`**
- **Used in**: `Dashboard.jsx:95`
- **Query**: `class_number`, `batch`

**GET `/api/charts/report-subject-avg`**
- **Used in**: `Dashboard.jsx:96`
- **Query**: `class_number`, `batch`

**GET `/api/charts/report-term-avg`**
- **Used in**: `Dashboard.jsx:97`
- **Query**: `class_number`, `batch`

**GET `/api/table/top-students-overall`**
- **Used in**: `Dashboard.jsx:98`
- **Query**: `class_number`, `batch`

**GET `/api/table/top-students-subject`**
- **Used in**: `Dashboard.jsx:99`
- **Query**: `class_number`, `batch`

**GET `/api/table/leaderboard`**
- **Used in**: `Dashboard.jsx:100`
- **Query**: `class_number`, `batch`

---

#### 6. Report Card APIs

**GET `/api/reports/classes`**
- **Purpose**: Get available classes for reports
- **Used in**: `src/pages/students/reportCardGenerator.jsx:43`
- **Response**: `{ classes: [...] }`

**GET `/api/reports/classes/:classNumber/batches`**
- **Purpose**: Get batches for specific class
- **Used in**: `src/pages/students/reportCardGenerator.jsx:53`
- **Response**: `{ batches: ["2024-25", "2023-24"] }`

**GET `/api/reports/students-by-class-batch`**
- **Purpose**: Get students by class and batch for reports
- **Used in**: `src/pages/students/reportCardGenerator.jsx:64`
- **Query**: `class_number`, `batch`
- **Response**: `{ students: [{ admission_no, roll_no, student_name }] }`

**GET `/api/reports/report-card/data`**
- **Purpose**: Get report card data for student
- **Used in**: `src/pages/students/studentReportCard.jsx:41`
- **Query**: `admission_no`, `term`
- **Response**: Complete report card data (student_info, marks, attendance, remarks)

**POST `/api/reports/term-remark`**
- **Purpose**: Save term remark for student
- **Used in**: `src/pages/students/studentReportCard.jsx:127`
- **Request**: `{ admission_no, term, year, remark, created_by }`

---

### API Usage Summary

#### By Component

| Component | APIs Used | Count |
|-----------|-----------|-------|
| **login.jsx** | `/users/login` | 1 |
| **StudentForm.jsx** | `/users/create` | 1 |
| **studentMarkEntrypage.jsx** | 7 endpoints for filters, students, marks CRUD | 7 |
| **examMarkEntriesPage.jsx** | `/students/exams/entries` | 1 |
| **Attendance.jsx** | 5 endpoints for class filters, students, attendance CRUD | 5 |
| **Dashboard.jsx** | 9 chart and table endpoints | 9 |
| **reportCardGenerator.jsx** | 3 endpoints for classes, batches, students | 3 |
| **studentReportCard.jsx** | 2 endpoints for report data and remarks | 2 |

#### By HTTP Method

| Method | Count | Usage |
|--------|-------|-------|
| **GET** | 26 | Data retrieval, filtering, reports |
| **POST** | 5 | Create records (login, user, marks, attendance, remarks) |
| **PUT** | 2 | Update records (marks, attendance) |
| **DELETE** | 1 | Delete attendance sessions |

#### By Category

| Category | Endpoints | Primary Purpose |
|----------|-----------|-----------------|
| **Authentication** | 1 | User login |
| **User Management** | 1 | Create users |
| **Students** | 8 | Marks, filters, student data |
| **Attendance** | 4 | Attendance CRUD operations |
| **Charts/Analytics** | 9 | Dashboard visualizations |
| **Reports** | 5 | Report cards, PDF generation |
| **Filters** | 2 | Class/batch filtering |

---

### Common Query Parameters

- `class_number` / `class`: Class identifier
- `batch`: Academic year (e.g., "2024-25")
- `division`: Division/section (e.g., "A", "B")
- `term`: Academic term (e.g., "Term 1", "Term 2", "Term 3")
- `admission_no`: Student admission number

---

### API Statistics

**Documented in serverapis.md**: 44 endpoints
**Actively Used in Code**: 29 endpoints
**Total Components Using APIs**: 8

---

## Summary

A **modern, feature-rich school management system frontend** with comprehensive analytics, attendance tracking, mark management, and report generation. Built with contemporary tools and designed for multiple user roles (admin, teacher, student). The UI is responsive, well-organized, and provides excellent data visualization capabilities.

**Total Lines of Code** (students pages): ~2,068 lines
**API Endpoints**: 44+ (29 actively used)
**Main Pages**: 8+
**Components**: 5+

## Recent Work Log (January 23, 2026)

### 1. UI/UX & Layout Refinement
- **Navbar & Sidebar Persistence**: Refactored the main routing in `App.jsx` to use a persistent `MainLayout`. This prevents the Navbar and Sidebar from remounting and flickering during navigation between protected routes.
- **Navbar Aesthetics**: Updated the Navbar with a "Deep Carbon Navy" theme, emerald green accents, and polished glassmorphism effects. Balanced the height and internal element sizes for a more professional look.
- **Header Standardization**: Standardized the page header padding to `py-4` across all major management pages (Attendance, Mark Entry, Exam Entries) to ensure consistent visual hierarchy.

### 2. User Registration Upgrade
- **Interactive Role Selection**: Replaced the standard dropdown in `UserCreate.jsx` with a modern, card-based role selection interface featuring icons and active states.
- **Form Polishing**: Enhanced the styling of student and teacher registration forms and implemented form reset functionality on cancellation.

### 3. Component Optimization & Cleanup
- **Layout Cleanup**: Systematically removed redundant `MainLayout` wrappers from global components (`Dashboard`, `Attendance`, `UserCreate`, `ExamMarkEntriesPage`, `StudentMarkEntryPage`, `ReportCardGenerator`) to align with the new routing architecture.
- **Bug Fixes**: Identified and resolved duplicate icon imports and syntax errors (missing closing tags) in refactored components.

---

*Last Updated: 2026-01-23*
