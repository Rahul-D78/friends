import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true, nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: true})
    password?: string

    token: string

    constructor(name: string, email: string, password: string) {
        this.name = name
        this.email = email
        this.password = password
    }
}