import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from '@mantine/modals';
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";

import { AuthProvider } from "./context/auth-context";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/auth/useAuth";
import type { RouterContext } from "./types/router";

// Create router with proper context typing
const router = createRouter({
  routeTree,
  context: undefined as any as RouterContext,
});

// Register the router with proper typing
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const theme = createTheme({
  colors: {
    primary: [
      '#fff4e6',
      '#ffe8cc',
      '#ffd8a8',
      '#ffc078',
      '#ffa94d',
      '#ff922b',
      '#fd7e14',
      '#f76707',
      '#e8590c',
      '#d9480f'
    ],
  },
  primaryColor: 'primary',
  other: {
    darkBackground: '#1a1b1e',
    darkSurface: '#25262b',
    darkBorder: '#373a40',
  },
});

function App() {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <InnerApp />
            </AuthProvider>
          </QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    </StrictMode>
  );
}

function InnerApp() {
  const auth = useAuth(); 
  return (
    <RouterProvider 
      router={router} 
      context={{ auth }} 
    />
  );
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}