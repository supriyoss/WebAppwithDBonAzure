variable "resource_group_name" {
  description = "Name of the resource group for Terraform backend"
  type        = string
  default     = "techish-webapp-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "centralindia"
}

variable "storage_account_name" {
  description = "Name of the storage account for Terraform state"
  type        = string
  default     = "techishtfstorage"
}

variable "container_name" {
  description = "Name of the storage container for Terraform state"
  type        = string
  default     = "tfstate"
}
