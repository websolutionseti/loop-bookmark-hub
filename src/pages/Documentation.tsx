import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Database, FileText, Code, GitBranch, Download, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FloatingNavigation } from '@/components/FloatingNavigation';

export default function Documentation() {
  const [showPasswords, setShowPasswords] = useState(false);

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${description} copiado para a área de transferência`,
    });
  };

  const bookmarkSchema = `{
  id: string;
  title: string;
  url?: string;
  icon?: string;
  type: 'folder' | 'link';
  parentId?: string;
  children?: Bookmark[];
  description?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  order: number;
}`;

  const bookmarkContextTypeSchema = `{
  bookmarks: Bookmark[];
  selectedBookmark: Bookmark | null;
  setSelectedBookmark: (bookmark: Bookmark | null) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBookmark: (id: string, updates: Partial<Bookmark>) => void;
  deleteBookmark: (id: string) => void;
  moveBookmark: (bookmarkId: string, newParentId?: string, newOrder?: number) => void;
  expandedFolders: Set<string>;
  toggleFolder: (folderId: string) => void;
}`;

  const dragItemSchema = `{
  id: string;
  type: 'bookmark';
  bookmark: Bookmark;
}`;

  const componentList = [
    {
      name: 'BookmarkSidebar',
      description: 'Componente para exibir a barra lateral de favoritos',
      props: 'Nenhum',
    },
    {
      name: 'BookmarkDetails',
      description: 'Componente para exibir os detalhes de um favorito',
      props: 'onEdit: () => void',
    },
    {
      name: 'BookmarkModal',
      description: 'Componente para exibir o modal de edição de um favorito',
      props: 'isOpen: boolean, onClose: () => void',
    },
    {
      name: 'Navigation',
      description: 'Componente para exibir a navegação principal',
      props: 'Nenhum',
    },
    {
      name: 'BookmarkProvider',
      description: 'Componente para fornecer o contexto de favoritos',
      props: 'Nenhum',
    },
  ];

  const hookList = [
    {
      name: 'useBookmarkContext',
      description: 'Hook para acessar o contexto de favoritos',
      returns: 'BookmarkContextType',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      <div className="container mx-auto px-4 py-8 pl-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            📚 Documentação
          </h1>
          <p className="text-muted-foreground">
            Guia completo para entender e utilizar o sistema de gerenciamento de
            favoritos
          </p>
        </div>

        <Tabs defaultValue="components" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="schemas">Schemas</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Componentes</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Lista de componentes utilizados no projeto
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {componentList.map((component) => (
                    <div key={component.name} className="space-y-1">
                      <h3 className="text-lg font-semibold">{component.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
                      <p className="text-sm">
                        <Code>Props: {component.props}</Code>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="hooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hooks</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Lista de hooks utilizados no projeto
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {hookList.map((hook) => (
                    <div key={hook.name} className="space-y-1">
                      <h3 className="text-lg font-semibold">{hook.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {hook.description}
                      </p>
                      <p className="text-sm">
                        <Code>Retorno: {hook.returns}</Code>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schemas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schemas</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Lista de schemas utilizados no projeto
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div>
                    <h4 className="mb-2 font-semibold">Bookmark</h4>
                    <ScrollArea className="h-48 rounded-md border">
                      <pre className="p-4 text-sm">
                        <code className="text-sm">{bookmarkSchema}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">BookmarkContextType</h4>
                    <ScrollArea className="h-48 rounded-md border">
                      <pre className="p-4 text-sm">
                        <code className="text-sm">{bookmarkContextTypeSchema}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold">DragItem</h4>
                    <ScrollArea className="h-48 rounded-md border">
                      <pre className="p-4 text-sm">
                        <code className="text-sm">{dragItemSchema}</code>
                      </pre>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
