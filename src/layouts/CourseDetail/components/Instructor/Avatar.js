import * as React from "react";

export function Avatar({ src, alt, fallback, className }) {
  const [error, setError] = React.useState(false);

  return (
    <div className={`relative flex shrink-0 overflow-hidden ${className}`}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-muted">{fallback}</div>
      )}
    </div>
  );
}
