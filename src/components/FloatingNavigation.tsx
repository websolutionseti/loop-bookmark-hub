
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Database, Settings, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';

export const FloatingNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Escuta evento de seleção de bookmark para recolher o drawer
  useEffect(() => {
    const handleBookmarkSelected = () => {
      setIsOpen(false);
    };

    window.addEventListener('bookmark-selected', handleBookmarkSelected);
    return () => {
      window.removeEventListener('bookmark-selected', handleBookmarkSelected);
    };
  }, []);

  const navigationGroups = [
    {
      title: 'Principal',
      items: [
        { path: '/', icon: Home, label: 'Favoritos' },
      ]
    },
    {
      title: 'Documentação',
      items: [
        { path: '/docs', icon: FileText, label: 'Documentação' },
        { path: '/api', icon: Database, label: 'API' },
      ]
    },
    {
      title: 'Conta',
      items: [
        { path: '/profile', icon: User, label: 'Perfil' },
        { path: '/settings', icon: Settings, label: 'Configurações' },
      ]
    }
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button 
            size="icon" 
            variant="outline"
            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-md border shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </DrawerTrigger>
        
        <DrawerContent className="h-[80vh]">
          <div className="flex flex-col h-full p-4">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
                📚 Favoritos
              </h2>
              <p className="text-sm text-muted-foreground">Sistema de Gerenciamento</p>
            </div>

            <div className="flex-1 overflow-auto space-y-6">
              {navigationGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map(({ path, icon: Icon, label }) => (
                      <Button
                        key={path}
                        variant={location.pathname === path ? "default" : "ghost"}
                        className="w-full justify-start h-12 px-4 text-left"
                        onClick={() => handleNavigate(path)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span className="text-sm font-medium">{label}</span>
                      </Button>
                    ))}
                  </div>
                  {groupIndex < navigationGroups.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t bg-muted/20 text-center">
              <div className="text-xs text-muted-foreground">
                v1.0.0 • Sistema de Favoritos
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
