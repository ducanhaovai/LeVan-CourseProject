export function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full py-3 px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border-2 bg-transparent hover:bg-gray-50",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
