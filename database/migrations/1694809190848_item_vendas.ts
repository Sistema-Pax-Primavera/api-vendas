import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'item_venda'.
 *
 * Esta migração verifica se a tabela 'item_venda' já existe no banco de dados.
 * Se não existir, a tabela é criada com as colunas especificadas.
 * Se já existir, nada é feito no método 'up'.
 *
 * @class
 * @extends BaseSchema
 */
export default class extends BaseSchema {
  /**
   * Nome do esquema no banco de dados.
   *
   * @protected
   * @type {string}
   */
  protected schemaName: string = 'venda'

  /**
   * Nome da tabela que esta migração cria.
   *
   * @protected
   * @type {string}
   */
  protected tableName: string = 'item_venda'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'item_venda' se ela não existir.
   * 
   * @public
   * @returns {Promise<void>}
   */
  public async up(): Promise<void> {
    const hasTable = await this.schema
      .withSchema(this.schemaName)
      .hasTable(this.tableName)

    if (!hasTable) {
      this.schema.withSchema(this.schemaName)
        .createTable(this.tableName, (table) => {
          table.integer('titular_id').notNullable().unsigned().references('id').inTable('dados.titular_venda').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('item_id').notNullable().unsigned().references('id').inTable('public.item').onDelete('CASCADE').onUpdate('CASCADE')
          table.integer('quantidade').notNullable().defaultTo(1)
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()

          table.primary(['titular_id', 'item_id'])
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'item_venda' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}