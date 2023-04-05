/**
 * Neste exemplo, estamos definindo uma entidade User com quatro campos: 
 * id, name, email e password. O campo id é gerado automaticamente pelo 
 * banco de dados com a anotação PrimaryGeneratedColumn. 
 * Os campos name, email e password são definidos com a anotação Column.
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
