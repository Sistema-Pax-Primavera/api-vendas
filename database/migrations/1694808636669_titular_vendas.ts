import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/**
 * Classe de migração para criar a tabela 'titular_venda'.
 *
 * Esta migração verifica se a tabela 'titular_venda' já existe no banco de dados.
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
  protected tableName: string = 'titular_venda'

  /**
   * Método 'up' da migração.
   * Cria a tabela 'titular_venda' se ela não existir.
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
          table.integer('unidade_id').notNullable().unsigned().references('id').inTable('public.unidade').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('nome', 150).notNullable()
          table.string('rg', 30).notNullable()
          table.string('cpf_cnpj', 14).nullable()
          table.date('data_nascimento').notNullable()
          table.date('data_falecimento').nullable()
          table.integer('estado_civil_id').nullable().unsigned().references('id').inTable('public.estado_civil').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('religiao_id').nullable().unsigned().references('id').inTable('public.religiao').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('naturalidade', 100).nullable()
          table.boolean('nacionalidade').nullable().comment('True-Brasileiro   False-Estrangeiro')
          table.string('profissao', 100).nullable()
          table.integer('sexo').nullable().comment('1-Masculino   2-Feminino   3-Não binário   4-Indefinido')
          table.boolean('cremacao').nullable()
          table.boolean('carencia').nullable()
          table.boolean('adesao').nullable()
          table.integer('contrato').nullable()
          table.string('telefone1').nullable()
          table.string('telefone2').nullable()
          table.string('email1').nullable()
          table.string('email2').nullable()
          table.boolean('endereco_comercial').nullable()
          //Endereço Residencial!
          table.integer('municipio_id').nullable().unsigned().references('id').inTable('public.municipio').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('bairro_id').nullable().unsigned().references('id').inTable('cobranca.bairro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('cep', 8).nullable()
          table.string('estado', 2).nullable()
          table.string('rua', 100).nullable()
          table.string('logradouro', 30).nullable()
          table.string('quadra', 10).nullable()
          table.string('lote', 10).nullable()
          table.string('numero', 10).nullable()
          table.string('complemento', 100).nullable()
          // Endereço Comercial!
          table.integer('municipio_cobranca_id').nullable().unsigned().references('id').inTable('public.municipio').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.integer('bairro_cobranca_id').nullable().unsigned().references('id').inTable('cobranca.bairro').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.string('cep_cobranca', 8).nullable()
          table.string('estado_cobranca', 2).nullable()
          table.string('rua_cobranca', 100).nullable()
          table.string('logradouro_cobranca', 30).nullable()
          table.string('quadra_cobranca', 10).nullable()
          table.string('lote_cobranca', 10).nullable()
          table.string('numero_cobranca', 10).nullable()
          table.string('complemento_cobranca', 100).nullable()
          // Cobrança!
          table.integer('plano_id').nullable().unsigned().references('id').inTable('cobranca.plano').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('data_primeira_parcela').nullable()
          table.integer('dia_pagamento').nullable()
          table.integer('vendedor_id').nullable().unsigned().references('id').inTable('public.usuario').onDelete('NO ACTION').onUpdate('NO ACTION')
          table.date('data_cancelamento').nullable()
          table.date('data_contrato_anterior').nullable()
          table.date('ultimo_mes_pago_anterior').nullable()
          table.string('empresa_anterior').nullable()
          table.integer('local_cobranca').notNullable().defaultTo(1).comment('1-ESCRITORIO 2-BOLETO 3-COBRANCA RESIDENCIAL 4-COBRANCA COMERCIAL 4-PAGAMENTO RECORRENTE')
          table.time('horario_cobranca').nullable()
          table.integer('status').notNullable().defaultTo(0)
          table.integer('template_id').nullable().unsigned().references('id').inTable('venda.template').onDelete('NO ACTION').onUpdate('NO ACTION')
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
   * Exclui a tabela 'titular_venda' se ela existir.
   *
   * @public
   * @returns {Promise<void>}
   */
  public async down(): Promise<void> {
    this.schema.withSchema(this.schemaName)
      .dropTableIfExists(this.tableName)
  }
}