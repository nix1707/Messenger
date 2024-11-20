# Messenger Application
Online chat is designed to facilitate seamless group communication and real-time interactions. It enables users to exchange messages instantly, share updates, and collaborate effectively within a virtual space.


## Overview

### React TypeScript Client (client-app)
- Modern UI with **React**, **TypeScript**, and **Material-UI (MUI)**.
- State management via **Zustand**.
- JWT-based **authentication** for login and registration.
- **Real-time messaging**.
- **Cloudinary** for media uploads (photos and videos).

### ASP.NET Web API (API)
- **RESTful Services** for authentication and messaging.
- **SignalR** for real-time communication.
- **MediatR** for handling API queries and commands.
- **Fluent Validation** for API input validation.
- **ASP.NET Identity** for secure authentication.
- **Distributed Cache** for database performance optimization.
- **Cloudinary** integration for media storage.

---

## Project Structure

```
Messenger/
├── API/               # ASP.NET Web API (Clean Architecture)
│   ├── API/           # Presentation layer (controllers, SignalR hubs)
│   ├── Application/   # Business logic (commands, queries, MediatR handlers)
│   ├── Infrastructure/# External integrations (Cloudinary, caching)
│   ├── Persistence/   # Database context and migrations
│   ├── Domain/        # Core domain models and entities
│   └── appsettings.json # Configuration file
├── client-app/        # React TypeScript client
│   ├── src/           # Source code
│   ├── public/        # Public assets
│   ├── vite.config.ts # Vite configuration
│   └── package.json   # Dependencies and scripts
├── .gitignore         # Git ignore file
└── README.md          # Project documentation
```

---

## Prerequisites

### For API
- **.NET SDK**: Version 8.0 or later.
- **Cloudinary Account**: For media uploads.

### For Client
- **Node.js**: Version 16.0 or later.
- **npm or Yarn**: Comes with Node.js.

---

## Setup and Configuration

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Messenger.git
cd Messenger
```

### 2. Configure the API
Update the `appsettings.json` in the `API` folder:
```json
"Cloudinary": {
  "CloudName": "your-cloud-name", 
  "ApiKey": "your-api-key", 
  "ApiSecret": "your-api-secret" 
},
"TokenKey": "your-token-key"
```

---

### 3. Set Up API
1. Navigate to the `API` folder:
   ```bash
   cd API
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Update the database:
   ```bash
   dotnet ef database update -s API -p Persistence
   ```
4. Run the application:
   ```bash
   dotnet run
   ```
5. The API will be available at `https://localhost:5174`.

---

### 4. Set Up Client
1. Navigate to the `client-app` folder:
   ```bash
   cd client-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The client will be available at `http://localhost:3000`.

---
> **Note**: Currently, chat groups can only be created using API platforms such as Postman or similar tools. The functionality to create and edit groups directly from the client application will be introduced in future updates (see the To-Do List section for details).

## To-Do List

- [ ] **Direct Chat**: Support for one-on-one messaging.
- [ ] **Audio Messages**: Ability to send and receive audio recordings.
- [ ] **Voice/Video Calls**: Real-time calling features.
- [ ] **Group Management**: Create and edit groups from the client.
- [ ] **Redis Cache**: Replace built-in distributed cache with Redis.
- [ ] **Client-Side Error Handling**: Enhanced error mechanisms.


---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.
