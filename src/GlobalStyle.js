import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background-color: #22254b;
        font-size: 1.2rem;
    }
    
    .logo {
        font-family: 'Poppins', sans-serif;
        font-size: 3.5rem;
        padding-bottom: 1rem;
        color: white;
    }

    input::placeholder {
        color: black;
    }

    input, a, button {
        font-family: inherit;
        font-size: inherit;
    }
`;

export default GlobalStyle;