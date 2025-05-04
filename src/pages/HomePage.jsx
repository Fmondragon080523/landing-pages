
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MessageCircle, Calendar, Users, Settings, ArrowDownToLine } from 'lucide-react';
import Navbar from '@/components/Navbar';

function HomePage() {
  const navigate = useNavigate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen">
      <div className="relative hero-pattern">
        <Navbar />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/e657bf97-d49e-463e-b214-8035247883d8/c2dda75ffcdf43a57777993a93cfcabb.png"
                alt="Electrofix Technology Logo"
                className="h-24 w-24"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crea Landing Pages que <span className="gradient-text">Convierten</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Genera landing pages personalizadas que filtran leads y automatizan tu proceso de ventas
            </p>
            <Button 
              className="text-lg px-8 py-6" 
              size="lg"
              onClick={() => navigate('/generator')}
            >
              Comenzar Ahora
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </section>
      </div>

      {/* How it Works Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-600">De la publicidad a la conversión en tres simples pasos</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ArrowDownToLine className="w-8 h-8 text-blue-500" />,
                title: "Atrae Tráfico",
                description: "Conecta tus campañas publicitarias con landing pages optimizadas"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Filtra Leads",
                description: "Cualifica automáticamente a tus prospectos con formularios inteligentes"
              },
              {
                icon: <Calendar className="w-8 h-8 text-blue-500" />,
                title: "Convierte",
                description: "Agenda videollamadas o conecta por WhatsApp automáticamente"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="feature-card"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Características Principales</h2>
            <p className="text-gray-600">Todo lo que necesitas para convertir visitas en clientes</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Settings className="w-6 h-6 text-blue-500" />,
                title: "Personalización Total",
                description: "Modifica textos, colores y secciones fácilmente"
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
                title: "Formularios Inteligentes",
                description: "Filtra prospectos con preguntas personalizadas"
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
                title: "Conexión WhatsApp",
                description: "Mensajes prellenados para conversación inmediata"
              },
              {
                icon: <Calendar className="w-6 h-6 text-blue-500" />,
                title: "Agenda Automática",
                description: "Integración con calendarios para videollamadas"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comienza a Generar Más Conversiones
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Crea tu primera landing page optimizada en minutos
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-blue-600"
              onClick={() => navigate('/generator')}
            >
              Empezar Gratis
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2025 Electrofix Technology. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
