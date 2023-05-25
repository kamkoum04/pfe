import React from 'react';
import Typography from 'antd/es/typography/Typography';

const Header1 = () => {
  return (
    <header className="z-40 items-center w-full h-16 bg-white shadow-lg dark:bg-gray-800 rounded-2xl">
      <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
        <div className="relative flex items-center w-full pl-1 lg:max-w-68 sm:pr-2 sm:ml-0">
          <div className="container relative left-0 z-50 flex w-3/4 h-auto">
            <Typography.Text strong style={{ color: 'white' }}>
              Admin Dashboard
            </Typography.Text>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
