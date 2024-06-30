import React from 'react';
import { Card } from 'antd';
import { ClientResume, CitaResume, PaymentResume, EmplResume, PaymentResumeLong } from '../../component/ResumeWidget/CardWidget';

export function Resume() {
    return (
        <div>
            <div className='flex space-x-4 justify-center'>
                <Card
                    className='bg-fondo-300 border border-borde-100 text-white'
                    cover={
                        <div className='text-center p-1 border-b-borde-100 border-b-2'>
                            <h2>Resumen Facturas</h2>
                        </div>
                    }
                >
                    <div style={{ marginBottom: '1em' }}>
                        <PaymentResume
                            nombre="Antonio Notorio"
                            service="Zurcir"
                            cost="20.50"
                            state={false}
                        />
                    </div>
                    {/* Repite PaymentResume para las otras facturas */}
                </Card>

                <Card
                    className='bg-fondo-300 border border-borde-100 text-white'
                    cover={
                        <div className='text-center p-1 border-b-borde-100 border-b-2'>
                            <h2>Resumen Cliente</h2>
                        </div>
                    }
                >
                    <div style={{ marginBottom: '1em' }}>
                        <ClientResume
                            direccion="C/Rumano Furioso"
                            nombre="Antón Martín"
                            email="rompeolas@.com"
                            telefono="+688902312"
                            estado={true}
                        />
                    </div>
                    {/* Repite ClientResume para los otros clientes */}
                </Card>

                <Card
                    className='bg-fondo-300 border border-borde-100 text-white'
                    cover={
                        <div className='text-center p-1 border-b-borde-100 border-b-2'>
                            <h2>Resumen Empleado</h2>
                        </div>
                    }
                >
                    <div style={{ marginBottom: '1em' }}>
                        <EmplResume
                            rol="Jefe"
                            nombre="Antón Lofer Martín"
                            email="rompeolas@gmail.com"
                            telefono="+688902312"
                            estado={true}
                        />
                    </div>
                </Card>

                <Card
                    className='bg-fondo-300 border border-borde-100 text-white'
                    cover={
                        <div className='text-center p-1 border-b-borde-100 border-b-2'>
                            <h2>Resumen Citas</h2>
                        </div>
                    }
                >
                    <div style={{ marginBottom: '1em' }}>
                        <CitaResume
                            horaI="10:20PM"
                            horaF="10:41AM"
                            diaSemanaMes="01/05/2003"
                            nombre="Fernando Esteso"
                            text="Mover adoquines"
                        />
                    </div>
                </Card>
            </div>
            <div className="flex space-x-4 justify-center">
            <Card
                className='bg-fondo-300 border mt-6 border-borde-100 text-white'
                cover={
                    <div className='text-center p-1 border-b-borde-100 border-b-2'>
                        <h2>Resumen Pagos Extenso</h2>
                    </div>
                }
            >
                    <PaymentResumeLong
                        nombre="Antonio Notorio"
                        service="Zurcir"
                        cost="20.50"
                        hora="10:20PM-19:29PM"
                        fecha="20/03/2003"
                        email="aaa@aaa.com"
                        telefono="+688923232"
                        state={false}
                    />
            </Card>
            </div>
        </div>
    );
}
