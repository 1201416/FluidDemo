import './App.css';
import OpenBoard from './view/board/OpenBoard.component.tsx';
import { ThemeProvider } from "@fluentui/react";
import { lightTheme } from './Themes.ts';
import React from 'react';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <main>
        <OpenBoard/>
      </main>
    </ThemeProvider>
  );
}

export default App;