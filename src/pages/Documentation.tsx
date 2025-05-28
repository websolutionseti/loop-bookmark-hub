import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Database, FileText, Code, GitBranch, Download, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

import { Navigation } from '@/components/Navigation';

export default function Documentation() {
  const [showPasswords, setShowPasswords] = useState(false);

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${description} copiado para a área de transferência`,
    });
  };

  const postgresqlSchema = `-- PostgreSQL/Supabase Schema
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  type TEXT CHECK (type IN ('folder', 'link')) DEFAULT 'link',
  parent_id UUID REFERENCES bookmarks(id) ON DELETE CASCADE,
  description TEXT,
  tags TEXT[],
  order_index INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  visit_count INTEGER DEFAULT 0,
  last_visited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#8B5CF6',
  description TEXT,
  created_by UUID REFERENCES auth.users(id),
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookmark_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bookmark_id UUID REFERENCES bookmarks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bookmark_id, tag_id)
);

CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT CHECK (theme IN ('light', 'dark', 'system')) DEFAULT 'system',
  default_view TEXT CHECK (default_view IN ('grid', 'list', 'tree')) DEFAULT 'tree',
  items_per_page INTEGER DEFAULT 50,
  auto_backup BOOLEAN DEFAULT TRUE,
  backup_frequency TEXT CHECK (backup_frequency IN ('daily', 'weekly', 'monthly')) DEFAULT 'weekly',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE backups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_size INTEGER,
  backup_type TEXT CHECK (backup_type IN ('manual', 'automatic')) DEFAULT 'manual',
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;

  const mysqlSchema = `-- MySQL/MariaDB Schema
CREATE TABLE profiles (
  id CHAR(36) PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bookmarks (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  icon TEXT,
  type ENUM('folder', 'link') DEFAULT 'link',
  parent_id CHAR(36),
  description TEXT,
  tags JSON,
  order_index INT DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  visit_count INT DEFAULT 0,
  last_visited_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES bookmarks(id) ON DELETE CASCADE
);

CREATE TABLE tags (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#8B5CF6',
  description TEXT,
  created_by CHAR(36),
  is_shared BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES profiles(id)
);

CREATE TABLE bookmark_tags (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  bookmark_id CHAR(36),
  tag_id CHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (bookmark_id) REFERENCES bookmarks(id) ON DELETE CASCADE,
  FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
  UNIQUE(bookmark_id, tag_id)
);

CREATE TABLE user_settings (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36) UNIQUE,
  theme ENUM('light', 'dark', 'system') DEFAULT 'system',
  default_view ENUM('grid', 'list', 'tree') DEFAULT 'tree',
  items_per_page INT DEFAULT 50,
  auto_backup BOOLEAN DEFAULT TRUE,
  backup_frequency ENUM('daily', 'weekly', 'monthly') DEFAULT 'weekly',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE backups (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36),
  filename TEXT NOT NULL,
  file_size INT,
  backup_type ENUM('manual', 'automatic') DEFAULT 'manual',
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE
);

CREATE TABLE audit_log (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id CHAR(36),
  action VARCHAR(255) NOT NULL,
  target_table VARCHAR(255) NOT NULL,
  target_id CHAR(36),
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE SET NULL
);`;

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/bookmarks',
      description: 'Listar todos os favoritos do usuário',
      params: '?parent_id=uuid&type=folder|link&search=termo',
      response: '{ bookmarks: Bookmark[], total: number }'
    },
    {
      method: 'POST',
      endpoint: '/api/bookmarks',
      description: 'Criar novo favorito',
      body: '{ title: string, url?: string, type: "folder"|"link", parent_id?: string }',
      response: '{ bookmark: Bookmark }'
    },
    {
      method: 'PUT',
      endpoint: '/api/bookmarks/:id',
      description: 'Atualizar favorito existente',
      body: '{ title?: string, url?: string, description?: string, tags?: string[] }',
      response: '{ bookmark: Bookmark }'
    },
    {
      method: 'DELETE',
      endpoint: '/api/bookmarks/:id',
      description: 'Excluir favorito',
      response: '{ success: boolean }'
    },
    {
      method: 'GET',
      endpoint: '/api/tags',
      description: 'Listar todas as tags do usuário',
      response: '{ tags: Tag[] }'
    },
    {
      method: 'POST',
      endpoint: '/api/tags',
      description: 'Criar nova tag',
      body: '{ name: string, color?: string, description?: string }',
      response: '{ tag: Tag }'
    },
    {
      method: 'GET',
      endpoint: '/api/profile',
      description: 'Obter perfil do usuário',
      response: '{ profile: Profile }'
    },
    {
      method: 'PUT',
      endpoint: '/api/profile',
      description: 'Atualizar perfil do usuário',
      body: '{ name?: string, avatar_url?: string }',
      response: '{ profile: Profile }'
    },
    {
      method: 'GET',
      endpoint: '/api/settings',
      description: 'Obter configurações do usuário',
      response: '{ settings: UserSettings }'
    },
    {
      method: 'PUT',
      endpoint: '/api/settings',
      description: 'Atualizar configurações do usuário',
      body: '{ theme?: string, default_view?: string, items_per_page?: number }',
      response: '{ settings: UserSettings }'
    },
    {
      method: 'POST',
      endpoint: '/api/backup',
      description: 'Criar backup dos favoritos',
      response: '{ backup: Backup, download_url: string }'
    },
    {
      method: 'GET',
      endpoint: '/api/stats',
      description: 'Obter estatísticas do usuário',
      response: '{ total_bookmarks: number, total_folders: number, total_links: number, total_tags: number }'
    }
  ];

  const installCommands = {
    postgresql: `-- PostgreSQL/Supabase
-- 1. Criar projeto no Supabase
-- 2. Executar o schema fornecido no SQL Editor
-- 3. Configurar variáveis de ambiente:
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima`,
    mysql: `-- MySQL
CREATE DATABASE favoritos_db;
USE favoritos_db;
-- Executar schema MySQL fornecido

-- Variáveis de ambiente:
DATABASE_URL=mysql://usuario:senha@localhost:3306/favoritos_db`,
    mariadb: `-- MariaDB  
CREATE DATABASE favoritos_db;
USE favoritos_db;
-- Executar schema MariaDB fornecido

-- Variáveis de ambiente:
DATABASE_URL=mariadb://usuario:senha@localhost:3306/favoritos_db`
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            📚 Documentação do Sistema
          </h1>
          <p className="text-muted-foreground">
            Documentação completa do banco de dados, API e configurações
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="database">Banco de Dados</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="installation">Instalação</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Sistema de Gerenciamento de Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Um sistema completo para organização e gerenciamento de favoritos com suporte a múltiplos 
                  bancos de dados, interface hierárquica e funcionalidades avançadas de busca e categorização.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">🎯 Principais Recursos</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Organização hierárquica em pastas</li>
                      <li>• Sistema de tags avançado</li>
                      <li>• Busca inteligente</li>
                      <li>• Backup automático</li>
                      <li>• Multi-banco de dados</li>
                      <li>• API RESTful completa</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">🛠️ Tecnologias</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• React 18 + TypeScript</li>
                      <li>• Supabase/PostgreSQL</li>
                      <li>• MySQL/MariaDB</li>
                      <li>• Tailwind CSS</li>
                      <li>• shadcn/ui</li>
                      <li>• React Query</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-loop-purple-500/10">
                    <div className="text-2xl font-bold text-loop-purple-400">7</div>
                    <div className="text-sm text-muted-foreground">Tabelas</div>
                  </div>
                  <div className="p-4 rounded-lg bg-loop-blue-500/10">
                    <div className="text-2xl font-bold text-loop-blue-400">12</div>
                    <div className="text-sm text-muted-foreground">Endpoints API</div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-500/10">
                    <div className="text-2xl font-bold text-green-400">3</div>
                    <div className="text-sm text-muted-foreground">Bancos Suportados</div>
                  </div>
                  <div className="p-4 rounded-lg bg-yellow-500/10">
                    <div className="text-2xl font-bold text-yellow-400">RLS</div>
                    <div className="text-sm text-muted-foreground">Segurança</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Esquemas de Banco de Dados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="postgresql" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="postgresql">PostgreSQL/Supabase</TabsTrigger>
                    <TabsTrigger value="mysql">MySQL/MariaDB</TabsTrigger>
                  </TabsList>

                  <TabsContent value="postgresql">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Schema PostgreSQL/Supabase</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(postgresqlSchema, "Schema PostgreSQL")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <ScrollArea className="h-96 rounded-md border p-4">
                        <pre className="text-sm">
                          <code>{postgresqlSchema}</code>
                        </pre>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent value="mysql">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold">Schema MySQL/MariaDB</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(mysqlSchema, "Schema MySQL")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </Button>
                      </div>
                      <ScrollArea className="h-96 rounded-md border p-4">
                        <pre className="text-sm">
                          <code>{mysqlSchema}</code>
                        </pre>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Endpoints da API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          endpoint.method === 'GET' ? 'default' :
                          endpoint.method === 'POST' ? 'secondary' :
                          endpoint.method === 'PUT' ? 'outline' : 'destructive'
                        }>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                      {endpoint.params && (
                        <div>
                          <span className="text-xs font-semibold">Parâmetros:</span>
                          <code className="text-xs ml-2 bg-muted px-2 py-1 rounded">
                            {endpoint.params}
                          </code>
                        </div>
                      )}
                      {endpoint.body && (
                        <div>
                          <span className="text-xs font-semibold">Body:</span>
                          <code className="text-xs ml-2 bg-muted px-2 py-1 rounded">
                            {endpoint.body}
                          </code>
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold">Response:</span>
                        <code className="text-xs ml-2 bg-muted px-2 py-1 rounded">
                          {endpoint.response}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="installation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Configuração e Instalação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="supabase" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="supabase">Supabase</TabsTrigger>
                    <TabsTrigger value="mysql">MySQL</TabsTrigger>
                    <TabsTrigger value="mariadb">MariaDB</TabsTrigger>
                  </TabsList>

                  {Object.entries(installCommands).map(([key, commands]) => (
                    <TabsContent key={key} value={key === 'postgresql' ? 'supabase' : key}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">
                            Configuração {key === 'postgresql' ? 'Supabase' : key.toUpperCase()}
                          </h4>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowPasswords(!showPasswords)}
                            >
                              {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(commands, `Comandos ${key}`)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copiar
                            </Button>
                          </div>
                        </div>
                        <ScrollArea className="h-32 rounded-md border p-4">
                          <pre className="text-sm">
                            <code>{showPasswords ? commands : commands.replace(/senha/g, '***')}</code>
                          </pre>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Sistema de Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">📦 Backup Automático</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Backups automáticos diários/semanais/mensais</li>
                      <li>• Compressão e encriptação dos dados</li>
                      <li>• Armazenamento em múltiplas localizações</li>
                      <li>• Verificação de integridade automática</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">🔄 Restauração</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Restauração seletiva por data</li>
                      <li>• Preview antes da restauração</li>
                      <li>• Merge com dados existentes</li>
                      <li>• Logs detalhados do processo</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold">💾 Comandos de Backup</h4>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Backup PostgreSQL/Supabase</h5>
                      <code className="text-sm bg-muted px-3 py-2 rounded block">
                        pg_dump -h seu-host -U postgres -d seu-banco --clean --no-owner --no-privileges > backup.sql
                      </code>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Backup MySQL/MariaDB</h5>
                      <code className="text-sm bg-muted px-3 py-2 rounded block">
                        mysqldump -u usuario -p favoritos_db > backup.sql
                      </code>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">Restauração</h5>
                      <code className="text-sm bg-muted px-3 py-2 rounded block">
                        # PostgreSQL: psql -h seu-host -U postgres -d seu-banco < backup.sql<br/>
                        # MySQL: mysql -u usuario -p favoritos_db < backup.sql
                      </code>
                    </div>
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
