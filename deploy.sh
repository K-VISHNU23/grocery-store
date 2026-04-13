#!/bin/bash

# Deployment script for EC2
EC2_IP="13.217.229.46"
EC2_USER="ubuntu"
KEY_PAIR="my-ec2-key.pem"

echo "🚀 Starting deployment to $EC2_IP..."

# Step 1: Install Docker & Docker Compose on EC2
echo "📦 Installing Docker and Docker Compose..."
ssh -i $KEY_PAIR $EC2_USER@$EC2_IP << 'EOF'
  # Install Docker
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  
  # Add user to docker group
  sudo usermod -aG docker $USER
  
  # Install Docker Compose
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  
  # Verify installation
  docker --version
  docker-compose --version
  
  echo "✅ Docker and Docker Compose installed!"
EOF

# Step 2: Upload docker-compose.yml
echo "📤 Uploading docker-compose.yml..."
scp -i $KEY_PAIR docker-compose.yml $EC2_USER@$EC2_IP:~/

# Step 3: Deploy
echo "🐳 Deploying containers..."
ssh -i $KEY_PAIR $EC2_USER@$EC2_IP << 'EOF'
  cd ~
  docker-compose up -d
  
  echo ""
  echo "✅ Deployment complete!"
  echo "📍 Frontend: http://13.217.229.46"
  echo "📍 Backend API: http://13.217.229.46:5000"
  echo ""
  docker-compose ps
EOF

echo "✨ Done! Your app is live at http://13.217.229.46"
