import React from 'react';

export const TabNavigation = ({ tabs, activeTab, onTabChange }) => (
  <div className="bg-white border-b border-gray-200">
    <div className="max-w-6xl mx-auto px-4">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.name}
            {tab.count && (
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  </div>
);
