import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    white: {
      main: "rgba(255, 255, 255, 1)",
    },
    black: {
      main: "rgba(0, 0, 0, 1)",
    },
    greyIcon: {
      main: "rgba(101,103,107,255)",
    },
    blue: {
      main: "rgba(5,81,233,255)",
    },
  },
});
//search cord.com

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
);
