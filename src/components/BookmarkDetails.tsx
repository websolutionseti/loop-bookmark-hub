import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Edit, Copy, Calendar, Tag, Folder, Link2, Globe, Eye } from 'lucide-react';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

interface BookmarkDetailsProps {
  onEdit: () => void;
}

export const BookmarkDetails: React.FC<BookmarkDetailsProps> = ({ onEdit }) => {
  const { selectedBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState('view');

  // Escuta evento para mudar para a aba iframe
  useEffect(() => {
    const handleSwitchToIframe = () => {
      if (selectedBookmark?.type === 'link' && selectedBookmark.url) {
        setActiveTab('iframe');
      }
    };

    window.addEventListener('switch-to-iframe-tab', handleSwitchToIframe);
    return () => {
      window.removeEventListener('switch-to-iframe-tab', handleSwitchToIframe);
    };
  }, [selectedBookmark]);

  // Reset tab when bookmark changes
  useEffect(() => {
    setActiveTab('view');
  }, [selectedBookmark?.id]);

  if (!selectedBookmark) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center text-muted-foreground">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-loop-purple-500/20 to-loop-blue-500/20 flex items-center justify-center">
            <Folder className="w-12 h-12 opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">Selecione um favorito</h3>
          <p className="text-sm">Clique em um item na barra lateral para ver os detalhes</p>
        </div>
      </div>
    );
  }

  const handleCopyUrl = () => {
    if (selectedBookmark.url) {
      navigator.clipboard.writeText(selectedBookmark.url);
      toast({
        title: "URL copiada",
        description: "URL copiada para a área de transferência",
      });
    }
  };

  const handleOpenLink = () => {
    if (selectedBookmark.url) {
      window.open(selectedBookmark.url, '_blank');
    }
  };

  // Renderiza conteúdo da aba "Ver e Copiar"
  const renderViewContent = () => (
    <div className="space-y-6">
      {/* URL Card */}
      {selectedBookmark.type === 'link' && selectedBookmark.url && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link2 className="w-5 h-5" />
              URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <code className="flex-1 text-sm break-all">{selectedBookmark.url}</code>
              <Button size="sm" variant="ghost" onClick={handleCopyUrl}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      {selectedBookmark.description && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg">Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {selectedBookmark.description}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Tags */}
      {selectedBookmark.tags && selectedBookmark.tags.length > 0 && (
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedBookmark.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-loop-purple-500/20 text-loop-purple-300 hover:bg-loop-purple-500/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Informações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Criado em</p>
              <p className="text-sm">
                {format(selectedBookmark.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Atualizado em</p>
              <p className="text-sm">
                {format(selectedBookmark.updatedAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Tipo</p>
            <p className="text-sm capitalize">{selectedBookmark.type === 'folder' ? 'Pasta' : 'Link'}</p>
          </div>

          {selectedBookmark.children && selectedBookmark.children.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Itens na pasta</p>
                <p className="text-sm">{selectedBookmark.children.length} item(s)</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Renderiza conteúdo da aba "Iframe"
  const renderIframeContent = () => {
    if (selectedBookmark.type !== 'link' || !selectedBookmark.url) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Este item não possui URL para visualização</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full">
        <Card className="h-full glass-effect">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Visualização do Site
              </CardTitle>
              <Button size="sm" variant="outline" onClick={handleOpenLink}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Original
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[calc(100vh-200px)] w-full">
              <iframe
                src={selectedBookmark.url}
                className="w-full h-full border-0 rounded-b-lg"
                title={selectedBookmark.title}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Renderiza conteúdo da aba "Editar"
  const renderEditContent = () => (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">Editar Favorito</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Clique no botão abaixo para abrir o editor
        </p>
        <Button onClick={onEdit} className="bg-loop-purple-600 hover:bg-loop-purple-700">
          <Edit className="w-4 h-4 mr-2" />
          Abrir Editor
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-loop-purple-500/5 to-loop-blue-500/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-loop-purple-500/20 to-loop-blue-500/20 flex items-center justify-center text-2xl">
              {selectedBookmark.icon || (selectedBookmark.type === 'folder' ? '📁' : '🔗')}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{selectedBookmark.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                {selectedBookmark.type === 'folder' ? (
                  <><Folder className="w-4 h-4" /> Pasta</>
                ) : (
                  <><Link2 className="w-4 h-4" /> Link</>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
            {selectedBookmark.type === 'link' && selectedBookmark.url && (
              <>
                <Button variant="outline" onClick={handleCopyUrl}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button onClick={handleOpenLink} className="bg-loop-purple-600 hover:bg-loop-purple-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="view" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Ver e Copiar
              </TabsTrigger>
              {selectedBookmark.type === 'link' && selectedBookmark.url && (
                <TabsTrigger value="iframe" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Iframe
                </TabsTrigger>
              )}
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Editar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="view" className="flex-1 p-6 mt-0">
            {renderViewContent()}
          </TabsContent>

          <TabsContent value="iframe" className="flex-1 p-6 mt-0">
            {renderIframeContent()}
          </TabsContent>

          <TabsContent value="edit" className="flex-1 mt-0">
            {renderEditContent()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
