import React, { useState } from 'react';
import { Bug, User, Radio, X } from 'lucide-react';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'bug', title: 'You have a bug that needs...', time: 'Just now', read: false },
    { id: 2, type: 'user', title: 'New user registered', time: '59 minutes ago', read: false },
    { id: 3, type: 'bug', title: 'You have a bug that needs...', time: '12 hours ago', read: true },
    { id: 4, type: 'subscription', title: 'Andi Lane subscribed to you', time: 'Today, 11:59 AM', read: true }
  ]);

  const activities = [
    { id: 1, text: 'You have a bug that needs...', time: 'Just now', avatar: 'https://i.pravatar.cc/150?img=1', initials: 'NC' },
    { id: 2, text: 'Released a new version', time: '59 minutes ago', avatar: null, initials: 'DC', color: 'bg-orange-500' },
    { id: 3, text: 'Submitted a bug', time: '12 hours ago', avatar: null, initials: 'OD', color: 'bg-cyan-500' },
    { id: 4, text: 'Modified A data in Page X', time: 'Today, 11:59 AM', avatar: 'https://i.pravatar.cc/150?img=4', initials: 'AL' },
    { id: 5, text: 'Deleted a page in Project X', time: 'Feb 2, 2023', avatar: 'https://i.pravatar.cc/150?img=5', initials: 'KM' }
  ];

  const contacts = [
    { id: 1, name: 'Natali Craig', avatar: 'https://i.pravatar.cc/150?img=10', initials: 'NC' },
    { id: 2, name: 'Drew Cano', avatar: null, initials: 'DC', color: 'bg-red-500' },
    { id: 3, name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/150?img=12', initials: 'OD' },
    { id: 4, name: 'Andi Lane', avatar: 'https://i.pravatar.cc/150?img=13', initials: 'AL' },
    { id: 5, name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/150?img=14', initials: 'KM' },
    { id: 6, name: 'Koray Okumus', avatar: null, initials: 'KO', color: 'bg-cyan-500' }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'bug':
        return <Bug className="w-4 h-4 text-gray-600" />;
      case 'user':
        return <User className="w-4 h-4 text-gray-600" />;
      case 'subscription':
        return <Radio className="w-4 h-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const dismissNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-screen bg-white shadow-2xl flex flex-col border-l border-gray-100">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-gray-200 bg-white">
        <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Notifications Section */}
        <div className="bg-white">
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              className="relative px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 border-b border-gray-100 group"
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                {/* Icon Circle */}
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'} truncate pr-6`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>

                {/* Dismiss Button */}
                <button
                  onClick={(e) => dismissNotification(notification.id, e)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                >
                  <X className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Activities Section */}
        <div className="mt-6 bg-white">
          <div className="px-4 py-2 bg-white">
            <h3 className="text-sm font-semibold text-gray-900">Activities</h3>
          </div>
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all duration-200 flex items-start gap-3"
            >
              {/* Avatar */}
              {activity.avatar ? (
                <img 
                  src={activity.avatar} 
                  alt={activity.initials}
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <div className={`w-8 h-8 ${activity.color || 'bg-gray-300'} rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                  {activity.initials}
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {activity.text}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contacts Section */}
        <div className="mt-6 pb-6 bg-white">
          <div className="px-4 py-2 bg-white">
            <h3 className="text-sm font-semibold text-gray-900">Contacts</h3>
          </div>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-all duration-200 flex items-center gap-3 group"
            >
              {/* Avatar */}
              {contact.avatar ? (
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <div className={`w-8 h-8 ${contact.color || 'bg-gray-300'} rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0`}>
                  {contact.initials}
                </div>
              )}
              
              {/* Name */}
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{contact.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;