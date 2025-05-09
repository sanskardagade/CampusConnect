import React, { useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

const MobileActionMenu = ({ row, actions }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500">
        <DotsVerticalIcon className="h-5 w-5 text-red-700" />
      </Menu.Button>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {actions.map((action) => (
            <Menu.Item key={action.name}>
              {({ active }) => (
                <button
                  onClick={() => action.action(row)}
                  className={`${
                    active ? 'bg-red-50 text-red-900' : 'text-gray-900'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  {action.icon && (
                    <span className="mr-3 text-red-700">{action.icon}</span>
                  )}
                  {action.name}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const DesktopSpeedDial = ({ actions }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setOpen(!open)}
        className="p-3 rounded-full bg-red-700 text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 bottom-full mb-2 space-y-2">
          {actions.map((action) => (
            <button
              key={action.name}
              onClick={action.action}
              className="flex items-center p-2 w-full rounded-md bg-white text-gray-800 shadow-lg hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              {action.icon && (
                <span className="mr-2 text-red-700">{action.icon}</span>
              )}
              <span>{action.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ResponsiveActionMenu = ({ row, actions }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isMobileDevice);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize the value on the first render
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileActionMenu row={row} actions={actions} />
      ) : (
        <DesktopSpeedDial actions={actions} />
      )}
    </>
  );
};

export default ResponsiveActionMenu;