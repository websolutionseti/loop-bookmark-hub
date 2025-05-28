
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, FileText, Database, Settings, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { path: '/', icon: Home, label: 'Favoritos' },
    { path: '/docs', icon: FileText, label: 'Documentação' },
    { path: '/api', icon: Database, label: 'API' },
    { path: '/settings', icon: Settings, label: 'Configurações' },
    { path: '/profile', icon: User, label: 'Perfil' }
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-lg">
        <div className="flex items-center gap-1">
          {navigationItems.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              variant={location.pathname === path ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(path)}
              className="rounded-full px-3"
              title={label}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};
