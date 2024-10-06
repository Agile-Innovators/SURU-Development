export function SkeletonLoader({ customClass = "", ...props }) {
    return (
        <div
            className={`rounded bg-zinc-300 animate-pulse ${customClass}`}
            {...props}
        />
    );
}
