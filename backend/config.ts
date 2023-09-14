export const config = () => ({
  host: process.env.DB_HOST,
  port: process.env.API_PORT || 3000
})