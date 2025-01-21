import { Column, Model, Table, DataType, HasMany, PrimaryKey, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Text } from 'src/texts/entities/text.entity';

@Table
export class Order extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    jobName: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    sourceLangCode: string;

    @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
    targetLangCode: string;

    @CreatedAt
    creationTimestamp: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    submissionTimestamp: Date;

    @HasMany(() => Text)
    texts: Text[];
}
