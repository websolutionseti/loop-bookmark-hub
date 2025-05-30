
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Camera, Save, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { FloatingNavigation } from '@/components/FloatingNavigation';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  
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

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleAvatarChange = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Upload de avatar será implementado em breve.",
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
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
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
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Camera className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Salvar' : 'Editar'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar e Nome */}
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
                    
                    {/* Informações de Contato */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Informações de Contato
                      </h4>
                      
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
                        <div>
                          <Label htmlFor="birthDate">Data de Nascimento</Label>
                          <Input
                            id="birthDate"
                            type="date"
                            value={profile.birthDate}
                            onChange={(e) => setProfile({...profile, birthDate: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="timezone">Fuso Horário</Label>
                          <Input
                            id="timezone"
                            value={profile.timezone}
                            onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Redes Sociais */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Redes Sociais
                      </h4>
                      
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
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={profile.linkedin}
                            onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter">Twitter</Label>
                          <Input
                            id="twitter"
                            value={profile.twitter}
                            onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Informações Profissionais */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Informações Profissionais</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="company">Empresa</Label>
                          <Input
                            id="company"
                            value={profile.company}
                            onChange={(e) => setProfile({...profile, company: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Cargo</Label>
                          <Input
                            id="position"
                            value={profile.position}
                            onChange={(e) => setProfile({...profile, position: e.target.value})}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle>📊 Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-loop-purple-500/10">
                    <div className="text-2xl font-bold text-loop-purple-400">{stats.totalBookmarks}</div>
                    <div className="text-xs text-muted-foreground">Favoritos</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-loop-blue-500/10">
                    <div className="text-2xl font-bold text-loop-blue-400">{stats.totalFolders}</div>
                    <div className="text-xs text-muted-foreground">Pastas</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <div className="text-2xl font-bold text-green-400">{stats.totalTags}</div>
                    <div className="text-xs text-muted-foreground">Tags</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                    <div className="text-xl font-bold text-yellow-400">{stats.accountAge}</div>
                    <div className="text-xs text-muted-foreground">Conta</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Conta */}
            <Card>
              <CardHeader>
                <CardTitle>🔐 Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Membro desde:</span>
                    <span>{new Date(profile.joinDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Último acesso:</span>
                    <span>Agora</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">Ativo</Badge>
                  </div>
                </div>
                
                <Separator />
                
                <Button variant="destructive" size="sm" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir Conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
