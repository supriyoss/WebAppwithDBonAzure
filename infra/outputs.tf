output "database_connection_string" {
  value = "postgresql://${var.admin_username}@${azurerm_postgresql_server.postgres.name}.postgres.database.azure.com:5432/${var.database_name}?sslmode=require"
  sensitive = true
}