import { initializeIcons, ThemeProvider } from "@fluentui/react";
import BoardOpenedComponent from "./BoardOpened.component.tsx";
import { lightTheme } from '../../Themes.ts';
import { getFluidContainer } from "../../utils.ts";
import React, { useEffect, useState } from 'react'

const OpenBoard: React.FC = () => {  
    const [containerDef, setContainer] = useState<any>(null);
    const [servicesDef, setServices] = useState<any>(null);

    useEffect(()=>{
        const initialize = async() =>{
            initializeIcons();

            let {container, services} = await getFluidContainer();
        
            if (container.connectionState===2) {
                await new Promise<void>((resolve) => {
                    container.once("connected", () => {
                        resolve();
                    });
                });
            }
            setContainer(container);
            setServices(services);
        }
        initialize().catch((error) => console.error(error));
    }, [])

    if (!containerDef || !servicesDef) {
        return <div>Loading...</div>;
    }

    return(
        <ThemeProvider theme={lightTheme}>
                <main>
                    <BoardOpenedComponent container={containerDef} services={servicesDef} />
                </main>
        </ThemeProvider>
    );
}

export default OpenBoard;