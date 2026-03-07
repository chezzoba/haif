terraform {
  backend "s3" {
    bucket         = "terraform-state-statebucket-2psec0mtnjse"
    key            = "haiis.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock-table"
    encrypt        = true
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}


# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}

variable "cloudflare_key" {
  type = string
}

# Configure cloudflare provider
provider "cloudflare" {
  api_token = var.cloudflare_key
}

locals {

  mime_types = {
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    json = "application/json"
    png  = "image/png"
    jpg  = "image/jpeg"
    jpeg = "image/jpeg"
    svg  = "image/svg+xml"
  }

  domain_name = "haiis.org"
}

# Output the website endpoint
output "website_endpoint" {
  value = aws_cloudfront_distribution.website_distribution.domain_name
}