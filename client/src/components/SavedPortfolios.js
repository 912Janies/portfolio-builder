import React from 'react';

const SavedPortfolios = ({ portfolios, onLoad, onDelete }) => (
  <section className="w-full max-w-[90rem] mx-auto py-8 px-6 sm:px-8 lg:px-12 animate-fade-in">
    <h2 className="text-2xl font-extrabold text-white mb-6 drop-shadow-lg animate-slide-up">
      Saved Portfolios
    </h2>
    {portfolios.length === 0 ? (
      <p className="text-gray-200 drop-shadow-sm">No portfolios saved yet.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio._id}
            className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100/50 animate-slide-up"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{portfolio.title}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {portfolio.sections.length} section{portfolio.sections.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onLoad(portfolio)}
                className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-glow hover:scale-105 transform"
              >
                Load
              </button>
              <button
                onClick={() => onDelete(portfolio._id)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-glow hover:scale-105 transform"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </section>
);

export default SavedPortfolios;