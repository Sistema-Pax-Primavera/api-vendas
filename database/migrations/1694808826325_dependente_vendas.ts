import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'dependente_venda'.
 *
 * Esta migração verifica se a tabela 'dependente_venda' já existe no banco de dados.
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
  protected tableName: string = 'dependente_venda'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'dependente_venda' se ela não existir.
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
          table.increments('id').primary()
          table.integer('titular_id').notNullable().unsigned().references('id').inTable('venda.titular_venda').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('parentesco_id').nullable().unsigned().references('id').inTable('public.parentesco').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('raca_id').nullable().unsigned().references('id').inTable('public.raca').onDelete('SET NULL').onUpdate('SET NULL')
          table.integer('especie_id').nullable().unsigned().references('id').inTable('public.especie').onDelete('SET NULL').onUpdate('SET NULL')
          table.string('nome', 100).notNullable()
          table.string('cpf', 11).nullable()
          table.decimal('altura', 10, 2).nullable()
          table.decimal('peso', 10, 2).nullable()
          table.string('cor', 50).nullable()
          table.string('porte', 3).nullable()
          table.date('data_nascimento').notNullable()
          table.integer('tipo').notNullable().defaultTo(1).comment('Tipo dependente: 1-Humano 2-Pet')
          table.boolean('cremacao').notNullable().defaultTo(false)
          table.integer('adicional_id').nullable().unsigned().references('id').inTable('cobranca.adicional').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.boolean('ativo').notNullable().defaultTo(true).comment('Se valor for TRUE o mesmo não aparece nas listagens, exceto nas rotas de busca geral.')
          table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
          table.string('created_by', 150).notNullable()
          table.timestamp('updated_at', { useTz: true }).nullable()
          table.string('updated_by', 150).nullable()
        })
    }
  }

  /**
   * Método 'down' da migração.
   * Exclui a tabela 'dependente_venda' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}