import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface FooterProps {
  githubUrl?: string;
  linkedinUrl?: string;
}

export const Footer = ({ githubUrl = 'https://github.com', linkedinUrl = 'https://linkedin.com' }: FooterProps) => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto p-5">
        <div className="flex justify-center items-center gap-8">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <FaGithub size={24} />
            <span>GitHub</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition"
          >
            <FaLinkedin size={24} />
            <span>LinkedIn</span>
          </a>
        </div>
        <div className="text-center text-gray-500 text-sm mt-3">
          © {new Date().getFullYear()} TMDB Explorer. All rights reserved.
        </div>
      </div>
    </footer>
  );
};