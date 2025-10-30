import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import PaymentIcon from '@mui/icons-material/Payment';
import HotelIcon from '@mui/icons-material/Hotel';
import QuizIcon from '@mui/icons-material/Quiz';
// Reuse the modernized styles like Student sidebar
const listItemStyles = {
    mb: 0.5,
    mx: 1,
    borderRadius: 2,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateX(4px)',
    }
};
const managementItems = [
    // { text: 'Admissions', to: '/Student/admissions', icon: <SchoolIcon /> },
    { text: 'Fee Management', to: '/Student/fees', icon: <PaymentIcon /> },
    { text: 'Hostel', to: '/Student/hostels', icon: <HotelIcon /> },
    { text: 'Exams', to: '/Student/exams', icon: <QuizIcon /> },
];
const mainItems = [
    { text: 'Home', to: '/', icon: <HomeIcon />, activePaths: ['/', '/Student/dashboard'] },
    { text: 'Subjects', to: '/Student/subjects', icon: <AssignmentIcon /> },
    // ATTENDANCE DISABLED: { text: 'Attendance', to: '/Student/attendance', icon: <ClassOutlinedIcon /> },
    { text: 'Complain', to: '/Student/complain', icon: <AnnouncementOutlinedIcon /> },
];

const userItems = [
    { text: 'Profile', to: '/Student/profile', icon: <AccountCircleOutlinedIcon /> },
    { text: 'Logout', to: '/logout', icon: <ExitToAppIcon />, isLogout: true },
];

const NavItem = ({ item }) => {
    const location = useLocation();
    const isActive = item.activePaths
        ? item.activePaths.includes(location.pathname)
        : location.pathname.startsWith(item.to);

    const iconColor = isActive ? (item.isLogout ? '#ef4444' : '#8b5cf6') : '#6b7280';
    const textColor = isActive ? (item.isLogout ? '#ef4444' : '#8b5cf6') : '#374151';
    const fontWeight = isActive ? 600 : 400;
    const hoverBg = item.isLogout ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)';

    return (
        <Tooltip title={item.text} placement="right" arrow>
            <ListItemButton
                component={Link}
                to={item.to}
                sx={{
                    ...listItemStyles,
                    '&:hover': {
                        ...listItemStyles['&:hover'],
                        backgroundColor: hoverBg,
                    }
                }}
            >
                <ListItemIcon>
                    {React.cloneElement(item.icon, { sx: { color: iconColor } })}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: textColor, fontWeight }} />
            </ListItemButton>
        </Tooltip>
    );
};

const ListHeader = ({ text }) => (
    <ListSubheader
        component="div"
        inset
        sx={{
            color: '#8b5cf6',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            backgroundColor: 'transparent',
        }}
    >
        {text}
    </ListSubheader>
);

const StudentSideBar = () => {
    return (
        <>
            <React.Fragment>
                {mainItems.map((item) => <NavItem key={item.text} item={item} />)}
            </React.Fragment>

            <Divider sx={{ my: 2, mx: 2, backgroundColor: '#e5e7eb' }} />

            <React.Fragment>
                <ListHeader text="Management" />
                {managementItems.map((item) => <NavItem key={item.text} item={item} />)}
            </React.Fragment>
                  <Divider sx={{ my: 2, mx: 2, backgroundColor: '#e5e7eb' }} />
                
            <React.Fragment>
                <ListHeader text="User" />
                {userItems.map((item) => <NavItem key={item.text} item={item} />)}
            </React.Fragment>
        </>
    )
}

export default StudentSideBar
