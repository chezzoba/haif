# Create an S3 bucket
resource "aws_s3_bucket" "static_website_bucket" {
  bucket = local.domain_name

}

# Copy static HTML files to the S3 bucket
resource "aws_s3_object" "object" {
  for_each     = fileset("./haiis/out/", "**/*")
  bucket       = aws_s3_bucket.static_website_bucket.id
  key          = each.value
  source       = "./haiis/out/${each.value}"
  etag         = filemd5("./haiis/out/${each.value}")
  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")
}

# Define CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${aws_s3_bucket.static_website_bucket.id}"
}

# Add bucket policy to allow CloudFront access to S3
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.static_website_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontAccess"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity ${aws_cloudfront_origin_access_identity.oai.id}"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.static_website_bucket.arn}/*"
      }
    ]
  })
}