import React from 'react';
import PagoResumeComponent from './PagoResume';
import PagoResumeLongComponent from './Long/PagoResumeLong';
import ClienteResumeComponent from './ClientResume';
import EmplResumeComponent from './EmplResume';
import CitaResumeComponent from './CitaResume';
import { useAuth } from '../../../context/useAuth';
import { ID_ADMINISTRADOR, ID_EMPLEADO, ID_TIPO_EMPRESA_FREELANCE } from '../../../utils/api/config';

export function Resume() {
  const { user } = useAuth();
  return (
    <div>
      <div className='flex space-x-4 justify-center'>
        {(user.idTipoEmpresa == ID_TIPO_EMPRESA_FREELANCE || user.roles.includes(ID_ADMINISTRADOR)) && (
          <PagoResumeComponent />
        )}
        <ClienteResumeComponent />
        {((!user.roles.includes(ID_EMPLEADO) && user.idTipoEmpresa !== ID_TIPO_EMPRESA_FREELANCE) || user.roles.includes(ID_ADMINISTRADOR)) && (
          <EmplResumeComponent />
        )}
        <CitaResumeComponent />
      </div>
      {(user.idTipoEmpresa != ID_TIPO_EMPRESA_FREELANCE || user.roles.includes(ID_ADMINISTRADOR)) && (
        <div className='flex space-x-4 justify-center mt-6'>
          <PagoResumeLongComponent />
        </div>
      )}

    </div>
  );
}
