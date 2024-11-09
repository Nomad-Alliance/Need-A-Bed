# Use this script to run all tests and start both the frontend and backend servers

# should exit script if any command fails
$ErrorActionPreference = "Stop"

# Switch into the backend directory, test backend and start django server
cd "..\django\DjangoNAB"

echo "Testing backend..."
python manage.py test

# Switch into the frontend directory, test frontend, and run expo server
cd "..\..\react"

echo "Testing frontend..."
npm run test


