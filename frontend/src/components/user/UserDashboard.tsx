import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface Service {
  _id: string;
  nombre: string;
  costo: number;
  descripcion?: string;
  duracion?: number;
}

interface Reservation {
  id: string;
  id_servicio: Service[]; 
  id_usuario: string;
  placa: string;
  estado: string;
  fecha: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Reservation[];
}

const UserDashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [expandedReservation, setExpandedReservation] = useState<string | null>(null);
  const { userInfo, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      loadUserReservations();
    }
  }, [isLoggedIn]);

  const loadUserReservations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:3000/reservation/my-reservations', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.success) {
        setReservations(data.data || []);
      } else {
        setError(data.message || 'Error al cargar las reservaciones');
      }
    } catch (err) {
      setError('Error al cargar las reservaciones. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId: string) => {
    try {
      setCancellingId(reservationId);
      setError('');
      
      const response = await fetch(`http://localhost:3000/reservation/cancel-reservation/${reservationId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo cancelar la reservación`);
      }

      const result = await response.json();
      
      if (result.success) {
        // En lugar de actualizar el estado, eliminar la reservación del array
        setReservations(prev => prev.filter(res => res.id !== reservationId));
      } else {
        setError(result.message || 'Error al cancelar la reservación');
      }
    } catch (err) {
      setError('Error al cancelar la reservación. Intenta nuevamente.');
    } finally {
      setCancellingId(null);
    }
  };

  const toggleReservationExpand = (reservationId: string) => {
    setExpandedReservation(expandedReservation === reservationId ? null : reservationId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      activo: 'bg-green-100 text-green-800 border border-green-200',
      completado: 'bg-blue-100 text-blue-800 border border-blue-200',
      cancelado: 'bg-red-100 text-red-800 border border-red-200',
      pendiente: 'bg-yellow-100 text-yellow-800 border border-yellow-200'
    };

    const statusText: { [key: string]: string } = {
      activo: 'Activo',
      completado: 'Completado',
      cancelado: 'Cancelado',
      pendiente: 'Pendiente'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status] || 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  const getServiceType = (servicios: Service[]) => {
    if (servicios && servicios.length > 0) {
      const serviceNames = servicios.map(service => service.nombre);
      return serviceNames.length > 0 ? serviceNames.join(' + ') : `Servicios (${servicios.length})`;
    }
    return 'Lavado Completo';
  };

  const getServiceDetails = (servicios: Service[]) => {
    if (servicios && servicios.length > 0) {
      return servicios.map((service, index) => (
        <div key={service._id || index} className="flex justify-between items-center text-sm text-gray-700 py-2 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center">
            <svg className="flex-shrink-0 mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <span className="font-medium">{service.nombre}</span>
              {service.descripcion && (
                <p className="text-xs text-gray-500 mt-1">{service.descripcion}</p>
              )}
              {service.duracion && (
                <p className="text-xs text-gray-500">Duración: {service.duracion} min</p>
              )}
            </div>
          </div>
          <span className="font-semibold text-green-600">{formatCurrency(service.costo)}</span>
        </div>
      ));
    }
    return (
      <div className="flex justify-between items-center text-sm text-gray-700 py-2">
        <div className="flex items-center">
          <svg className="flex-shrink-0 mr-2 h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>Lavado completo exterior e interior</span>
        </div>
        <span className="font-semibold text-green-600">{formatCurrency(25000)}</span>
      </div>
    );
  };

const parseCurrency = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  // Remover símbolos de moneda, espacios y puntos (separadores de miles)
  const cleaned = value.replace(/[^\d,-]/g, '').replace(/\./g, '');
  
  // Reemplazar coma decimal por punto
  const normalized = cleaned.replace(',', '.');
  
  return parseFloat(normalized) || 0;
};

const calculateTotal = (servicios: Service[]) => {
    if (servicios && servicios.length > 0) {
      return servicios.reduce((sum, service) => sum + parseCurrency(service.costo), 0);
    }
    return 25000;
};

  const activeReservations = reservations.filter(res => res.estado === 'activo').length;
  const enCursoReservations = reservations.filter(res => res.estado === 'en curso').length;
  const completedReservations = reservations.filter(res => res.estado === 'completado').length;
  const totalReservations = reservations.length;


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <div className="text-center text-gray-600 mt-4">Cargando tus reservaciones...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Hola {userInfo?.username}, aquí están tus reservaciones
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
                <button
                  onClick={loadUserReservations}
                  className="mt-2 text-sm text-red-700 underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Reservaciones Activas
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {activeReservations}
              </dd>
              <p className="mt-1 text-xs text-gray-500">
                Límite: 3 simultáneas
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Reservaciones En Curso
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-purple-600">
                {enCursoReservations}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Reservaciones Completadas
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {completedReservations}
              </dd>
            </div>
          </div>
            <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total de reservaciones
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-yellow-600">
                {totalReservations}
              </dd>
            </div>
          </div>
        </div>


        {/* Información del límite */}
        {activeReservations >= 3 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Límite de reservaciones alcanzado
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Has alcanzado el límite máximo de 3 reservaciones activas. 
                    Debes completar o cancelar una reservación existente para crear una nueva.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Reservaciones */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Mis Reservaciones
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Haz clic en cualquier reservación para ver más detalles
                </p>
              </div>
              <button
                onClick={loadUserReservations}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualizar
              </button>
            </div>
          </div>

          {reservations.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No hay reservaciones</h3>
              <p className="mt-2 text-sm text-gray-500">
                No tienes reservaciones programadas en este momento.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <li 
                  key={reservation.id} 
                  className={`transition-all duration-300 ${
                    expandedReservation === reservation.id 
                      ? 'bg-blue-50 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div 
                    className="px-4 py-4 sm:px-6 cursor-pointer"
                    onClick={() => toggleReservationExpand(reservation.id)}
                  >
                    {/* Información básica */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <p className="text-lg font-semibold text-gray-900 truncate">
                          {getServiceType(reservation.id_servicio)}
                        </p>
                        <div className="ml-3">
                          {getStatusBadge(reservation.estado)}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {formatDateShort(reservation.fecha)}
                        </div>
                        
                        {/* BOTÓN DE CANCELAR - Solo para reservas activas */}
                        {reservation.estado === 'activo' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              cancelReservation(reservation.id);
                            }}
                            disabled={cancellingId === reservation.id}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            {cancellingId === reservation.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cancelando...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Cancelar
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Información adicional que siempre se muestra */}
                    <div className="mt-3 flex flex-col sm:flex-row sm:justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Placa:</span> {reservation.placa}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">Total:</span> 
                          <span className="ml-1 font-semibold text-green-600">
                            {formatCurrency(calculateTotal(reservation.id_servicio))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Información expandida */}
                    {expandedReservation === reservation.id && (
                      <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Detalles de la Reservación</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Columna izquierda */}
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">Estado:</span>
                              <span className="text-sm text-gray-900">{getStatusBadge(reservation.estado)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">Fecha completa:</span>
                              <span className="text-sm text-gray-900">{formatDate(reservation.fecha)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">Placa del vehículo:</span>
                              <span className="text-sm text-gray-900 font-mono">{reservation.placa}</span>
                            </div>
                          </div>

                          {/* Columna derecha */}
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">ID de reservación:</span>
                              <span className="text-sm text-gray-900 font-mono text-xs">{reservation.id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">ID de usuario:</span>
                              <span className="text-sm text-gray-900 font-mono text-xs">{reservation.id_usuario}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm font-medium text-gray-500">Total:</span>
                              <span className="text-sm font-semibold text-green-600">
                                {formatCurrency(calculateTotal(reservation.id_servicio))}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Detalles de servicios con precios */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-3">Servicios contratados:</h5>
                          <div className="space-y-1">
                            {getServiceDetails(reservation.id_servicio)}
                          </div>
                          
                          {/* Total */}
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className="text-lg font-semibold text-gray-900">Total:</span>
                              <span className="text-lg font-bold text-green-600">
                                {formatCurrency(calculateTotal(reservation.id_servicio))}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Acciones adicionales */}
                        {reservation.estado === 'activo' && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-2">
                              ¿Necesitas cancelar tu reservación?
                            </p>
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  cancelReservation(reservation.id);
                                }}
                                disabled={cancellingId === reservation.id}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                {cancellingId === reservation.id ? 'Cancelando...' : 'Cancelar Reservación'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;