import React from 'react';

const UserAvatars = () => {
  const avatars = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b5ac?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="flex -space-x-4">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`relative w-16 h-16 rounded-full border-4 border-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:z-10 animate-float`}
            style={{
              animationDelay: `${index * 0.1}s`,
              background: `linear-gradient(135deg, 
                ${index === 0 ? '#E0F2FE, #BAE6FD' : 
                  index === 1 ? '#FEF3C7, #FDE68A' : 
                  index === 2 ? '#FCE7F3, #FBCFE8' : 
                  index === 3 ? '#D1FAE5, #A7F3D0' : 
                  '#E0E7FF, #C7D2FE'})`
            }}
          >
            <img
              src={avatar}
              alt={`Usuario ${index + 1}`}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAvatars;