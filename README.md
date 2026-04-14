# 🛒 Grocery Store DevOps Project

## 📌 Project Overview

This project is a full-stack grocery web application built using modern DevOps practices.
It includes frontend, backend, and database services, containerized using Docker and deployed on AWS.

---

## 🧱 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js (Express)
* **Database:** MySQL
* **Containerization:** Docker
* **Cloud:** AWS EC2 / ECS
* **CI/CD:** GitHub Actions
* **Orchestration:** Kubernetes (Local)

---

## 📂 Project Structure

```bash
grocery-store/
│
├── frontend/                # UI (HTML, CSS, JS)
├── backend/                 # API (Node.js)
│
├── docker-compose.yml       # Run full app locally
├── deploy.sh                # Deployment script
│
├── frontend.yaml            # K8s frontend deployment
├── backend.yaml             # K8s backend deployment
├── mysql.yaml               # K8s database deployment
│
├── frontend-service.yaml    # Frontend service
├── backend-service.yaml     # Backend service
├── mysql-service.yaml       # Database service
│
└── .github/workflows/
    └── main.yml             # CI/CD pipeline
```

---

## ⚙️ How It Works

```text
User → Frontend → Backend → Database
```

* Frontend sends requests to backend
* Backend processes and interacts with MySQL
* Data is returned to frontend

---

## 🐳 Docker Setup

### Build Images

```bash
docker build -t vishnuk08/backend ./backend
docker build -t vishnuk08/frontend ./frontend
```

### Run Containers

```bash
docker run -d -p 5000:5000 vishnuk08/backend
docker run -d -p 80:80 vishnuk08/frontend
```

### Run Full Stack

```bash
docker-compose up -d
```

---

## ☁️ AWS Deployment (EC2)

1. Launch EC2 instance
2. Install Docker
3. Pull images from Docker Hub
4. Run containers

```bash
docker run -d -p 80:80 vishnuk08/frontend
docker run -d -p 5000:5000 vishnuk08/backend
```

---

## ⚙️ CI/CD Pipeline

GitHub Actions automates:

* Build Docker images
* Push to Docker Hub
* Deploy to AWS EC2

Trigger:

```bash
git push origin main
```

---

## ☸️ Kubernetes (Local)

### Apply deployments

```bash
kubectl apply -f mysql.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
```

### Check resources

```bash
kubectl get pods
kubectl get svc
```

---

## 🌐 ECS Deployment (Optional)

* Created ECS cluster (Fargate)
* Created task definitions (frontend & backend)
* Created services with load balancer
* Access app via Load Balancer DNS

---

## 🌍 Architecture Diagram

```text
User
 ↓
Load Balancer (AWS)
 ↓
Frontend Container
 ↓
Backend Container
 ↓
Database (MySQL)
```

---

## ✅ Features

* Full-stack application
* Dockerized services
* AWS deployment
* CI/CD automation
* Kubernetes configuration

---

## 🎯 Conclusion

This project demonstrates end-to-end DevOps workflow:

* Application development
* Containerization
* Cloud deployment
* CI/CD automation
* Service orchestration

---

## 👨‍💻 Author

**Vishnu K**
GitHub: https://github.com/K-VISHNU23
