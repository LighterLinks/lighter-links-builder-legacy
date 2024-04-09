export class Neo4jQueryBuilder {
  protected query: string;

  constructor() {
    this.query = '';
  }

  getQuery() {
    return this.query.trim();
  }

  matchNode({
    label,
    properties,
    variable,
  }: {
    label: string;
    properties?: object;
    variable: string;
  }) {
    this.query += `MATCH (${variable}:${label}`;
    if (properties && Object.keys(properties).length > 0) {
      const propertiesForQuery = JSON.stringify(properties).replace(/"/g, '');
      this.query += ` ${propertiesForQuery}`;
    }
    this.query += `) `;
  }

  matchNodeByRelation({
    fromVariable,
    fromLabel,
    fromProperties,
    toVariable,
    toLabel,
    label,
  }: {
    fromVariable: string;
    fromLabel: string;
    fromProperties?: object;
    toVariable: string;
    toLabel: string;
    label: string;
  }) {
    this.query += `MATCH (${fromVariable}:${fromLabel}`;
    if (fromProperties && Object.keys(fromProperties).length > 0) {
      const propertiesForQuery = JSON.stringify(fromProperties).replace(
        /"/g,
        '',
      );
      this.query += ` ${propertiesForQuery}`;
    }
    this.query += `)-[:${label}]->(${toVariable}:${toLabel}) `;
  }

  createNode({
    label,
    properties,
    variable,
  }: {
    label: string;
    properties?: object;
    variable: string;
  }) {
    this.query += `CREATE (${variable}:${label}`;
    if (properties && Object.keys(properties).length > 0) {
      const propertiesForQuery = JSON.stringify(properties).replace(/"/g, '');
      this.query += ` ${propertiesForQuery}`;
    }
    this.query += `) `;
  }

  createRelation({
    fromVariable,
    toVariable,
    label,
  }: {
    fromVariable: string;
    toVariable: string;
    label: string;
  }) {
    this.query += `CREATE (${fromVariable})-[:${label}]->(${toVariable}) `;
    return;
  }

  deleteNode({ variable }: { variable: string }) {
    this.query += `DETACH DELETE ${variable} `;
  }

  updateNode({
    label,
    properties,
    variable,
  }: {
    label: string;
    properties: object;
    variable: string;
  }) {
    const propertiesForQuery = JSON.stringify(properties).replace(/"/g, '');
    this.query += `SET ${variable}:${label} = ${propertiesForQuery} `;
  }

  returnNode({ variable }: { variable: string }) {
    this.query += `RETURN ${variable}  `;
  }
}

export class PostgresQueryBuilder {
  protected query: string;

  constructor() {
    this.query = '';
  }

  getQuery() {
    return this.query;
  }

  select(columns: string | string[]) {
    const columnsStr = Array.isArray(columns) ? columns.join(', ') : columns;
    this.query += `SELECT ${columnsStr} `;
  }

  from(table: string) {
    this.query += `FROM ${table} `;
  }

  where(condition: string) {
    this.query += `WHERE ${condition} `;
  }

  join(joinType: string, table: string, condition: string) {
    this.query += `${joinType} JOIN ${table} ON ${condition} `;
  }

  orderBy(columns: string | string[]) {
    const columnsStr = Array.isArray(columns) ? columns.join(', ') : columns;
    this.query += `ORDER BY ${columnsStr} `;
  }

  limit(count: number) {
    this.query += `LIMIT ${count} `;
  }

  insert(table: string, values: object) {
    const columns = Object.keys(values).join(', ');
    const valuesStr = Object.values(values)
      .map((value) => `'${value}'`)
      .join(', ');
    this.query += `INSERT INTO ${table} (${columns}) VALUES (${valuesStr}) `;
  }

  update(table: string, values: object, condition?: string) {
    const setClause = Object.keys(values)
      .map((key) => `${key} = '${values[key]}'`)
      .join(', ');
    this.query += `UPDATE ${table} SET ${setClause} `;
    if (condition) {
      this.query += `WHERE ${condition} `;
    }
  }

  delete(table: string, condition?: string) {
    this.query += `DELETE FROM ${table} `;
    if (condition) {
      this.query += `WHERE ${condition} `;
    }
  }
}

export class MySQLQueryBuilder {
  protected query: string;

  constructor() {
    this.query = '';
  }

  getQuery() {
    return this.query;
  }

  select(columns: string | string[]) {
    const columnsStr = Array.isArray(columns) ? columns.join(', ') : columns;
    this.query += `SELECT ${columnsStr} `;
  }

  from(table: string) {
    this.query += `FROM ${table} `;
  }

  where(condition: string) {
    this.query += `WHERE ${condition} `;
  }

  join(joinType: string, table: string, condition: string) {
    this.query += `${joinType} JOIN ${table} ON ${condition} `;
  }

  orderBy(columns: string | string[]) {
    const columnsStr = Array.isArray(columns) ? columns.join(', ') : columns;
    this.query += `ORDER BY ${columnsStr} `;
  }

  limit(count: number) {
    this.query += `LIMIT ${count} `;
  }

  insert(table: string, values: object) {
    const columns = Object.keys(values).join(', ');
    const valuesStr = Object.values(values)
      .map((value) => `'${value}'`)
      .join(', ');
    this.query += `INSERT INTO ${table} (${columns}) VALUES (${valuesStr}) `;
  }

  update(table: string, values: object, condition?: string) {
    const setClause = Object.keys(values)
      .map((key) => `${key} = '${values[key]}'`)
      .join(', ');
    this.query += `UPDATE ${table} SET ${setClause} `;
    if (condition) {
      this.query += `WHERE ${condition} `;
    }
  }

  delete(table: string, condition?: string) {
    this.query += `DELETE FROM ${table} `;
    if (condition) {
      this.query += `WHERE ${condition} `;
    }
  }
}
