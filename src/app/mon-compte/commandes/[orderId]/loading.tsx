"use client"; // Directive

import { Loader } from '@mantine/core';

/**
 * Ici on est obligé de rendre le composant client
 * parce que le composant <Loader /> de Mantine utilise useContext()
 */
export default function Loading() {
    return <div className={"z-50 fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center"}>
        <div className={"p-8 bg-white shadow rounded"}>
            <Loader className={"stroke-brand"} />
        </div>
    </div>;
}