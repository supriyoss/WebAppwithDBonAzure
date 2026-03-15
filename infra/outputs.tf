output "database_connection_string" {
  value = "postgresql://${var.admin_username}:${var.admin_password}@${azurerm_postgresql_flexible_server.postgres.fqdn}:5432/${var.database_name}?sslmode=require"
  sensitive = true
}