# MedLax - AI Health Assistant

MedLax is a modern, AI-driven public health application designed to provide users with instant and reliable health information. It features a sophisticated chatbot for symptom analysis, a tool to locate nearby medical facilities, and a system for public health alerts.

![MedLax Screenshot](https://picsum.photos/seed/medlax/1200/600)

## Key Features

- **AI Symptom Checker**: Users can describe their symptoms in natural language to receive an AI-powered analysis of potential causes and recommended actions.
- **Nearby Clinic Locator**: Integrated with Google Maps, this feature helps users find hospitals and clinics in their vicinity based on their current location.
- **Health Alerts**: Stay informed about important public health advisories, disease outbreaks, and vaccination drives in your area.
- **Secure User Authentication**: Users can create accounts and log in to have a personalized experience and view their chat history and analytics.
- **Usage Analytics**: A personal dashboard displays statistics on user interactions with the chatbot, including message counts and activity over time.
- **Multilingual Support**: The chatbot is designed to communicate in multiple languages, making it accessible to a wider audience.
- **Responsive Design**: The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.

## Technology Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI/Generative**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with the Gemini API
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore) (for storing chat history)
- **Maps & Geolocation**: [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) (or a compatible package manager like yarn or pnpm)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ayush-code-22/Hackathon.git
    cd Hackathon
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a new file named `.env.local` in the root of your project. You can do this by copying the example file:
        ```bash
        cp .env.example .env.local
        ```
    -   Open `.env.local` and add your API keys:
        -   **`GOOGLE_MAPS_API_KEY`**: Get a key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview). You will need to enable the "Places API".
        -   **`GEMINI_API_KEY`**: Get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

    Your `.env.local` file should look like this:
    ```
    GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:9002`.

### Running Genkit Flows (Optional)

If you want to test or inspect the AI flows directly using the Genkit developer UI:

1.  **Start the Genkit server:**
    ```bash
    npm run genkit:dev
    ```
2.  Open your browser to `http://localhost:4000` to access the Genkit developer UI.

## Project Structure

The project follows the standard Next.js App Router structure:

-   `src/app/`: Contains all the pages and routes of the application.
-   `src/components/`: Shared React components, including UI components from ShadCN.
-   `src/ai/`: Contains all Genkit-related code.
    -   `src/ai/flows/`: Genkit flows that define the AI logic for features like the symptom checker.
-   `src/lib/`: Utility functions, server actions, and data definitions.
-   `public/`: Static assets like images.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.

## License

This project is open-source and available for anyone to use.
