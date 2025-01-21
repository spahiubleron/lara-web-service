import { Column, Model, Table, ForeignKey, DataType, BelongsTo, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';
import { Order } from 'src/orders/entities/order.entity';

@Table
export class Text extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    orderId: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false,
    })
    text: string;

    @CreatedAt
    creationTimestamp: Date;

    @UpdatedAt
    modificationTimestamp: Date;

    @Column({
        type: DataType.STRING(1000),
        allowNull: true,
    })
    translatedText: string;

    @BelongsTo(() => Order)
    order: Order;
}
