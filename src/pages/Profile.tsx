
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Camera, Save, Trash2, Eye, EyeOff, Clock, ExternalLink, TrendingUp, BarChart3 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FloatingNavigation } from '@/components/FloatingNavigation';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovação. Especialista em React, Node.js e PostgreSQL.',
    avatar: '/placeholder.svg',
    phone: '+55 (11) 99999-9999',
    location: 'São Paulo, SP',
    website: 'https://joaosilva.dev',
    github: 'joaosilva',
    linkedin: 'joao-silva-dev',
    twitter: '@joaosilva',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
    joinDate: '2024-01-15',
    birthDate: '1990-05-15',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR'
  });

  const [stats] = useState({
    totalBookmarks: 248,
    totalFolders: 32,
    totalTags: 45,
    accountAge: '11 meses'
  });

  const [accountInfo] = useState({
    joinDate: '2024-01-15',
    lastAccess: 'Agora',
    status: 'Ativo',
    referralName: 'Maria Santos',
    referralEmail: 'maria.santos@email.com',
    referralSource: 'LinkedIn'
  });

  const [navigationData] = useState([
    {
      page: 'Dashboard',
      timeSpent: '2h 15m',
      entries: 5,
      lastVisit: '2024-01-20 14:30',
      exitTo: 'Favoritos'
    },
    {
      page: 'Favoritos',
      timeSpent: '45m',
      entries: 12,
      lastVisit: '2024-01-20 16:45',
      exitTo: 'Google.com'
    },
    {
      page: 'Documentação',
      timeSpent: '1h 20m',
      entries: 3,
      lastVisit: '2024-01-19 10:15',
      exitTo: 'GitHub.com'
    },
    {
      page: 'Configurações',
      timeSpent: '15m',
      entries: 2,
      lastVisit: '2024-01-18 09:00',
      exitTo: 'Dashboard'
    },
    {
      page: 'API',
      timeSpent: '30m',
      entries: 1,
      lastVisit: '2024-01-17 16:20',
      exitTo: 'Stack Overflow'
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    setShowAccountInfo(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowAccountInfo(true);
  };

  const handleAvatarChange = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Upload de avatar será implementado em breve.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Ação crítica",
      description: "Esta funcionalidade requer confirmação adicional.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <FloatingNavigation />
      
      <div className="container mx-auto px-4 py-8 pl-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-loop-purple-400 to-loop-blue-400 bg-clip-text text-transparent">
            👤 Meu Perfil
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e acompanhe sua atividade
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="profile">👤 Perfil</TabsTrigger>
            <TabsTrigger value="activity">📈 Atividade</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-loop-purple-400 mb-2">{stats.totalBookmarks}</div>
                  <div className="text-sm text-muted-foreground">Favoritos</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-loop-blue-400 mb-2">{stats.totalFolders}</div>
                  <div className="text-sm text-muted-foreground">Pastas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{stats.totalTags}</div>
                  <div className="text-sm text-muted-foreground">Tags</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-2">{stats.accountAge}</div>
                  <div className="text-sm text-muted-foreground">Conta</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Resumo de Atividade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold mb-1">5h 25m</div>
                    <div className="text-sm text-muted-foreground">Tempo Total Hoje</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold mb-1">23</div>
                    <div className="text-sm text-muted-foreground">Sites Visitados</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-2xl font-bold mb-1">8</div>
                    <div className="text-sm text-muted-foreground">Favoritos Acessados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Informações Básicas
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPersonalInfo(!showPersonalInfo)}
                      >
                        {showPersonalInfo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        {showPersonalInfo ? 'Ocultar' : 'Mostrar'}
                      </Button>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        size="sm"
                        onClick={() => isEditing ? handleSave() : handleEdit()}
                      >
                        {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                        {isEditing ? 'Salvar' : 'Editar'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={profile.avatar} alt={profile.name} />
                          <AvatarFallback className="text-xl">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            variant="outline"
                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                            onClick={handleAvatarChange}
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => setProfile({...profile, name: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({...profile, email: e.target.value})}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="bio">Biografia</Label>
                          <Textarea
                            id="bio"
                            value={profile.bio}
                            onChange={(e) => setProfile({...profile, bio: e.target.value})}
                            disabled={!isEditing}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {showPersonalInfo && (
                      <>
                        <Separator />
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold">Informações de Contato</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="phone">Telefone</Label>
                              <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <Label htmlFor="location">Localização</Label>
                              <Input
                                id="location"
                                value={profile.location}
                                onChange={(e) => setProfile({...profile, location: e.target.value})}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-semibold">Redes Sociais</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="website">Website</Label>
                              <Input
                                id="website"
                                value={profile.website}
                                onChange={(e) => setProfile({...profile, website: e.target.value})}
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <Label htmlFor="github">GitHub</Label>
                              <Input
                                id="github"
                                value={profile.github}
                                onChange={(e) => setProfile({...profile, github: e.target.value})}
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Account Information - Only shows when editing */}
                {showAccountInfo && isEditing && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        🔐 Informações da Conta
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Membro desde:</span>
                            <span>{new Date(accountInfo.joinDate).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Último acesso:</span>
                            <span>{accountInfo.lastAccess}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="secondary">{accountInfo.status}</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Indicação:</span>
                            <span>{accountInfo.referralName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Email do indicado:</span>
                            <span className="text-xs">{accountInfo.referralEmail}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Origem:</span>
                            <span>{accountInfo.referralSource}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="pt-4">
                        <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir Conta
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Atividade Recente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Última ação:</span>
                        <span className="text-muted-foreground">5 min atrás</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Favoritos hoje:</span>
                        <span className="text-green-500">+3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tempo online:</span>
                        <span>2h 15m</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Tempo de Navegação por Página
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Página</TableHead>
                      <TableHead>Tempo Total</TableHead>
                      <TableHead>Entradas</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead>Saída Para</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {navigationData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.page}</TableCell>
                        <TableCell>{item.timeSpent}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.entries}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(item.lastVisit).toLocaleString('pt-BR')}
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          {item.exitTo.includes('.com') ? (
                            <ExternalLink className="w-3 h-3" />
                          ) : null}
                          <span className="text-sm">{item.exitTo}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
