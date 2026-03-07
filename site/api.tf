# DynamoDB table for collaboration form submissions
resource "aws_dynamodb_table" "collaboration_submissions" {
  name           = "haiis-collaboration-submissions"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "submissionId"
  range_key      = "timestamp"

  attribute {
    name = "submissionId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    Name        = "HAIIS Collaboration Submissions"
    Environment = "production"
  }
}

# IAM role for API Gateway
resource "aws_iam_role" "api_gateway_dynamodb_role" {
  name = "haiis-api-gateway-dynamodb-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for API Gateway to write to DynamoDB
resource "aws_iam_role_policy" "api_gateway_dynamodb_policy" {
  name = "haiis-api-gateway-dynamodb-policy"
  role = aws_iam_role.api_gateway_dynamodb_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem"
        ]
        Resource = aws_dynamodb_table.collaboration_submissions.arn
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

# API Gateway REST API
resource "aws_api_gateway_rest_api" "collaboration_api" {
  name        = "haiis-collaboration-api"
  description = "API for HAIIS collaboration form submissions"

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Custom domain for API Gateway (using root domain)
resource "aws_api_gateway_domain_name" "api_domain" {
  domain_name              = local.domain_name
  regional_certificate_arn = aws_acm_certificate.website_certificate.arn

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Base path mapping
resource "aws_api_gateway_base_path_mapping" "api_mapping" {
  api_id      = aws_api_gateway_rest_api.collaboration_api.id
  stage_name  = aws_api_gateway_stage.prod.stage_name
  domain_name = aws_api_gateway_domain_name.api_domain.domain_name
}

# API Gateway resource for /api
resource "aws_api_gateway_resource" "api" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  parent_id   = aws_api_gateway_rest_api.collaboration_api.root_resource_id
  path_part   = "api"
}

# API Gateway resource for /api/submit
resource "aws_api_gateway_resource" "submit" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  parent_id   = aws_api_gateway_resource.api.id
  path_part   = "submit"
}

# API Gateway POST method
resource "aws_api_gateway_method" "submit_post" {
  rest_api_id   = aws_api_gateway_rest_api.collaboration_api.id
  resource_id   = aws_api_gateway_resource.submit.id
  http_method   = "POST"
  authorization = "NONE"
}

# API Gateway integration with DynamoDB
resource "aws_api_gateway_integration" "dynamodb_integration" {
  rest_api_id             = aws_api_gateway_rest_api.collaboration_api.id
  resource_id             = aws_api_gateway_resource.submit.id
  http_method             = aws_api_gateway_method.submit_post.http_method
  type                    = "AWS"
  integration_http_method = "POST"
  credentials             = aws_iam_role.api_gateway_dynamodb_role.arn
  uri                     = "arn:aws:apigateway:${data.aws_region.current.name}:dynamodb:action/PutItem"

  request_templates = {
    "application/json" = <<EOF
{
  "TableName": "${aws_dynamodb_table.collaboration_submissions.name}",
  "Item": {
    "submissionId": {
      "S": "$context.requestId"
    },
    "timestamp": {
      "N": "$context.requestTimeEpoch"
    },
    "organization": {
      "S": "$input.path('$.organization')"
    },
    "email": {
      "S": "$input.path('$.email')"
    },
    "role": {
      "S": "$input.path('$.role')"
    },
    "useCase": {
      "S": "$input.path('$.useCase')"
    },
    "cloudPlatforms": {
      "S": "$input.path('$.cloudPlatforms')"
    },
    "message": {
      "S": "$input.path('$.message')"
    },
    "ttl": {
      "N": "$context.requestTimeEpoch"
    }
  }
}
EOF
  }
}

# API Gateway method response
resource "aws_api_gateway_method_response" "submit_response_200" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.submit_post.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

# API Gateway integration response
resource "aws_api_gateway_integration_response" "submit_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.submit_post.http_method
  status_code = aws_api_gateway_method_response.submit_response_200.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = {
    "application/json" = <<EOF
{
  "success": true,
  "message": "Submission received successfully"
}
EOF
  }

  depends_on = [aws_api_gateway_integration.dynamodb_integration]
}

# CORS OPTIONS method
resource "aws_api_gateway_method" "submit_options" {
  rest_api_id   = aws_api_gateway_rest_api.collaboration_api.id
  resource_id   = aws_api_gateway_resource.submit.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "submit_options_integration" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.submit_options.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "submit_options_response" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.submit_options.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

  response_models = {
    "application/json" = "Empty"
  }
}

resource "aws_api_gateway_integration_response" "submit_options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.submit_options.http_method
  status_code = aws_api_gateway_method_response.submit_options_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.submit_options_integration]
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "collaboration_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.collaboration_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api.id,
      aws_api_gateway_resource.submit.id,
      aws_api_gateway_method.submit_post.id,
      aws_api_gateway_integration.dynamodb_integration.id,
      aws_api_gateway_method.submit_options.id,
      aws_api_gateway_integration.submit_options_integration.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }

  depends_on = [
    aws_api_gateway_integration.dynamodb_integration,
    aws_api_gateway_integration_response.submit_integration_response,
    aws_api_gateway_integration.submit_options_integration,
    aws_api_gateway_integration_response.submit_options_integration_response
  ]
}

# API Gateway stage
resource "aws_api_gateway_stage" "prod" {
  deployment_id = aws_api_gateway_deployment.collaboration_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.collaboration_api.id
  stage_name    = "prod"
}

# Data source for current region
data "aws_region" "current" {}

# Output the API endpoint
output "collaboration_api_endpoint" {
  value       = "https://${local.domain_name}/api/submit"
  description = "API Gateway endpoint for collaboration form submissions"
}

output "api_gateway_regional_domain" {
  value       = aws_api_gateway_domain_name.api_domain.regional_domain_name
  description = "API Gateway regional domain name"
}

output "dynamodb_table_name" {
  value       = aws_dynamodb_table.collaboration_submissions.name
  description = "DynamoDB table name for collaboration submissions"
}
