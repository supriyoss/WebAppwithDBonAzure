variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "techish-webapp-rg"
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
  description = "Admin password (must be 8-128 characters with uppercase, lowercase, numbers, and special characters)"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.admin_password) >= 8 && length(var.admin_password) <= 128
    error_message = "Password must be between 8 and 128 characters."
  }
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "webappdb"
}