import {NextFont} from "next/dist/compiled/@next/font";
import {ReactNode} from "react";
import {MantineCustomThemeProvider} from "tp-kit/components";

export interface ProvidersProps {
    font: NextFont,
    children: ReactNode
}

export default function Providers(props: ProvidersProps) {
    return <>
        <MantineCustomThemeProvider font={props.font}>
            { props.children }
        </MantineCustomThemeProvider>
    </>
}