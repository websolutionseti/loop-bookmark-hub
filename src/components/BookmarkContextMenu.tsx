
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2, Copy, ExternalLink, Globe, Eye } from 'lucide-react';
import { Bookmark } from '@/types/bookmark';
import { useBookmarks } from '@/contexts/BookmarkContext';
import { toast } from '@/hooks/use-toast';

interface BookmarkContextMenuProps {
  bookmark: Bookmark;
  onEdit: () => void;
}

export const BookmarkContextMenu: React.FC<BookmarkContextMenuProps> = ({ bookmark, onEdit }) => {
  const { deleteBookmark, setSelectedBookmark } = useBookmarks();

  const handleCopyUrl = () => {
    if (bookmark.url) {
      navigator.clipboard.writeText(bookmark.url);
      toast({
        title: "URL copiada",
        description: "URL copiada para a área de transferência",
      });
    }
  };

  const handleOpenLink = () => {
    if (bookmark.url) {
      window.open(bookmark.url, '_blank');
    }
  };

  const handleViewIframe = () => {
    // Seleciona o bookmark e vai para a aba iframe automaticamente
    setSelectedBookmark(bookmark, true);
    // Aguarda um momento e então muda para a aba iframe
    setTimeout(() => {
      const event = new CustomEvent('switch-to-iframe-tab');
      window.dispatchEvent(event);
    }, 100);
  };

  const handleViewDetails = () => {
    setSelectedBookmark(bookmark, true);
  };

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja excluir "${bookmark.title}"?`)) {
      deleteBookmark(bookmark.id);
      toast({
        title: "Item excluído",
        description: `${bookmark.title} foi excluído com sucesso`,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          Ver Detalhes
        </DropdownMenuItem>
        
        {bookmark.type === 'link' && bookmark.url && (
          <>
            <DropdownMenuItem onClick={handleViewIframe}>
              <Globe className="mr-2 h-4 w-4" />
              Iframe (Super Atalho)
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleCopyUrl}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar URL
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenLink}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir Link
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
