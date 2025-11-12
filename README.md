# Task Manager App - Setup & User Guide

A modern, feature-rich task management application built with React Native, TypeScript, and Expo.

## Features Overview

### Core Features

- **Task CRUD Operations**: Create, read, update, and delete tasks with ease
- **Task Properties**:
  - Title and description
  - Status tracking (Pending, In Progress, Completed)
  - Priority levels (Low, Medium, High)
  - Automatic timestamps (created/updated dates)

### Advanced Features

- **Search Functionality**: Quickly find tasks by searching titles and descriptions
- **Multi-Criteria Filtering**: Filter tasks by status and priority simultaneously
- **Flexible Sorting**: Sort tasks by creation date, title, or priority
- **Persistent Storage**: Tasks are automatically saved locally using AsyncStorage
- **Statistics Dashboard**: View task counts by status at a glance
- **Empty State Handling**: Helpful messages when no tasks are available
- **Loading States**: Smooth loading indicators for better UX

### User Interface

- **Task Cards**: Visual task representation with color-coded priorities
- **Floating Action Button**: Quick access to create new tasks
- **Filter Chips**: Easy-to-use filter toggles
- **Search Bar**: Real-time search with debouncing
- **Responsive Layout**: Optimized for various screen sizes

## Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd /home/nour/Desktop/react-native/task-manager-app
```

### 2. Install Dependencies

```bash
npm install
```

## Running the Application

### Start the Development Server

```bash
npm start
# or
npx expo start
```

This will start the Expo development server and display a QR code in your terminal.

### Using Expo Go (Mobile Device)

1. Install **Expo Go** from the App Store (iOS) or Google Play Store (Android)
2. Run `npm start` in your terminal
3. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app
4. The app will load on your device

### Run on Specific Platforms

#### iOS (Mac only)

```bash
npm run ios
# or
npx expo start --ios
```

This will automatically open the app in the iOS Simulator.

#### Android

```bash
npm run android
# or
npx expo start --android
```

This will automatically open the app in your Android Emulator.

#### Web (for quick testing)

```bash
npm run web
# or
npx expo start --web
```

## Project Structure

```
task-manager-app/
├── app/                          # Application screens (Expo Router)
│   ├── (tabs)/                   # Tab-based navigation
│   │   ├── index.tsx             # Home screen with task list
│   │   └── _layout.tsx           # Tab layout configuration
│   ├── create-task.tsx           # Create new task screen
│   ├── edit-task.tsx             # Edit existing task screen
│   ├── task-detail.tsx           # Task detail view screen
│   └── _layout.tsx               # Root layout
│
├── components/                   # Reusable UI components
│   ├── empty-state.tsx           # Empty state display
│   ├── filter-bar.tsx            # Status/priority filter chips
│   ├── floating-action-button.tsx # FAB for creating tasks
│   ├── search-bar.tsx            # Search input component
│   ├── stats-header.tsx          # Task statistics display
│   ├── task-card.tsx             # Individual task card
│   ├── task-form.tsx             # Task creation/edit form
│   ├── themed-text.tsx           # Themed text component
│   └── themed-view.tsx           # Themed view component
│
├── contexts/                     # React Context providers
│   └── tasks-context.tsx         # Task state management
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts       # Color scheme detection
│   └── use-theme-color.ts        # Theme color management
│
├── types/                        # TypeScript type definitions
│   └── index.ts                  # All app type definitions
│
├── constants/                    # App constants
├── assets/                       # Images, fonts, etc.
└── package.json                  # Dependencies and scripts
```

## Libraries Used

- **React Hook Form**: To control form state
- **Zod**: To validate form inputs
- **AsyncStorage**: For persistent storage

## Usage Guide

### Creating a Task

1. Tap the **+** floating action button at the bottom right
2. Fill in the task details:
   - **Title**: Enter a descriptive title (required, 3-100 characters)
   - **Description**: Add detailed description (required, minimum 10 characters)
   - **Status**: Select Pending, In Progress, or Completed
   - **Priority**: Choose Low, Medium, or High
3. Tap **Create Task** to save

### Viewing Tasks

- Tasks are displayed as cards on the home screen
- Each card shows:
  - Title and description
  - Status badge
  - Priority indicator (color-coded)
  - Creation date
- Tap any task card to view full details

### Editing a Task

1. Tap on a task card to view details
2. Tap the **Edit** button
3. Modify any fields
4. Tap **Update Task** to save changes

### Deleting a Task

1. Navigate to task detail screen
2. Tap the **Delete** button
3. Confirm deletion in the dialog

### Searching Tasks

1. Use the search bar at the top of the home screen
2. Type to search in task titles and descriptions
3. Results update in real-time
4. Clear the search to show all tasks

### Filtering Tasks

1. Use the filter chips below the search bar
2. **Status Filter**: Tap to filter by Pending, In Progress, or Completed
3. **Priority Filter**: Tap to filter by Low, Medium, or High
4. Filters can be combined with search
5. Tap an active filter to remove it

### Viewing Statistics

The stats header shows:

- Total number of tasks
- Pending tasks count
- In-progress tasks count
- Completed tasks count

## Data Persistence

- All tasks are automatically saved to local storage using AsyncStorage
- Data persists across app restarts
