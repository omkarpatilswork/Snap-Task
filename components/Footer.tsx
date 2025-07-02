export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Built with ❤️ using Next.js and AI •{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
