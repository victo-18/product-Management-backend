import { Table, DataType, Model, Column, Default } from "sequelize-typescript";

//Creando la tabla con los decoradores de sequelize
@Table({
  tableName: "Product",
})

//Utilizando las clase de sequelize
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;
  @Column({
    type: DataType.DOUBLE,
  })
  declare price: number;
  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare availability: boolean;
}

export default Product;
