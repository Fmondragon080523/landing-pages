
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="container mx-auto px-4 py-6">
      <nav className="flex items-center justify-between">
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer"
        >
          <img 
            src="https://storage.googleapis.com/hostinger-horizons-assets-prod/e657bf97-d49e-463e-b214-8035247883d8/c2dda75ffcdf43a57777993a93cfcabb.png"
            alt="Electrofix Technology Logo"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold gradient-text">
            Electrofix Technology
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              {location.pathname !== '/generator' && (
                <Button 
                  variant="outline"
                  onClick={() => navigate('/generator')}
                >
                  Crear Landing Page
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={logout}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </Button>
              <Button 
                onClick={() => navigate('/register')}
              >
                Registrarse
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
