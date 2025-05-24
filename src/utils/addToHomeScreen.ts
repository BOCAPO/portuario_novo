import * as React from "react";

// https://dev.to/rikurouvila/react-hook-for-showing-custom-add-to-home-screen-prompt-472c

interface IBeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export function useAddToHomeScreenPrompt(): [
    IBeforeInstallPromptEvent | null,
    () => void
] {
    const [prompt, setState] = React.useState<IBeforeInstallPromptEvent | null>(
        null
    );

     async function promptToInstall() {
        if (prompt) {
            return await prompt.prompt();
        }
        return Promise.reject(
            new Error(
                'Tried installing before browser sent "beforeinstallprompt" event'
            )
        );
    };

    React.useEffect(() => {
        const ready = (e: IBeforeInstallPromptEvent) => {
            e.preventDefault();
            setState(e);
        };

        window.addEventListener("beforeinstallprompt", ready as any);

        return () => {
            window.removeEventListener("beforeinstallprompt", ready as any);
        };
    }, []);

    return [prompt, promptToInstall];
}
