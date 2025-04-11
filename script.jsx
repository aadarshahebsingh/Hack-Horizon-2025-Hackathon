import React from 'react';

function GreetingCard({ name }) {
  const handleClick = () => {
    alert(`Hello, ${name}!`);
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white rounded-2xl shadow-md space-y-2">
      <h1 className="text-xl font-bold text-gray-900">Welcome, {name}!</h1>
      <p className="text-gray-500">We hope you have a great day!</p>
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
      >
        Say Hello
      </button>
    </div>
  );
}

export default GreetingCard;
