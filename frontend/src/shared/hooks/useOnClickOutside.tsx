import {useEffect} from "react";

export function useOnClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T | null>,
    onOutside: (e: Event) => void
) {
    useEffect(() => {
        const handler = (e: Event) => {
            const el = ref.current;
            if(!el) return;
            if(e.target instanceof Node && el.contains(e.target)) return;
            onOutside(e);
        }
        document.addEventListener('pointerdown', handler, true);
        return () => document.removeEventListener('pointerdown', handler, true);
    }, [ref, onOutside]);
}