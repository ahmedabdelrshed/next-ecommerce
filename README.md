# Next.js E-commerce

A modern e-commerce web application built with [Next.js](https://nextjs.org/), TypeScript, and modular architecture.

## Features

- User authentication (sign up, login, logout)
- Product catalog browsing
- Shopping cart management
- Order placement and order history
- User profile and statistics
- Responsive UI with reusable components

## Project Structure

```
.
├── app/                # Next.js app directory (routing, layouts, pages)
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── actions/            # Server/client actions (API, business logic)
├── auth/               # Authentication logic
├── catalog/            # Product catalog logic
├── order/              # Order management logic
├── lib/                # Utility libraries
├── public/             # Static assets
├── store/              # State management (e.g., Redux, Zustand)
├── types/              # TypeScript type definitions
├── .env.local          # Environment variables
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/next-ecommerce.git
    cd next-ecommerce
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file and add your environment variables.

4. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `dev` – Start the development server
- `build` – Build the application for production
- `start` – Start the production server
- `lint` – Run ESLint

## Customization

- Update environment variables in `.env.local` as needed.
- Modify components in [`components/`](components/) for UI changes.
- Add or update business logic in [`actions/`](actions/), [`auth/`](auth/), [`catalog/`](catalog/), and [`order/`](order/).

## License

This project is licensed under the MIT License.