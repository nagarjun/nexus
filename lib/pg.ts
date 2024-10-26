import { Pool } from 'pg'

// Create a new pool using the connection details from docker-compose.yml
const pool = new Pool({
  user: 'nexusDbAdmin',
  host: 'localhost',
  database: 'nexus',
  password: 'JdrjKLMCiDKYNjr',
  port: 5432,
})

// Export the pool to be used in other parts of the application
export default pool

// You can also export a function to get a client from the pool
export const getPgClient = async () => {
  const client = await pool.connect()
  return client
}
