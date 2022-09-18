import React, { useEffect, useMemo } from 'react';

// Material-UI Imports
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// Icons from https://mui.com/components/material-icons/
import GroupsIcon from '@mui/icons-material/Groups';
import { useLocation, useNavigate } from 'react-router-dom';
import Groups from '@mui/icons-material/Groups';

const BottomNav = () => {
  const [value, setValue] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(() => {
    return [
      {
        title: 'Groups',
        href: '/groups',
        icon: <GroupsIcon />,
        element: <Groups />,
        action: () => {
          navigate('/groups');
        },
      },
    ];
  }, [navigate]);

  useEffect(() => {
    const path = window.location.pathname;

    tabs.forEach((tab, index) => {
      if (tab.href === path) {
        setValue(index);
      }
    });
  }, [location, tabs]);

  return (
    <>
      <footer>
        <BottomNavigation value={value}>
          {tabs.map((tab, index) => (
            <BottomNavigationAction
              label={tab.title}
              icon={tab.icon}
              onClick={tab.action}
              key={index}
              style={{
                maxWidth: 'none',
              }}
            />
          ))}
        </BottomNavigation>
      </footer>
    </>
  );
};

export default BottomNav;
