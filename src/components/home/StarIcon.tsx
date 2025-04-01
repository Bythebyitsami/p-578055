
export function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill={filled ? "#FFD700" : "none"} 
      stroke={filled ? "#FFD700" : "currentColor"} 
      className="mr-1"
    >
      <polygon 
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
