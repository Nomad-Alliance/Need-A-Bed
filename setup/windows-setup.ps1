# Commands to install dependancies for the front and backend.
# Frontend is node/npm and backend is python/pip

# Check if Python version is 3.8 or higher
if (python3 -c 'import sys; assert sys.version_info >= (3,8)' 2>$null) {
    $python_version = $(python3 -c 'import sys; write-host -nonewline ".".join([string]$x for $x in sys.version_info[:3])')
    Write-Host "Python version $python_version is valid"
} else {
    Write-Host "Python version is not 3.8 or higher. Please install a python version that is 3.8 or higher manually."
    exit 1
}

# Check node.js version
if (node -v 2>$null -ne $null -and ([int](node -v | Select-String -Pattern 'v(\d+)' | ForEach-Object {$_.Matches.Groups[1].Value}) -ge 18)) {
    $node_version = (node -v | Select-String -Pattern 'v(\S+)' | ForEach-Object {$_.Matches.Groups[1].Value})
    Write-Host "Node.js version $node_version is valid"
} else {
    Write-Host "Node.js version is not 18 or higher."
}

Write-Host "Installing backend dependencies..."
pip install -r django/DjangoNAB/requirements.txt

Write-Host "Installing frontend dependencies..."
npm install

Write-Host "Environment setup complete."
exit 1