import React, { createContext, useEffect, useMemo, useRef, useState } from "react";

interface IContext {
    totalHeight: number;
    adjustedHeight: number;
    setAdjustedHeight: (height: number) => void;
    previewHeight: number;
    setPreviewHeight: (height: number) => void;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const AutoResizeTextAreaContext = createContext<IContext | undefined>(undefined);

export const useTextArea = () => {
    const context = React.useContext(AutoResizeTextAreaContext);
    return context as IContext;
};

interface IProps {
    children: React.ReactNode;
}

export const AutoResizeTextAreaProvider = ({ children }: IProps) => {
    // reload -2 = no reload, -1 = reload, 0 = default
    const [adjustedHeight, setAdjustedHeight] = useState<number>(50)
    const [previewHeight, setPreviewHeight] = useState<number>(0);
    const [totalHeight, setTotalHeight] = useState<number>(90);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const MAX_TOTAL_HEIGHT = 200; // Set your desired max total height here

    useEffect(() => {
        const newTotalHeight = adjustedHeight + previewHeight;
        setTotalHeight(newTotalHeight > MAX_TOTAL_HEIGHT ? MAX_TOTAL_HEIGHT : newTotalHeight);
    }, [adjustedHeight, previewHeight]);


    const value = useMemo(() => {
        return {
            totalHeight,
            textareaRef,
            adjustedHeight,
            setAdjustedHeight,
            previewHeight,
            setPreviewHeight
        };
    }, [totalHeight, textareaRef, adjustedHeight, setAdjustedHeight, previewHeight, setPreviewHeight]);

    return <AutoResizeTextAreaContext.Provider value={value}>{children}</AutoResizeTextAreaContext.Provider>;
};
