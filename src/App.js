import './App.css';
import { Route, Routes } from "react-router-dom";
import OpenBoard from './view/board/OpenBoard.component.tsx';
import { initializeIcons, ThemeProvider } from "@fluentui/react";
import { lightTheme } from './Themes.ts';
import { getFluidContainer } from './utils.ts';
import React, { useEffect, useState } from 'react';

function App() {
  /**
  const [container, setContainer] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeIcons();

    async function initialize() {
      try {
        let { container, services } = await getFluidContainer();

        if (container.connectionState !== 2) {
          await new Promise((resolve) => {
            container.once("connected", resolve);
          });
        }
        setContainer(container);
        setServices(services);
        setLoading(false);
      } catch (error) {
        console.error("Error initializing container:", error);
      }
    }

    initialize();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
*/
  return (
    <ThemeProvider theme={lightTheme}>
      <main>
        <OpenBoard/>
      </main>
    </ThemeProvider>
  );
}

export default App;