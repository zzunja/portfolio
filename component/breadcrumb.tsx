import Link from 'next/link'

interface BreadcrumbProps {
  currentPage: string;
}

export default function Breadcrumb({ currentPage }: BreadcrumbProps) {
  return (
      <div className="flex font-mono">
        <Link href='/' className="transition-colors duration-200 ease-in-out hover:text-gray-400">Home</Link>
        {currentPage.toLowerCase() !== 'home' && (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus">
            <path d="M5 12h14" />
          </svg>
          <p className="animate-fadeIn">{currentPage}</p>
        </>
      )}
      </div>
    )
  }
