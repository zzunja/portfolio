interface ButtonProps {
  href: string;
}

export default function ViewButton({ href}: ButtonProps) {
  return (
    <a href={href} target="_blank">
      <div className="bg-black text-white dark:bg-white dark:text-black rounded-md w-fit p-1 flex items-center justify-center hover:bg-gray-600 dark:hover:bg-gray-200 cursor-pointer transition-colors duration-300">
        <p className="text-xl mx-auto ml-1">View</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </div>
    </a>
  );
}