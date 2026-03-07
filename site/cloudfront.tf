# Import existing CloudFront function or create new one
resource "aws_cloudfront_function" "url_rewrite" {
  name    = "url-rewrite-haiis"
  runtime = "cloudfront-js-2.0"
  comment = "Add .html to non-API routes"
  publish = true
  code    = file("${path.module}/url_rewrite/function.js")

  lifecycle {
    create_before_destroy = true
  }
}

# Create a CloudFront distribution
resource "aws_cloudfront_distribution" "website_distribution" {
  # S3 origin for static website
  origin {
    domain_name = aws_s3_bucket.static_website_bucket.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.static_website_bucket.id}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }

  # API Gateway origin
  origin {
    domain_name = replace(replace(aws_api_gateway_domain_name.api_domain.regional_domain_name, "https:", ""), "/", "")
    origin_id   = "API-Gateway"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  enabled = true

  default_root_object = "index.html"

  # API cache behavior for /api/*
  ordered_cache_behavior {
    path_pattern     = "/api/*"
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "API-Gateway"

    forwarded_values {
      query_string = true
      headers      = ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method", "Host", "Authorization"]
      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.static_website_bucket.id}"

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }

    # Attach the CloudFront function to the distribution
    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.url_rewrite.arn
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/404.html"
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate_validation.website_certificate.certificate_arn
    ssl_support_method  = "sni-only"
  }

  aliases = [local.domain_name, "www.${local.domain_name}"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
