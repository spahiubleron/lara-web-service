# Lara Web Service

A NestJS-based translation service that integrates with the Translated Lara API to provide efficient text translation capabilities.

## Features

- **Order Management**: Create and manage translation orders with multiple texts
- **Text Management**: Add and update texts within orders
- **Translation Service**: Automatic translation using Translated Lara API
- **Language Support**: Dynamic language validation against supported language pairs
- **Swagger Documentation**: Interactive API documentation
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Database**: MySQL with Sequelize ORM for robust data management

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- Translated Lara API credentials

## Database Setup

This application uses MySQL with Sequelize ORM, providing:
- Type-safe database operations
- Automatic table creation and migrations
- Relationship management between Orders and Texts
- Data validation at the database level

### Database Configuration

In your `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=lara_db
LARA_ACCESS_KEY_ID=your_lara_key_id
LARA_ACCESS_KEY_SECRET=your_lara_key_secret
```

### Database Models

The application uses two main models:

1. **Order**:
```typescript
{
  id: UUID (Primary Key)
  jobName: string
  sourceLangCode: string(10)
  targetLangCode: string(10)
  submissionTimestamp: Date
  texts: Text[] (One-to-Many relationship)
}
```

2. **Text**:
```typescript
{
  id: UUID (Primary Key)
  orderId: UUID (Foreign Key)
  text: string(500)
  translatedText: string(nullable)
}
```

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## API Documentation

Access Swagger documentation at: `http://localhost:3000/`

### Available Endpoints

#### Orders

- `POST /orders` - Create a new translation order
  - Validates source and target languages
  - Returns order details with ID

- `GET /orders` - Get all orders
  - Returns list of orders
  - Includes order metadata (ID, job name, languages, submission status)

- `GET /orders/:id` - Get order details
  - Returns complete order with its texts and translations
  - Includes all text content and translations

- `PATCH /orders/:id/submit` - Submit order for translation
  - Translates all texts in the order
  - Updates texts with translations
  - Marks order as submitted

#### Texts

- `POST /texts` - Add text to an order
  - Validates text length (1-500 characters)
  - Links text to specified order

- `PATCH /texts/:id` - Update text content
  - Only allowed for non-submitted orders
  - Validates text length

### Error Handling

The API provides clear error messages for:
- Invalid language codes
- Text length violations
- Already submitted orders
- Missing resources
- Invalid requests

## Data Models

### Order
- `id`: UUID
- `jobName`: string
- `sourceLangCode`: string (e.g., "en-US")
- `targetLangCode`: string (e.g., "it-IT")
- `submissionTimestamp`: Date (nullable)

### Text
- `id`: UUID
- `orderId`: UUID (foreign key)
- `text`: string (1-500 chars)
- `translatedText`: string (nullable)

## Security

- Environment-based configuration
- Input validation
- Error handling