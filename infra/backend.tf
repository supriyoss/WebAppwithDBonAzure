terraform {
  backend "azurerm" {
    resource_group_name  = "techish-webapp-rg"
    storage_account_name = "techish-tf-storage"
    container_name       = "tfstate"
    key                  = "techishprod.tfstate"
  }
}