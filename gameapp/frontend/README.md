# Game App Frontend

A modern React frontend for the Game Management System built with Spring Boot backend.

## Features

- **Dashboard**: Overview of games, members, transactions, and recharges
- **Games Management**: Add, edit, delete, and view games
- **Members Management**: Manage member information and balances
- **Transactions**: Create and view game transactions
- **Recharges**: Manage member balance recharges
- **Admin Records**: Track admin operations

## Tech Stack

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **React Toastify** - Notifications
- **Font Awesome** - Icons
- **CSS3** - Styling with responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend Spring Boot application running on port 9000

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js & Navbar.css
│   │   ├── Dashboard.js & Dashboard.css
│   │   ├── Games.js & Games.css
│   │   ├── Members.js & Members.css
│   │   ├── Transactions.js & Transactions.css
│   │   ├── Recharges.js & Recharges.css
│   │   └── Admins.js & Admins.css
│   ├── services/
│   │   └── api.js
│   ├── App.js & App.css
│   ├── index.js & index.css
│   └── package.json
```

## API Integration

The frontend connects to the Spring Boot backend running on `http://localhost:9000`. The API service layer (`src/services/api.js`) handles all HTTP requests to:

- `/games` - Game management
- `/members` - Member management
- `/transactions` - Transaction handling
- `/recharges` - Recharge operations
- `/admins` - Admin operations

## Features Overview

### Dashboard
- Statistics cards showing total counts
- Recent transactions list
- Quick overview of system activity

### Games Management
- Add new games with details (name, price, description, player counts, duration)
- Edit existing games
- Delete games
- View all games in a responsive grid layout
- Status management (active/inactive)

### Members Management
- Add new members
- Edit member information
- Delete members
- View member balances
- Table-based layout for easy data viewing

### Transactions
- Create new transactions by selecting member and game
- Automatic balance deduction
- View transaction history
- Member and game name resolution

### Recharges
- Add recharge amounts to member balances
- View recharge history
- Automatic balance updates

### Admin Records
- Track admin operations
- Add admin records with amounts
- View admin activity history

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## Styling

- Modern gradient design
- Card-based layouts
- Hover effects and transitions
- Consistent color scheme
- Font Awesome icons throughout

## Error Handling

- Toast notifications for success/error messages
- Form validation
- Loading states
- Empty state handling

## Development

To run the application in development mode:

```bash
npm start
```

To build for production:

```bash
npm run build
```

## Backend Requirements

Make sure your Spring Boot backend is running on port 9000 with the following endpoints available:

- GET/POST/PUT/DELETE `/games`
- GET/POST/PUT/DELETE `/members`
- GET/POST `/transactions`
- GET/POST `/recharges`
- GET/POST `/admins`

The backend should be configured to allow CORS requests from `http://localhost:3000`.
