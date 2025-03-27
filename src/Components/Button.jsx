const Button = ({ variant, children, className, ...props }) => {
    const baseClass = "px-4 py-2 rounded";
    const variants = {
      primary: "bg-purple-800 text-white",
      outline: "border border-purple-800 text-purple-800",
    };
  
    return (
      <button
        className={`${baseClass} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  