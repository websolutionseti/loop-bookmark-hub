import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Code, Database, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FloatingNavigation } from '@/components/FloatingNavigation';

interface ApiEndpointWithParams {
  method: string;
  path: string;
  description: string;
  params?: { name: string; type: string; description: string; }[];
  response: string;
  example: string;
}

interface ApiEndpointWithBody {
  method: string;
  path: string;
  description: string;
  body?: string;
  response: string;
  example: string;
}

type ApiEndpoint = ApiEndpointWithParams | ApiEndpointWithBody;

export default function ApiDocumentation() {
  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${description} copiado para a área de transferência`,
    });
  };

  const apiEndpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      path: '/api/bookmarks',
      description: 'Listar todos os favoritos do usuário',
      params: [
        { name: 'parent_id', type: 'uuid', description: 'ID da pasta pai' },
        { name: 'type', type: 'string', description: 'Tipo: folder ou link' },
        { name: 'search', type: 'string', description: 'Termo de busca' }
      ],
      response: '{ bookmarks: Bookmark[], total: number }',
      example: `// GET /api/bookmarks?parent_id=123&type=folder
{
  "bookmarks": [
    {
      "id": "uuid",
      "title": "Desenvolvimento",
      "type": "folder",
      "parent_id": "123",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1
}`
    },
    {
      method: 'POST',
      path: '/api/bookmarks',
      description: 'Criar novo favorito',
      body: '{ title: string, url?: string, type: "folder"|"link", parent_id?: string }',
      response: '{ bookmark: Bookmark }',
      example: `// POST /api/bookmarks
// Body:
{
  "title": "Google",
  "url": "https://google.com",
  "type": "link"
}

// Response:
{
  "bookmark": {
    "id": "uuid",
    "title": "Google",
    "url": "https://google.com",
    "type": "link",
    "created_at": "2024-01-01T00:00:00Z"
  }
}`
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      <div className="container mx-auto px-4 py-8 pl-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            🚀 API Documentation
          </h1>
          <p className="text-muted-foreground">
            Documentação completa da API RESTful para gerenciamento de favoritos
          </p>
        </div>

        <div className="space-y-6">
          {apiEndpoints.map((endpoint, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Badge variant={
                    endpoint.method === 'GET' ? 'default' :
                    endpoint.method === 'POST' ? 'secondary' :
                    endpoint.method === 'PUT' ? 'outline' : 'destructive'
                  }>
                    {endpoint.method}
                  </Badge>
                  <code className="text-sm">{endpoint.path}</code>
                </CardTitle>
                <p className="text-muted-foreground">{endpoint.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {'params' in endpoint && endpoint.params && (
                  <div>
                    <h4 className="font-semibold mb-2">Parâmetros de Query</h4>
                    <div className="space-y-2">
                      {endpoint.params.map((param, pIndex) => (
                        <div key={pIndex} className="flex gap-2 items-start">
                          <Badge variant="outline">{param.type}</Badge>
                          <div>
                            <code className="text-sm">{param.name}</code>
                            <p className="text-xs text-muted-foreground">{param.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {'body' in endpoint && endpoint.body && (
                  <div>
                    <h4 className="font-semibold mb-2">Body da Requisição</h4>
                    <code className="text-sm bg-muted px-3 py-2 rounded block">
                      {endpoint.body}
                    </code>
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">Exemplo</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(endpoint.example, "Exemplo da API")}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                  <ScrollArea className="h-48 rounded-md border p-4">
                    <pre className="text-sm">
                      <code>{endpoint.example}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
