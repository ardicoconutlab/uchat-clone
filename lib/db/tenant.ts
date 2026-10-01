import { Pool, type PoolClient } from "pg";

declare global {
  var convoflowPool: Pool | undefined;
}

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDatabasePool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured");
  if (!global.convoflowPool) global.convoflowPool = new Pool({ connectionString, max: 10 });
  return global.convoflowPool;
}

/**
 * Establishes the workspace setting inside a transaction so PostgreSQL RLS
 * policies protect every query made by the callback.
 */
export async function withWorkspaceTransaction<T>(workspaceId: string, action: (client: PoolClient) => Promise<T>) {
  const client = await getDatabasePool().connect();
  try {
    await client.query("begin");
    await client.query("select set_config('app.workspace_id', $1, true)", [workspaceId]);
    const result = await action(client);
    await client.query("commit");
    return result;
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }
}
