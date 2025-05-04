
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { initFacebookPixel } from '@/lib/facebook-pixel';

function LandingPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [page, setPage] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    try {
      const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
      const currentPage = pages.find(p => p.id === parseInt(id));
      
      if (!currentPage) {
        toast({
          title: "Error",
          description: "No se encontró la landing page",
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }
      
      setPage(currentPage);
      initFacebookPixel('123456789');
    } catch (error) {
      console.error('Error al cargar la landing page:', error);
      toast({
        title: "Error",
        description: "Hubo un error al cargar la landing page",
        variant: "destructive"
      });
      navigate('/dashboard');
    }
  }, [id, navigate, toast]);

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [currentQuestion]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < page.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const isQualified = Object.values(newAnswers).filter(a => a === 'yes').length >= 1;

      if (isQualified) {
        toast({
          title: "¡Genial!",
          description: "Eres un candidato ideal para nuestro servicio.",
        });
        if (window.fbq) {
          window.fbq('track', 'Lead');
        }
      } else {
        toast({
          title: "Gracias por tu interés",
          description: "Te contactaremos si hay alguna oportunidad que se ajuste mejor a tus necesidades.",
        });
      }
    }
  };

  const handleWhatsApp = () => {
    if (!page.whatsappNumber) {
      toast({
        title: "Error",
        description: "No se ha configurado un número de WhatsApp",
        variant: "destructive"
      });
      return;
    }
    
    const message = encodeURIComponent("¡Hola! Estoy interesado en sus servicios.");
    window.open(`https://wa.me/${page.whatsappNumber}?text=${message}`, '_blank');
    if (window.fbq) {
      window.fbq('track', 'Contact');
    }
  };

  const handleCalendar = () => {
    if (!page.calendarUrl) {
      toast({
        title: "Error",
        description: "No se ha configurado un calendario",
        variant: "destructive"
      });
      return;
    }
    
    window.open(page.calendarUrl, '_blank');
    if (window.fbq) {
      window.fbq('track', 'Schedule');
    }
  };

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p className="text-gray-600">Por favor espera mientras cargamos tu landing page</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: page.primaryColor + '10' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
        >
          <h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: page.primaryColor }}
          >
            {page.title}
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            {page.description}
          </p>

          {currentQuestion < page.questions.length ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold mb-4">
                {page.questions[currentQuestion].question}
              </h2>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => handleAnswer('yes')}
                  style={{ backgroundColor: page.primaryColor }}
                >
                  Sí
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswer('no')}
                >
                  No
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-semibold mb-6">
                ¿Cómo te gustaría continuar?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Button
                  size="lg"
                  className="w-full p-8 h-auto flex flex-col gap-2"
                  style={{ backgroundColor: page.primaryColor }}
                  onClick={handleWhatsApp}
                >
                  <span className="text-xl">Chatear por WhatsApp</span>
                  <span className="text-sm opacity-90">
                    Respuesta inmediata
                  </span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full p-8 h-auto flex flex-col gap-2"
                  onClick={handleCalendar}
                >
                  <span className="text-xl">Agendar Videollamada</span>
                  <span className="text-sm opacity-90">
                    Consulta personalizada
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPreview;
