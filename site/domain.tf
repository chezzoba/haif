# Create an ACM certificate
resource "aws_acm_certificate" "website_certificate" {
  domain_name               = local.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${local.domain_name}"]

  lifecycle {
    create_before_destroy = true
  }
}

# Get the zone ID for your domain
data "cloudflare_zone" "website_zone" {
  name = local.domain_name
}

# Create DNS validation records in Cloudflare
resource "cloudflare_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.website_certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = data.cloudflare_zone.website_zone.id
  name    = trimsuffix(each.value.name, ".")
  content = trimsuffix(each.value.record, ".")
  type    = each.value.type
  ttl     = 60
  proxied = false
}

# Wait for certificate validation to complete
resource "aws_acm_certificate_validation" "website_certificate" {
  certificate_arn         = aws_acm_certificate.website_certificate.arn
  validation_record_fqdns = [for record in cloudflare_record.cert_validation : record.hostname]
}

# Create an A record for the root domain
resource "cloudflare_record" "website_record" {
  zone_id = data.cloudflare_zone.website_zone.id
  name    = "@"
  type    = "CNAME"
  proxied = false
  content = aws_cloudfront_distribution.website_distribution.domain_name
}

# Create a CNAME record for www subdomain
resource "cloudflare_record" "www_redirect" {
  zone_id = data.cloudflare_zone.website_zone.id
  name    = "www"
  type    = "CNAME"
  proxied = false
  content = local.domain_name
}
