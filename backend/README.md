# FreshCart Backend API

Modern Node.js + Express + MySQL backend for the FreshCart e-commerce platform.

## 📦 Installation & Setup

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
```

### 2️⃣ MySQL Database Setup

**Option A: Local MySQL**
```bash
# Open MySQL
mysql -u root -p

# Run schema
source schema.sql;
```

**Option B: AWS RDS**
- Create RDS instance
- Update `db.js`:
```javascript
const db = mysql.createConnection({
  host: "your-rds-endpoint.rds.amazonaws.com",
  user: "admin",
  password: "your_password",
  database: "grocery"
});
```

### 3️⃣ Configure db.js
Update credentials in `backend/db.js`:
```javascript
const db = mysql.createConnection({
  host: "localhost",        // or RDS endpoint
  user: "root",            // MySQL user
  password: "your_password", // MySQL password
  database: "grocery"
});
```

### 4️⃣ Run Server
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs on: **http://localhost:5000**

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)

**Signup**
```
POST /api/auth/signup
Body: { username, phone, email, password }
```

**Login**
```
POST /api/auth/login
Body: { email, password, role }
```

### Product Routes (`/api/products`)

**Get All Products**
```
GET /api/products
```

**Get Single Product**
```
GET /api/products/:id
```

**Add Product (Admin)**
```
POST /api/products
Body: { name, price, img }
```

**Update Product (Admin)**
```
PUT /api/products/:id
Body: { name, price, img }
```

**Delete Product (Admin)**
```
DELETE /api/products/:id
```

## 🔐 Admin Credentials
- Email: `kvishnu1947@gmail.com`
- Password: `1234`

## 📁 Folder Structure
```
backend/
├── server.js          # Express server
├── db.js              # MySQL connection
├── package.json       # Dependencies
├── schema.sql         # Database schema
└── routes/
    ├── auth.js        # Auth endpoints
    └── products.js    # Product endpoints
```

## 🛡️ Security Features
- Password hashing with bcrypt
- Email validation
- Phone validation (10 digits)
- Strong password requirements
- Admin authentication

## ☁️ Deployment (AWS)
1. Create RDS MySQL instance
2. Update database credentials
3. Deploy to EC2 or Lambda
4. Update frontend API URL

## 🚀 Quick Test
```bash
# Test API
curl http://localhost:5000

# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"John","phone":"9876543210","email":"john@example.com","password":"Password@123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password@123","role":"user"}'
```
