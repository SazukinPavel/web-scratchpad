import React from 'react'
import ReactDOM from 'react-dom/client'
import store from "./store/index.js";
import {Provider} from "react-redux";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import gqlClient from "./gql/client.js";
import {ApolloProvider} from "@apollo/client";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import router from "./router/index.jsx";
import {RouterProvider} from "react-router-dom";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <ApolloProvider client={gqlClient}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <RouterProvider router={router}></RouterProvider>
            </ThemeProvider>
        </ApolloProvider>
    </Provider>
);