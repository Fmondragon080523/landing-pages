
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChromePicker } from 'react-color';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';

function GeneratorPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [landingPage, setLandingPage] = useState({
    id: Date.now(),
    title: '',
    description: '',
    primaryColor: '#3B82F6',
    whatsappNumber: '',
    calendarUrl: '',
    questions: [
      { question: '¿Estás interesado en nuestro servicio?', type: 'yes_no' }
    ],
    images: []
  });

  const handleSave = () => {
    if (!landingPage.title || !landingPage.description) {
      toast({
        title: "Error",
        description: "Por favor completa al menos el título y la descripción.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Guardar en localStorage
      const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
      localStorage.setItem('landingPages', JSON.stringify([...pages, landingPage]));

      toast({
        title: "¡Landing page creada!",
        description: "Tu landing page ha sido guardada exitosamente.",
      });

      // Redirigir a la vista previa
      navigate(`/preview/${landingPage.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al guardar la landing page.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Crear Nueva Landing Page</h1>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="basic">Básico</TabsTrigger>
              <TabsTrigger value="design">Diseño</TabsTrigger>
              <TabsTrigger value="form">Formulario</TabsTrigger>
              <TabsTrigger value="integration">Integraciones</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la Landing Page</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Consultoría de Marketing Digital"
                    value={landingPage.title}
                    onChange={(e) => setLandingPage({ ...landingPage, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Input
                    id="description"
                    placeholder="Describe tu servicio o producto"
                    value={landingPage.description}
                    onChange={(e) => setLandingPage({ ...landingPage, description: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <div className="space-y-4">
                <Label>Color Primario</Label>
                <ChromePicker
                  color={landingPage.primaryColor}
                  onChange={(color) => setLandingPage({ ...landingPage, primaryColor: color.hex })}
                  className="mb-4"
                />
              </div>
            </TabsContent>

            <TabsContent value="form" className="space-y-6">
              <div className="space-y-4">
                <Label>Preguntas de Calificación</Label>
                {landingPage.questions.map((q, index) => (
                  <div key={index} className="flex gap-4">
                    <Input
                      value={q.question}
                      onChange={(e) => {
                        const newQuestions = [...landingPage.questions];
                        newQuestions[index].question = e.target.value;
                        setLandingPage({ ...landingPage, questions: newQuestions });
                      }}
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newQuestions = landingPage.questions.filter((_, i) => i !== index);
                        setLandingPage({ ...landingPage, questions: newQuestions });
                      }}
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() => {
                    setLandingPage({
                      ...landingPage,
                      questions: [...landingPage.questions, { question: '', type: 'yes_no' }]
                    });
                  }}
                >
                  Añadir Pregunta
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    placeholder="Ej: +34612345678"
                    value={landingPage.whatsappNumber}
                    onChange={(e) => setLandingPage({ ...landingPage, whatsappNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calendar">URL del Calendario</Label>
                  <Input
                    id="calendar"
                    placeholder="URL de tu calendario de citas"
                    value={landingPage.calendarUrl}
                    onChange={(e) => setLandingPage({ ...landingPage, calendarUrl: e.target.value })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-8">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar Landing Page
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GeneratorPage;
