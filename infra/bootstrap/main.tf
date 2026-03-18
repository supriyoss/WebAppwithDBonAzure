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

resource "azurerm_resource_group" "tf_backend_rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_storage_account" "tf_backend_storage" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.tf_backend_rg.name
  location                 = azurerm_resource_group.tf_backend_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    purpose = "terraform-backend"
  }
}

resource "azurerm_storage_container" "tf_backend_container" {
  name                  = var.container_name
  storage_account_id    = azurerm_storage_account.tf_backend_storage.id
  container_access_type = "private"
}

output "storage_account_id" {
  value = azurerm_storage_account.tf_backend_storage.id
}

output "storage_container_id" {
  value = azurerm_storage_container.tf_backend_container.id
}

output "resource_group_id" {
  value = azurerm_resource_group.tf_backend_rg.id
}
