import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { User } from '../../entities/User';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) { }

  async execute(data: ICreateUserRequestDTO) {
    const userExists = await this.usersRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Equipe Magalu',
        email: 'equipe@magalu.com',
      },
      subject: 'Seja bem vindo a nossa loja',
      body: '<p>Você é legal<p>'
    });
  }
}