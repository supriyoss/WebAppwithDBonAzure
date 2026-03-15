variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "webapp-rg"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "centralindia"
}

variable "postgres_server_name" {
  description = "PostgreSQL server name"
  type        = string
  default     = "webapp-postgres"
}

variable "admin_username" {
  description = "Admin username"
  type        = string
  default     = "postgresadmin"
}

variable "admin_password" {
  description = "Admin password"
  type        = string
  sensitive   = true
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "webappdb"
}