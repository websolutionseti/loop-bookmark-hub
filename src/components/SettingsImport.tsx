
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SettingsImportProps {
  onImport: (settings: Record<string, any>) => void;
}

export const SettingsImport: React.FC<SettingsImportProps> = ({ onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const importedSettings = JSON.parse(content);
        
        // Validação básica da estrutura
        if (typeof importedSettings === 'object' && importedSettings !== null) {
          onImport(importedSettings);
          toast({
            title: "Configurações importadas!",
            description: "Configurações aplicadas com sucesso.",
          });
        } else {
          throw new Error('Formato inválido');
        }
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Arquivo inválido ou corrompido.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    // Limpa o input para permitir reimportar o mesmo arquivo
    event.target.value = '';
  };

  return (
    <>
      <Button variant="outline" onClick={handleImport}>
        <Upload className="w-4 h-4 mr-2" />
        Importar
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};
