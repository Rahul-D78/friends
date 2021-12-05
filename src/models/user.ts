import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    name: string

    @Column({nullable: false})
    email: string


    constructor(name: string, email: string) {
        this.email = email
        this.name = name
    }
}