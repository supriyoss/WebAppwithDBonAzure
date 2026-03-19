terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}

  use_msi = true
}

data "azurerm_resource_group" "rg" {
  name = var.resource_group_name
}

resource "azurerm_postgresql_flexible_server" "postgres" {
  name                = var.postgres_server_name
  location            = data.azurerm_resource_group.rg.location
  resource_group_name = data.azurerm_resource_group.rg.name
  sku_name            = "B_Standard_B1ms"
  storage_mb          = 32768
  backup_retention_days = 7
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = false
  administrator_login          = var.admin_username
  administrator_password = var.admin_password
  version                      = "15"
  zone                 = "1"
  
  # Ensure the server is fully provisioned before proceeding
  lifecycle {
    create_before_destroy = false
  }
}

# Allow connections from Azure services
resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name            = "AllowAzureServices"
  server_id       = azurerm_postgresql_flexible_server.postgres.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# Create the database
resource "azurerm_postgresql_flexible_server_database" "db" {
  name            = var.database_name
  server_id       = azurerm_postgresql_flexible_server.postgres.id
  charset         = "UTF8"
  collation       = "en_US.utf8"
  
  depends_on = [
    azurerm_postgresql_flexible_server_firewall_rule.allow_azure
  ]
}