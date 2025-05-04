
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [landingPages, setLandingPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    totalLeads: 0,
    conversionRate: 0,
    pageStats: []
  });

  useEffect(() => {
    const pages = JSON.parse(localStorage.getItem('landingPages') || '[]');
    setLandingPages(pages);

    // Simulación de datos analíticos
    const analyticsData = pages.map(page => ({
      name: page.title,
      visits: Math.floor(Math.random() * 100),
      leads: Math.floor(Math.random() * 50),
      interested: Math.floor(Math.random() * 30),
      notInterested: Math.floor(Math.random() * 20)
    }));

    const totalVisits = analyticsData.reduce((acc, curr) => acc + curr.visits, 0);
    const totalLeads = analyticsData.reduce((acc, curr) => acc + curr.leads, 0);

    setAnalytics({
      totalVisits,
      totalLeads,
      conversionRate: totalVisits ? ((totalLeads / totalVisits) * 100).toFixed(1) : 0,
      pageStats: analyticsData
    });
  }, []);

  const filteredPages = landingPages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletePage = (id) => {
    const newPages = landingPages.filter(page => page.id !== id);
    localStorage.setItem('landingPages', JSON.stringify(newPages));
    setLandingPages(newPages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Bienvenido, {user?.email}</p>
          </div>
          <Button onClick={() => navigate('/generator')}>
            Crear Nueva Landing Page
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-8">
          <TabsList>
            <TabsTrigger value="analytics">Análisis</TabsTrigger>
            <TabsTrigger value="pages">Landing Pages</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-600">Visitas Totales</h3>
                <p className="text-3xl font-bold">{analytics.totalVisits}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-600">Leads Generados</h3>
                <p className="text-3xl font-bold">{analytics.totalLeads}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-600">Tasa de Conversión</h3>
                <p className="text-3xl font-bold">{analytics.conversionRate}%</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-6">Rendimiento por Landing Page</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.pageStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="interested" fill="#4CAF50" name="Interesados" />
                    <Bar dataKey="notInterested" fill="#f44336" name="No Interesados" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="pages">
            <div className="mb-6">
              <Input
                placeholder="Buscar landing pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid gap-6">
              {filteredPages.map((page, index) => (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                    <p className="text-gray-600">{page.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/preview/${page.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/generator/${page.id}`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deletePage(page.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              {filteredPages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No se encontraron landing pages</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardPage;
