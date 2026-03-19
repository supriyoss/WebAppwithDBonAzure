output "database_server_fqdn" {
  description = "The fully qualified domain name of the PostgreSQL server"
  value       = azurerm_postgresql_flexible_server.postgres.fqdn
}

output "database_name" {
  description = "The name of the database"
  value       = azurerm_postgresql_flexible_server_database.db.name
  depends_on  = [azurerm_postgresql_flexible_server_database.db]
}

output "database_connection_string" {
  description = "PostgreSQL connection string (sensitive)"
  value       = "postgresql://${var.admin_username}:${var.admin_password}@${azurerm_postgresql_flexible_server.postgres.fqdn}:5432/${var.database_name}?sslmode=require"
  sensitive   = true
}