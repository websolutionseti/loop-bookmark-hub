import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Play, Code, Key, Server } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';

export default function ApiDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('bookmarks-get');
  const [apiKey, setApiKey] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência",
    });
  };

  const endpoints = {
    'bookmarks-get': {
      method: 'GET',
      path: '/api/bookmarks',
      description: 'Listar favoritos do usuário',
      params: [
        { name: 'parent_id', type: 'string', description: 'ID da pasta pai' },
        { name: 'type', type: 'folder|link', description: 'Tipo de favorito' },
        { name: 'search', type: 'string', description: 'Termo de busca' },
        { name: 'limit', type: 'number', description: 'Limite de resultados' },
        { name: 'offset', type: 'number', description: 'Offset para paginação' }
      ],
      response: `{
  "bookmarks": [
    {
      "id": "uuid",
      "title": "Meu Site",
      "url": "https://exemplo.com",
      "type": "link",
      "parent_id": null,
      "description": "Site interessante",
      "tags": ["trabalho", "desenvolvimento"],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "pagination": {
    "limit": 50,
    "offset": 0,
    "has_more": false
  }
}`,
      example: `// JavaScript/TypeScript
const response = await fetch('/api/bookmarks?type=link&search=site', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();

// cURL
curl -X GET "https://sua-app.com/api/bookmarks?type=link" \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json"`
    },
    'bookmarks-post': {
      method: 'POST',
      path: '/api/bookmarks',
      description: 'Criar novo favorito',
      body: `{
  "title": "string (obrigatório)",
  "url": "string (opcional para pastas)",
  "type": "folder|link",
  "parent_id": "string (opcional)",
  "description": "string (opcional)",
  "tags": ["string"] (opcional),
  "icon": "string (opcional)"
}`,
      response: `{
  "bookmark": {
    "id": "uuid",
    "title": "Novo Site",
    "url": "https://novo-site.com",
    "type": "link",
    "parent_id": null,
    "created_at": "2024-01-01T00:00:00Z"
  }
}`,
      example: `// JavaScript/TypeScript
const response = await fetch('/api/bookmarks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Meu Novo Site',
    url: 'https://exemplo.com',
    type: 'link',
    description: 'Descrição do site'
  })
});

// cURL
curl -X POST "https://sua-app.com/api/bookmarks" \\
  -H "Authorization: Bearer SEU_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Novo Site","url":"https://exemplo.com","type":"link"}'`
    },
    'tags-get': {
      method: 'GET',
      path: '/api/tags',
      description: 'Listar tags do usuário',
      params: [
        { name: 'search', type: 'string', description: 'Buscar por nome da tag' },
        { name: 'shared', type: 'boolean', description: 'Incluir tags compartilhadas' }
      ],
      response: `{
  "tags": [
    {
      "id": "uuid",
      "name": "trabalho",
      "color": "#8B5CF6",
      "description": "Tags relacionadas ao trabalho",
      "is_shared": false,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}`,
      example: `// JavaScript/TypeScript
const response = await fetch('/api/tags', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
});
const { tags } = await response.json();`
    },
    'backup-post': {
      method: 'POST',
      path: '/api/backup',
      description: 'Criar backup dos favoritos',
      body: `{
  "format": "json|sql",
  "include_settings": boolean,
  "include_tags": boolean
}`,
      response: `{
  "backup": {
    "id": "uuid",
    "filename": "backup_2024-01-01.json",
    "file_size": 1024,
    "status": "completed"
  },
  "download_url": "https://sua-app.com/downloads/backup_uuid"
}`,
      example: `// JavaScript/TypeScript
const response = await fetch('/api/backup', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    format: 'json',
    include_settings: true,
    include_tags: true
  })
});`
    }
  };

  const currentEndpoint = endpoints[selectedEndpoint as keyof typeof endpoints];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            🚀 API Documentation
          </h1>
          <p className="text-muted-foreground">
            Documentação completa da API RESTful do sistema de favoritos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar com endpoints */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {Object.entries(endpoints).map(([key, endpoint]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedEndpoint(key)}
                      className={`w-full text-left p-3 hover:bg-muted/50 transition-colors border-l-2 ${
                        selectedEndpoint === key 
                          ? 'border-loop-purple-500 bg-muted/50' 
                          : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={
                          endpoint.method === 'GET' ? 'default' :
                          endpoint.method === 'POST' ? 'secondary' :
                          endpoint.method === 'PUT' ? 'outline' : 'destructive'
                        } className="text-xs">
                          {endpoint.method}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium">{endpoint.path}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {endpoint.description}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo principal */}
          <div className="lg:col-span-3 space-y-6">
            {/* Informações do endpoint */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    currentEndpoint.method === 'GET' ? 'default' :
                    currentEndpoint.method === 'POST' ? 'secondary' :
                    currentEndpoint.method === 'PUT' ? 'outline' : 'destructive'
                  }>
                    {currentEndpoint.method}
                  </Badge>
                  <code className="text-lg font-mono">{currentEndpoint.path}</code>
                </div>
                <p className="text-muted-foreground">{currentEndpoint.description}</p>
              </CardHeader>
            </Card>

            {/* Parâmetros */}
            {currentEndpoint.params && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Parâmetros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentEndpoint.params.map((param, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {param.name}
                          </code>
                          <Badge variant="outline" className="text-xs">
                            {param.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Body */}
            {currentEndpoint.body && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Request Body</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(currentEndpoint.body!)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-32 rounded-md border p-4">
                    <pre className="text-sm">
                      <code>{currentEndpoint.body}</code>
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            )}

            {/* Response */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Response</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(currentEndpoint.response)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48 rounded-md border p-4">
                  <pre className="text-sm">
                    <code>{currentEndpoint.response}</code>
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Exemplos */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Exemplos de Código
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(currentEndpoint.example)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64 rounded-md border p-4">
                  <pre className="text-sm">
                    <code>{currentEndpoint.example}</code>
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Testador de API */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Testar API
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Token de Autenticação</label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Insira seu token JWT"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Key className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" disabled={!apiKey}>
                  <Play className="w-4 h-4 mr-2" />
                  Executar Teste
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
