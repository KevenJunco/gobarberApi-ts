import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '1213',
    });

    expect(appointment).toHaveProperty('id');
  });
  it('shoud not be able to create two appointments one the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '1213',
    });

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '1213',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
