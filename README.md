# Resilientes Stock Management System

**WIP for Resilientes - Tienda de Ropa** 

[Instagram Account of Resilientes](https://www.instagram.com/resilientesok/).

[Demo App](https://app-resilientes-stock.onrender.com/) - A demo version of the app deployed for testing purposes.


## Description
An inventory management system specifically designed for Resilientes clothing store in Argentina. This application enables efficient stock management and maintains detailed inventory control.

## Features
- Real-time inventory control
- Product and category management
- Low stock alert system
- Inventory reports
- Sales tracking

## Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Modern web browser

## Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/app-resilientes-stock.git
cd app-resilientes-stock
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env file with necessary configuration
```

## Usage
To start the application in development mode:
```bash
npm run dev
# or
yarn dev
```

To build the application for production:
```bash
npm run build
# or
yarn build
```

## Technologies Used
- SvelteKit
- TypeScript
- Tailwind CSS
- PostgreSQL (database)

## Project Structure
```
app-resilientes-stock/
├── src/
│   ├── routes/         # Pages and routes
│   ├── lib/           # Components and utilities
│   └── app.css        # Global styles
├── static/           # Static files
└── tests/           # Tests
```

## Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
