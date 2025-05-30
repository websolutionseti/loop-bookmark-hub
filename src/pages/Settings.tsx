import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  Eye, 
  Database, 
  Shield, 
  Bell, 
  RefreshCw,
  Save,
  Moon,
  Sun,
  Monitor,
  Grid,
  List,
  TreePine,
  Lock,
  Trash2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FloatingNavigation } from '@/components/FloatingNavigation';
import { SettingsExport } from '@/components/SettingsExport';
import { SettingsImport } from '@/components/SettingsImport';

export default function Settings() {
  const [settings, setSettings] = useState({
    // Aparência
    theme: 'system',
    darkMode: false,
    compactMode: false,
    showIcons: true,
    showDescriptions: true,
    animationsEnabled: true,
    
    // Visualização
    defaultView: 'tree',
    itemsPerPage: 50,
    sortBy: 'name',
    sortOrder: 'asc',
    showThumbnails: true,
    gridColumns: 4,
    
    // Favoritos
    autoSaveChanges: true,
    autoAddToFolder: true,
    duplicateDetection: true,
    urlValidation: true,
    autoFetchTitles: true,
    autoGenerateTags: false,
    
    // Notificações
    emailNotifications: true,
    pushNotifications: false,
    syncNotifications: true,
    backupNotifications: true,
    weeklyReports: false,
    
    // Privacidade
    publicProfile: false,
    shareStats: false,
    allowIndexing: false,
    trackAnalytics: true,
    
    // Backup
    autoBackup: true,
    backupFrequency: 'weekly',
    keepBackups: 5,
    cloudSync: false,
    
    // Segurança
    twoFactorAuth: false,
    sessionTimeout: 30,
    logSessions: true,
    requirePassword: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImportSettings = (importedSettings: Record<string, any>) => {
    setSettings(prev => ({ ...prev, ...importedSettings }));
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  const handleReset = () => {
    setSettings({
      theme: 'system',
      darkMode: false,
      compactMode: false,
      showIcons: true,
      showDescriptions: true,
      animationsEnabled: true,
      defaultView: 'tree',
      itemsPerPage: 50,
      sortBy: 'name',
      sortOrder: 'asc',
      showThumbnails: true,
      gridColumns: 4,
      autoSaveChanges: true,
      autoAddToFolder: true,
      duplicateDetection: true,
      urlValidation: true,
      autoFetchTitles: true,
      autoGenerateTags: false,
      emailNotifications: true,
      pushNotifications: false,
      syncNotifications: true,
      backupNotifications: true,
      weeklyReports: false,
      publicProfile: false,
      shareStats: false,
      allowIndexing: false,
      trackAnalytics: true,
      autoBackup: true,
      backupFrequency: 'weekly',
      keepBackups: 5,
      cloudSync: false,
      twoFactorAuth: false,
      sessionTimeout: 30,
      logSessions: true,
      requirePassword: false
    });
    toast({
      title: "Configurações redefinidas",
      description: "Todas as configurações foram restauradas aos padrões.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      
      <div className="container mx-auto px-4 py-8 pl-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            ⚙️ Configurações
          </h1>
          <p className="text-muted-foreground">
            Personalize sua experiência com o sistema de favoritos
          </p>
        </div>

        <div className="flex justify-end gap-2 mb-6">
          <SettingsImport onImport={handleImportSettings} />
          <SettingsExport settings={settings} />
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Restaurar
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Tudo
          </Button>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="display">Visualização</TabsTrigger>
            <TabsTrigger value="bookmarks">Favoritos</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>

          {/* Aparência */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Tema e Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Tema do Sistema</Label>
                      <p className="text-sm text-muted-foreground">Escolha o tema da interface</p>
                    </div>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4" />
                            Claro
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4" />
                            Escuro
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" />
                            Sistema
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Modo Compacto</Label>
                      <p className="text-sm text-muted-foreground">Interface mais densa com menos espaçamento</p>
                    </div>
                    <Switch
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Mostrar Ícones</Label>
                      <p className="text-sm text-muted-foreground">Exibir ícones dos favoritos e pastas</p>
                    </div>
                    <Switch
                      checked={settings.showIcons}
                      onCheckedChange={(checked) => handleSettingChange('showIcons', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Mostrar Descrições</Label>
                      <p className="text-sm text-muted-foreground">Exibir descrições dos favoritos quando disponíveis</p>
                    </div>
                    <Switch
                      checked={settings.showDescriptions}
                      onCheckedChange={(checked) => handleSettingChange('showDescriptions', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Animações</Label>
                      <p className="text-sm text-muted-foreground">Habilitar animações na interface</p>
                    </div>
                    <Switch
                      checked={settings.animationsEnabled}
                      onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visualização */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Grid className="w-5 h-5" />
                  Layout e Organização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Visualização Padrão</Label>
                      <p className="text-sm text-muted-foreground">Modo de exibição inicial dos favoritos</p>
                    </div>
                    <Select value={settings.defaultView} onValueChange={(value) => handleSettingChange('defaultView', value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">
                          <div className="flex items-center gap-2">
                            <Grid className="w-4 h-4" />
                            Grade
                          </div>
                        </SelectItem>
                        <SelectItem value="list">
                          <div className="flex items-center gap-2">
                            <List className="w-4 h-4" />
                            Lista
                          </div>
                        </SelectItem>
                        <SelectItem value="tree">
                          <div className="flex items-center gap-2">
                            <TreePine className="w-4 h-4" />
                            Árvore
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Itens por Página: {settings.itemsPerPage}</Label>
                    <Slider
                      value={[settings.itemsPerPage]}
                      onValueChange={([value]) => handleSettingChange('itemsPerPage', value)}
                      max={100}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>10</span>
                      <span>100</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Colunas na Grade: {settings.gridColumns}</Label>
                    <Slider
                      value={[settings.gridColumns]}
                      onValueChange={([value]) => handleSettingChange('gridColumns', value)}
                      max={8}
                      min={2}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2</span>
                      <span>8</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Miniaturas</Label>
                      <p className="text-sm text-muted-foreground">Mostrar preview das páginas web</p>
                    </div>
                    <Switch
                      checked={settings.showThumbnails}
                      onCheckedChange={(checked) => handleSettingChange('showThumbnails', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favoritos */}
          <TabsContent value="bookmarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Comportamento dos Favoritos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Salvamento Automático</Label>
                      <p className="text-sm text-muted-foreground">Salvar alterações automaticamente</p>
                    </div>
                    <Switch
                      checked={settings.autoSaveChanges}
                      onCheckedChange={(checked) => handleSettingChange('autoSaveChanges', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Adicionar à Pasta Atual</Label>
                      <p className="text-sm text-muted-foreground">Novos favoritos vão para a pasta selecionada</p>
                    </div>
                    <Switch
                      checked={settings.autoAddToFolder}
                      onCheckedChange={(checked) => handleSettingChange('autoAddToFolder', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Detecção de Duplicatas</Label>
                      <p className="text-sm text-muted-foreground">Alertar sobre URLs já salvos</p>
                    </div>
                    <Switch
                      checked={settings.duplicateDetection}
                      onCheckedChange={(checked) => handleSettingChange('duplicateDetection', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Validação de URL</Label>
                      <p className="text-sm text-muted-foreground">Verificar se URLs são válidas</p>
                    </div>
                    <Switch
                      checked={settings.urlValidation}
                      onCheckedChange={(checked) => handleSettingChange('urlValidation', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Buscar Títulos Automaticamente</Label>
                      <p className="text-sm text-muted-foreground">Obter título da página automaticamente</p>
                    </div>
                    <Switch
                      checked={settings.autoFetchTitles}
                      onCheckedChange={(checked) => handleSettingChange('autoFetchTitles', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Gerar Tags Automaticamente</Label>
                      <p className="text-sm text-muted-foreground">Sugerir tags baseadas no conteúdo</p>
                    </div>
                    <Switch
                      checked={settings.autoGenerateTags}
                      onCheckedChange={(checked) => handleSettingChange('autoGenerateTags', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Preferências de Notificação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-muted-foreground">Receber updates importantes por email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Sincronização</Label>
                      <p className="text-sm text-muted-foreground">Alertas sobre status de sync</p>
                    </div>
                    <Switch
                      checked={settings.syncNotifications}
                      onCheckedChange={(checked) => handleSettingChange('syncNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Backup</Label>
                      <p className="text-sm text-muted-foreground">Confirmações de backup</p>
                    </div>
                    <Switch
                      checked={settings.backupNotifications}
                      onCheckedChange={(checked) => handleSettingChange('backupNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Relatórios Semanais</Label>
                      <p className="text-sm text-muted-foreground">Resumo semanal de atividades</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacidade */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Configurações de Privacidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Perfil Público</Label>
                      <p className="text-sm text-muted-foreground">Permitir que outros vejam seu perfil</p>
                    </div>
                    <Switch
                      checked={settings.publicProfile}
                      onCheckedChange={(checked) => handleSettingChange('publicProfile', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Compartilhar Estatísticas</Label>
                      <p className="text-sm text-muted-foreground">Permitir análise anônima de uso</p>
                    </div>
                    <Switch
                      checked={settings.shareStats}
                      onCheckedChange={(checked) => handleSettingChange('shareStats', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Indexação por Motores de Busca</Label>
                      <p className="text-sm text-muted-foreground">Permitir que mecanismos de busca indexem conteúdo público</p>
                    </div>
                    <Switch
                      checked={settings.allowIndexing}
                      onCheckedChange={(checked) => handleSettingChange('allowIndexing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Analytics</Label>
                      <p className="text-sm text-muted-foreground">Coletar dados de uso para melhorias</p>
                    </div>
                    <Switch
                      checked={settings.trackAnalytics}
                      onCheckedChange={(checked) => handleSettingChange('trackAnalytics', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Configurações de Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">Proteção adicional para sua conta</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {settings.twoFactorAuth && <Badge variant="secondary">Ativo</Badge>}
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Timeout de Sessão: {settings.sessionTimeout} minutos</Label>
                    <Slider
                      value={[settings.sessionTimeout]}
                      onValueChange={([value]) => handleSettingChange('sessionTimeout', value)}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5 min</span>
                      <span>2 horas</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Log de Sessões</Label>
                      <p className="text-sm text-muted-foreground">Registrar histórico de acessos</p>
                    </div>
                    <Switch
                      checked={settings.logSessions}
                      onCheckedChange={(checked) => handleSettingChange('logSessions', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-muted-foreground">Fazer backup automático dos dados</p>
                    </div>
                    <Switch
                      checked={settings.autoBackup}
                      onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                    />
                  </div>

                  {settings.autoBackup && (
                    <>
                      <div className="ml-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Frequência de Backup</Label>
                          <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange('backupFrequency', value)}>
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Diário</SelectItem>
                              <SelectItem value="weekly">Semanal</SelectItem>
                              <SelectItem value="monthly">Mensal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Manter Backups: {settings.keepBackups}</Label>
                          <Slider
                            value={[settings.keepBackups]}
                            onValueChange={([value]) => handleSettingChange('keepBackups', value)}
                            max={20}
                            min={1}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold text-destructive">Zona de Perigo</h4>
                    <div className="space-y-2">
                      <Button variant="destructive" size="sm" className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir Todos os Dados
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Esta ação não pode ser desfeita
                      </p>
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
