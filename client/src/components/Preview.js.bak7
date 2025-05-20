import React from 'react';
import ReactMarkdown from 'react-markdown';

const Preview = ({ sections }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    {sections.map((section) => (
      <div
        key={section.id}
        className="mb-8 last:mb-0 border-b border-gray-200 pb-6 last:border-0 last:pb-0"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-3">{section.title}</h3>
        <div className="prose prose-sm text-gray-600 mb-4">
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>
        {section.githubUrl && (
          <div className="mb-4">
            <a
              href={section.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 font-medium"
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                style={{ width: '20px', height: '20px' }}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.089 2.91.833.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.102-.253-.446-1.268.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.378.202 2.393.1 2.646.64.696 1.024 1.588 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.346.297.654.892.654 1.797 0 1.297-.013 2.345-.013 2.666 0 .268.18.583.688.482A10.02 10.02 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        )}
        {section.mediaUrl && (
          <div className="mt-4">
            {section.mediaUrl.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                controls
                className="w-full rounded-lg shadow-sm"
                style={{ maxHeight: '400px' }}
              >
                <source src={section.mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={section.mediaUrl}
                alt={section.title}
                className="w-full rounded-lg shadow-sm"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            )}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default Preview;