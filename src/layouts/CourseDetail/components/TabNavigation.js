const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ["overview", "curriculum", "instructor", "faqs", "reviews"];

  return (
    <nav className="flex flex-wrap border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
